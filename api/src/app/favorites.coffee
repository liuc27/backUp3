Promise = require("q").Promise
v = require("../lib/validator")
dbOper = require("../../dbOper")
favoriteOper = dbOper.getFavoriteInstance()

getData = (query, field) ->
  return Promise (resolve, reject) ->
    console.log "get"
    return

# Favorite list 取得
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

      if param.userID
        input.userID = param.userID

      # skip, limit
      if param.limit
        input.start = param.skip ? 0
        input.count = param.limit
      # sort
      if param.sort
        input.sort =
          column: param.sort ? "favoriteID"
          type: "asc"

      console.log input
      # MySQL処理
      favoriteOper.getFav input, (results) ->
        console.log results

        output =
          code: results.code
          result: results.Favorite

        if results.code
          outCode = 200
        else
          outCode = 400
        res.status outCode
          .send output
        return
    return
 
  return

# Favorite 取得
exports.show = (req, res) ->
  console.log "show"

  input = req.query
  input.favoriteID = req.params.id

  #console.log input
  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      favoriteOper.getFav input, (results) ->
        console.log results

        output =
          code: results.code
          result: results.Favorite[0]

        if results.code
          outCode = 200
        else
          outCode = 400
        res.status outCode
          .send output
        return
    return
 
  return

# Favorite 追加
exports.create = (req, res) ->
  console.log "create"

  input = req.body

  # Test inputデータ
  # curl -X POST http://localhost:3000/favorites -d "userID=27cb87f3a94b9317f7ca8e4b12330c40&productID=85d7809a5cba506532db79232c998232&shopID=767792164ce5faad5a468738b0c83fee"

  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      favoriteOper.insertFav input, (results) ->
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

# Favorite 更新
exports.update = (req, res) ->
  console.log "update"

  input = req.body
  input.favoriteID = req.params.id
  # Test inputデータ
  # curl -X PUT http://localhost:3000/favorites/:id -d "dispName=TEST FAVORITE2&origPrice=1000&newPrice=800"

  # Validation
  v.checkParam input, (err) ->
    if err
      res.status err.code
        .send err.msg
    else
      # MySQL処理
      favoriteOper.updateFav input, (results) ->
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

# Favorite 削除
exports.destroy = (req, res) ->
  console.log "destroy"
  res.status 404
    .send "Not Found"
 
  return

