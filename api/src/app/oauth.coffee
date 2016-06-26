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

# OAuth ログイン
exports.create = (req, res) ->
  param = req.body

  # Validation
  v.checkParam param, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      if param.provider is "facebook"
        url = "https://graph.facebook.com/v2.4/me?access_token=#{param.token}"
      else if param.provider is "google"
        url = "https://www.googleapis.com/oauth2/v3/userinfo?access_token=#{param.token}"
      else if param.provider is "yahoo"
        url = "https://userinfo.yahooapis.jp/yconnect/v1/attribute?schema=openid&access_token=#{param.token}"
      else
        res.status 400
          .send "Bad Request"
      # Endpointへアクセス
      request.get(url, (err, httpResponse, body) ->
        if err
          console.log err
        else
          body = JSON.parse body
          if param.provider is "yahoo"
            account = body.user_id
          else if param.provider is "google"
            account = body.sub
          else
            account = body.id

          if account
            input =
              account: account
              oauthSource: param.provider
            # ユーザ情報取得
            userOper.getUser input, (results) ->
              if results
                if results.User.length
                  user = results.User[0]
                  output =
                    userID: user.userID
                    type: 1
                    name: user.name
                  res.status 200
                    .send output
                else
                  # ユーザ新規登録
                  input.name = body.name
                  userOper.insertUser input, (results) ->
                    if results
                      output =
                        userID: results.msg
                        type: 0
                        name: input.name
                      res.status 200
                        .send output
                    else
                      res.status 403
                        .send "Forbidden"
                    return
              else
                res.status 403
                  .send "Forbidden"
              return
          else
            res.status 400
              .send "Bad Request"
        return
      )
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

