export function httpGetAsync (url, body, resolve, reject, waiting = null) {
  if (waiting != null)
    waiting()
  fetch(url, body).then(res => {
    if (res.status == 200) {
      res.text().then(res => {
        resolve(res)
      })
    } else {
      res.text().then(rej => {
        reject(rej)
      })
    }
  })
}