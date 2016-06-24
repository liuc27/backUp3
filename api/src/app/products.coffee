Promise = require("q").Promise
v = require("../lib/validator")
dbOper = require("../../dbOper")
productOper = dbOper.getProductInstance()

getData = (query, field) ->
  return Promise (resolve, reject) ->
    console.log "get"
    return

# Product list 取得
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
          column: param.sort ? "productID"
          type: "asc"

      console.log input
      # MySQL処理
      productOper.getProduct input, (results) ->
        console.log results

        output =
          code: results.code
          result: results.Product

        if results.code
          outCode = 200
        else
          outCode = 400
        res.status outCode
          .send output
        return
    return
 
  return

# Product 取得
exports.show = (req, res) ->
  console.log "show"

  input = req.query
  input.productID = req.params.id

  #console.log input
  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      productOper.getProduct input, (results) ->
        console.log results

        output =
          code: results.code
          result: results.Product[0]

        if results.code
          outCode = 200
        else
          outCode = 400
        res.status outCode
          .send output
        return
    return
 
  return

# Product 追加
exports.create = (req, res) ->
  console.log "create"

  input = req.body

  # Test inputデータ
  # curl -X POST http://localhost:3000/products -d "name=testProduct&dispName=TEST PRODUCT&shopID=767792164ce5faad5a468738b0c83fee"

  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      productOper.insertProduct input, (results) ->
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

# Product 更新
exports.update = (req, res) ->
  console.log "update"

  input = req.body
  input.productID = req.params.id
  # Test inputデータ
  # curl -X PUT http://localhost:3000/products/:id -d "dispName=TEST PRODUCT2&origPrice=1000&newPrice=800"

  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      productOper.updateProduct input, (results) ->
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

# Product 削除
exports.destroy = (req, res) ->
  console.log "destroy"
  res.status 404
    .send "Not Found"
 
  return

