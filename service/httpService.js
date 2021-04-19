const request = require('request')

class HttpService {
  call(httpMethod, url, headers = {}) {
    let deferred = q.defer()
    try {
      let options = {
        method: httpMethod,
        url: url,
        headers: headers,
        json: true
      }
      request(options, function (error, response, body) {
        if (error) {
          deferred.reject(error)
        } else {
          deferred.resolve(body)
        }
      })
    } catch (error) {
      deferred.reject(error)
    }
    return deferred.promise
  }
}
module.exports = new HttpService()