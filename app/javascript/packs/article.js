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

document.addEventListener('DOMContentLoaded', () => {
  const dataset = document.getElementById('article-show').dataset
  const articleId = dataset.articleId

  axios.get(`/articles/${articleId}/comments`)
    .then((response) => {
      const comments = response.data
      comments.forEach((comment) => {
        document.querySelector('.comments-container').append(
          `<div class="article_comment"><p>${comment.content}</p></div>`
        )
      })
    })

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