import axios from 'axios'
import { csrfToken } from 'rails-ujs'

axios.defaults.headers.common['X-CSRF-Token'] = csrfToken()

const listenInactiveHeartEvent = (articleId) => {
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
}

const listenActiveHeartEvent = (articleId) => {
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
}

export {
  listenInactiveHeartEvent,
  listenActiveHeartEvent
}