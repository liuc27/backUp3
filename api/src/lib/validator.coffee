validator = module.exports = require "validator"

validator.checkParam = (data, cb) ->
  console.log "checkParam"
  cb()
  return

