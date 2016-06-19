Promise = require("q").Promise
v = require("../lib/validator")
dbOper = require("../../dbOper")
shopOper = dbOper.getShopInstance()

getData = (query, field) ->
  return Promise (resolve, reject) ->
    console.log "get"
    return

# Shop list 取得
exports.index = (req, res) ->
  console.log "index"

  param = req.query
  #adminFlg = query.adminFlg
  #certificatedFlg = query.certificatedFlg
  #delFlg = query.delFlg
  #search = query.search
  #skip = query.skip
  #limit = query.limit
  #sort = query.sort
  
  #console.log input
  # Validation
  v.checkParam param, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      input = {}

      # skip, limit
      if param.limit
        input.start = param.skip ? 0
        input.count = param.limit
      # sort
      if param.sort
        input.sort =
          column: param.sort ? "shopID"
          type: "asc"

      console.log input
      # MySQL処理
      shopOper.getShop input, (results) ->
        console.log results

        output =
          code: results.code
          result: results.Shop

        if results.code
          outCode = 200
        else
          outCode = 400
        res.status outCode
          .send output
        return
    return
 
  return

# Shop 取得
exports.show = (req, res) ->
  console.log "show"

  input = req.query
  input.shopID = req.params.id

  #console.log input
  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      shopOper.getShop input, (results) ->
        console.log results

        output =
          code: results.code
          result: results.Shop[0]

        if results.code
          outCode = 200
        else
          outCode = 400
        res.status outCode
          .send output
        return
    return
 
  return

# Shop 追加
exports.create = (req, res) ->
  console.log "create"

  input = req.body

  # Test inputデータ
  # curl -X POST http://localhost:3000/shops -d "owner=chaeh01&name=testShop&dispName=TEST SHOP"

  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      shopOper.insertShop input, (results) ->
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

# Shop 更新
exports.update = (req, res) ->
  console.log "update"

  input = req.body
  input.shopID = req.params.id
  # Test inputデータ
  # curl -X PUT http://localhost:3000/shops/:id -d "dispName=TEST SHOP2&address=tokyo"

  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      shopOper.updateShop input, (results) ->
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

# Shop 削除
exports.destroy = (req, res) ->
  console.log "destroy"
  res.status 404
    .send "Not Found"
 
  return

