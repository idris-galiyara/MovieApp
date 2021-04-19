const jsonschema = {
  'id': '/errorStore',
  'properties': {
    'title': {
      'type': 'string',
      'required': true,
      'maxLength': 50,
      'minLength': 2
    }
  },
  'additionalProperties': false
}

module.exports = jsonschema