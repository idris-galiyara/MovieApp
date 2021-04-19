let HttpService = require('./httpService')
let config = require('../config')
let constant = require('../config/constant.json')

class RapidAPI {
  callRapidAPI(url, httpMethod) {
    let deferred = q.defer()
    try {
      let headers = {
        'x-rapidapi-key': config.apiProvider.apiKey,
        'x-rapidapi-host': config.apiProvider.host,
        useQueryString: config.apiProvider.useQueryString
      }
      HttpService.call(httpMethod, url, headers)
        .then(function (data) {
          deferred.resolve(data)
        })
        .catch(function (error) {
          deferred.reject(error)
        })
    } catch (error) {
      deferred.reject(error)
    }
    return deferred.promise
  }
  getMovieDetails(title) {
    let deferred = q.defer()
    try {
      let endPoint = config.apiProvider.providerUrl + constant.API.getMovieDetails + '?q=' + encodeURIComponent(title)
      this.callRapidAPI(endPoint, 'GET')
        .then(function (data) {
          deferred.resolve(data)
        })
        .catch(function (error) {
          deferred.reject(error)
        })
    } catch (error) {
      deferred.reject(error)
    }
    return deferred.promise
  }
  getVideo(videoID) {
    let deferred = q.defer()
    try {
      let endPoint = config.apiProvider.providerUrl + constant.API.getVid + '?viconst=' + encodeURIComponent(videoID) + '&region=US'
      this.callRapidAPI(endPoint, 'GET')
        .then(function (data) {
          deferred.resolve(data)
        })
        .catch(function (error) {
          deferred.reject(error)
        })
    } catch (error) {
      deferred.reject(error)
    }
    return deferred.promise
  }
}

module.exports = new RapidAPI()