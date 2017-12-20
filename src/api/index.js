import axios from 'axios'
export function getServerTime () {
  return get('/api/common/getservicetime')
}

export function getActivityInfo () {
  return get('/api/home/getactivityinfo')
}

export function getJoinData () {
  return get('/api/home/getjoinorpayment')
}

export function getJoinDataT (data) {
  return get('/api/home/getjoinorpaymentsevenorthirty')
}

function get(url, data = null) {
  return axios.get(url, {
    params: data
  }).then(res => {
    return new Promise((resolve, reject) => {
      if (res.status === 200) {
        resolve(res.data)
      }
    })
  })
}