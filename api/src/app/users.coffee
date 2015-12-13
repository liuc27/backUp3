Promise = require("q").Promise
v = require("../lib/validator")
# mysql = require("")

getData = (query, field) ->
  return Promise (resolve, reject) ->
    console.log "get"
    return

# User list 取得
exports.index = (req, res) ->
  console.log "index"

  res.status 404
    .send "Not Found"
  return

# User 取得
exports.show = (req, res) ->
  console.log "show"
  res.status 404
    .send "Not Found"
 
  return

# User 追加
exports.create = (req, res) ->
  console.log "create"

  input = req.body

  # Validation
  v.checkParam input, () ->

    # mySQL側のメソッドCALL予定
    res.status 200
      .send output
    return
  return

# User 更新
exports.update = (req, res) ->
  console.log "update"
  res.status 404
    .send "Not Found"
 
  return

# User 削除
exports.destroy = (req, res) ->
  console.log "destroy"
  res.status 404
    .send "Not Found"
 
  return

