const config = require('../../config')
const jsonschema = require('../jsonSchema/getMovies')
const errorStore = require('../errorStore/getMovies')
const BodyValidator = require('../../service/bodyValidatorService')
const movieService = require('../../service/apiProvider').Service()
const redis = require("redis");
const client = redis.createClient(config.redisConnObj);
const {
  promisify
} = require("util");

client.on("error", function (error) {
  console.error(error);
});

class Movie {
  getMovies(req, res) {
    try {
      BodyValidator.validate(req.query, jsonschema, errorStore)
        .then(function (data) {
          const getCacheData = promisify(client.get).bind(client);
          return getCacheData(data.title)
        })
        .then(function (redisData) {
          if (redisData) {
            res.status(200).send({
              status: 200,
              message: 'success',
              data: JSON.parse(redisData)
            })
          } else {
            return movieService.getMovieDetails(req.query.title)
          }
        })
        .then(async function (movies) {
          if (!movies) return null
          let response = []
          if (movies.d) {
            for (const movie of movies.d) {
              let m = {
                id: movie.id ? movie.id : "",
                name: movie.l ? movie.l : "",
                posterURL: movie.i && movie.i.imageUrl ? movie.i.imageUrl : " NA",
                videos: []
              }
              if (movie.v) {
                let movieVidoes = {}
                for (const video of movie.v) {
                  movieVidoes.id = video.id ? video.id : ""
                  movieVidoes.name = video.l ? video.l : ""
                  movieVidoes.duration = video.s ? video.s : ""
                  if (video.id && video.id.length > 0) {
                    let playURL = await movieService.getVideo(video.id)
                    if (playURL && playURL.resource && playURL.resource.encodings) {
                      movieVidoes.encodings = playURL.resource.encodings
                    } else {
                      movieVidoes.encodings = []
                    }
                  }
                  m.videos.push(movieVidoes)
                }
              }
              response.push(m)
            }
            return response
          } else {
            return 'No Movie Found'
          }
        })
        .then(function (movieProcessedData) {
          if (!movieProcessedData) return null
          client.setex(req.query.title, config.redisCacheExpiresIn.movieList, JSON.stringify(movieProcessedData));
          var response = {
            status: 200,
            message: 'success',
            data: movieProcessedData
          }
          res.status(200).send(response)
        })
        .catch(function (error) {
          console.log(error)
          // should log error and send custom error to consumer in real app
          if (error.status && error.status === 403) {
            res.status(403).send({
              status: 403,
              message: error.message,
              error: {}
            })
          } else {
            res.status(400).send({
              status: 400,
              message: 'Bad request',
              error: error
            })
          }
        })
    } catch (error) {
      console.log(error)
      // shloud log error and send custome error to consumer in real app
      res.status(500).send({
        status: 500,
        message: 'Internal server error',
        error: {
          'message': 'oops something went wrong'
        }
      })
    }
  }
}
module.exports = new Movie()