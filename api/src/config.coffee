config = (env) ->
  data =
    port: 3000
    google_vision_key: 'AIzaSyDD7LlxK_DauJk0mD-6agzL7jVVoxzFPfc'
  return data

exports.development = config("development")

exports.production = config("production")
