// incase if we change movie api provider just new to send new class obj no change in entire code
// loose coupled
// if there are multiple one can be activated asap without major coding
const config = require('../config')
const RapidApiService = require('./RapidApiService')

class Movie {
  Service() {
    let apiProvider = config.apiProvider.name ? config.apiProvider.name.toLowerCase() : ''
    switch (apiProvider) {
      case 'rapidapi':
        return RapidApiService
    }
  }
}

// Return OBJ
module.exports = new Movie()