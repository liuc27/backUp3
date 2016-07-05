Promise = require("q").Promise
v = require("../lib/validator")
dbOper = require("../../dbOper")
userOper = dbOper.getUserInstance()
request = require("request")

exports.index = (req, res) ->
  res.status 404
    .send "Not Found"
 
  return

exports.show = (req, res) ->
  res.status 404
    .send "Not Found"
 
  return

# local ログイン
exports.create = (req, res) ->
  param = req.body

  # Validation
  v.checkParam param, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      input =
        account: param.account
        password: param.password

      # ユーザ情報取得
      userOper.login input, (result) ->
        if result
          if result.code
            output =
              userID: ""
              name: ""
              lastLogin: ""
            res.status 200
              .send output
          else
            res.status 403
              .send "Forbidden"
        else
          res.status 500
            .send "Internal Server Error"
        return
  return

exports.update = (req, res) ->
  console.log "update"
  res.status 404
    .send "Not Found"
 
  return

exports.destroy = (req, res) ->
  console.log "destroy"
  res.status 404
    .send "Not Found"
 
  return

