import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

const handleHeartDisplay = (hasLiked) => {
  if (hasLiked) {
    document.querySelector('.active-heart').classList.remove('hidden')
  } else {
    document.querySelector('.inactive-heart').classList.remove('hidden')
  }
}

const handleCommentForm = () => {
  document.getElementsByClassName('show-comment-form')[0].onclick = () => {
    document.querySelector('.show-comment-form').classList.add('hidden')
    document.querySelector('.comment-text-area').classList.remove('hidden')
  }
}

const appendNewComment = (comment) => {
  document.querySelector('.comments-container').append(
    `<div class="article_comment"><p>${comment.content}</p></div>`
  )
}

document.addEventListener('DOMContentLoaded', () => {
  const dataset = document.getElementById('article-show').dataset
  const articleId = dataset.articleId

  axios.get(`/articles/${articleId}/comments`)
    .then((response) => {
      const comments = response.data
      comments.forEach((comment) => {
        appendNewComment(comment)
      })
    })

  handleCommentForm()

  document.getElementsByClassName('add-comment-button')[0].onclick = () => {
    const content = document.getElementById('comment_content').value
    if (!content) {
      window.alert('コメントを入力してください')
    } else {
      axios.post(`/articles/${articleId}/comments`, {
        comment: {content: content}
      })
        .then((res) => {
          const comment = res.data
          appendNewComment(comment)
          document.getElementById('comment_content').value
        })
    }
  }

  axios.get(`/articles/${articleId}/like`)
    .then((response) => {
      const hasLiked = response.data.hasLiked
      handleHeartDisplay(hasLiked)
    })

  document.getElementsByClassName('inactive-heart')[0].onclick = () => {
    axios.post(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          document.querySelector('.active-heart').classList.remove('hidden')
          document.querySelector('.inactive-heart').classList.add('hidden')
        }
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e)
      })
  }

  document.getElementsByClassName('active-heart')[0].onclick = () => {
    axios.delete(`/articles/${articleId}/like`)
      .then((response) => {
        if (response.data.status === 'ok') {
          document.querySelector('.active-heart').classList.add('hidden')
          document.querySelector('.inactive-heart').classList.remove('hidden')
        }
      })
      .catch((e) => {
        window.alert('Error')
        console.log(e)
      })
  }
})