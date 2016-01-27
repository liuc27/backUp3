config = (env) ->
  data =
    port: 3000
  return data

exports.development = config("development")

exports.production = config("production")
