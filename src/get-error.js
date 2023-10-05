'use strict'

const SemanticReleaseError = require('@semantic-release/error')
const ERROR_DEFINITIONS = require('./errors')

module.exports = (code, ctx = {}) => {
  // eslint-disable-next-line security/detect-object-injection
  const { message, details } = ERROR_DEFINITIONS[code](ctx)
  return new SemanticReleaseError(message, code, details)
}
