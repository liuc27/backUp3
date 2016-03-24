Promise = require("q").Promise
v = require("../lib/validator")
dbOper = require("../../dbOper")
userOper = dbOper.getUserInstance()

getData = (query, field) ->
  return Promise (resolve, reject) ->
    console.log "get"
    return

# User list 取得
exports.index = (req, res) ->
  console.log "index"

  input = req.query
  
  #console.log input
  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      userOper.getUser input, (results) ->
        console.log results

        output =
          code: results.code
          result: results.User

        if results.code
          outCode = 200
        else
          outCode = 400
        res.status outCode
          .send output
        return
    return
 
  return

# User 取得
exports.show = (req, res) ->
  console.log "show"

  input = req.query
  input.id = req.params.id

  #console.log input
  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      userOper.getUser input, (results) ->
        console.log results

        output =
          code: results.code
          result: results.User[0]

        if results.code
          outCode = 200
        else
          outCode = 400
        res.status outCode
          .send output
        return
    return
 
  return

# User 追加
exports.create = (req, res) ->
  console.log "create"

  input = req.body

  # Test inputデータ
  # curl -X POST http://localhost:3000/users
  #input =
  #  "account":"chaeh01"
  #  "password":"poipoi"
  #  "name":"chaehyungjun"
  #  "nickName":"hj"
  #  "email":"poipoi.chae@gmail.com"

  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      userOper.insertUser input, (results) ->
        console.log results
        output =
          code: results.code
          result: results

        if results.code
          outCode = 200
        else
          outCode = 400
        res.status outCode
          .send output
        return
    return
  return

# User 更新
exports.update = (req, res) ->
  console.log "update"

  input = req.body
  input.id = req.params.id
  # Test inputデータ
  # curl -X PUT http://localhost:3000/users/:id
  #input =
  #  "userID": req.params.id
  #  "account":"chaeh01"
  #  "password":"mengqiao"
  #  "name":"liminhui2"
  #  "nickName":"hogehoge"
  #  "email":"mengmengqiaoqiao@gmail.com"

  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      userOper.updateUser input, (results) ->
        console.log results
        output =
          code: results.code
          result: results
        if results.code
          outCode = 200
        else
          outCode = 400
        res.status outCode
          .send output
        return
    return
 
  return

# User 削除
exports.destroy = (req, res) ->
  console.log "destroy"
  res.status 404
    .send "Not Found"
 
  return

