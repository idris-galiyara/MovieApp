const errorify = require('./errorfyService')
class BodyValidator {
  validate(body, jsonschema, errorStore) {
    let deferred = q.defer()
    try {
      let validate = v.validate(body, jsonschema)
      if (validate.valid) {
        deferred.resolve(body)
      } else {
        deferred.reject(errorify(validate.errors, errorStore.errorStore).faults)
      }
    } catch (error) {
      deferred.reject(error)
    }
    return deferred.promise
  }
}
module.exports = new BodyValidator()