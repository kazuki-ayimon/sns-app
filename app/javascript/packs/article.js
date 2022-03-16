import axios from 'modules/axios'
import {
  listenInactiveHeartEvent,
  listenActiveHeartEvent
} from 'modules/handle_heart'

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

  axios.get(`/api/articles/${articleId}/comments`)
    .then((response) => {
      const comments = response.data
      comments.forEach((comment) => {
        appendNewComment(comment)
      })
    })
    .catch((error) => {
      window.alert('失敗')
    })

  handleCommentForm()

  document.getElementsByClassName('add-comment-button')[0].onclick = () => {
    const content = document.getElementById('comment_content').value
    if (!content) {
      window.alert('コメントを入力してください')
    } else {
      axios.post(`/api/articles/${articleId}/comments`, {
        comment: {content: content}
      })
        .then((res) => {
          const comment = res.data
          appendNewComment(comment)
          document.getElementById('comment_content').value
        })
    }
  }

  axios.get(`/api/articles/${articleId}/like`)
    .then((response) => {
      const hasLiked = response.data.hasLiked
      handleHeartDisplay(hasLiked)
    })

  listenInactiveHeartEvent(articleId)
  listenActiveHeartEvent(articleId)
})