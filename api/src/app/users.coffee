Promise = require("q").Promise

getData = (query, field) ->
  return Promise (resolve, reject) ->
    console.log "get"
    return

exports.index = (req, res) ->
  console.log "index"
  res.status 404
    .send "Not Found"
  return

exports.show = (req, res) ->
  console.log "show"
  res.status 404
    .send "Not Found"
 
  return

exports.create = (req, res) ->
  console.log "create"
  res.status 404
    .send "Not Found"
 
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


