var express = require('express'),
    cors = require('cors'),
    weixin = require('weixin-api'),
    app = express();
Useragent = require('express-useragent');
app.use(cors());
app.use(Useragent.express());
var bodyParser = require('body-parser')
var Post = require('./models/post')
var Shop = require('./models/shop')
var Type = require('./models/Types')
var User = require('./models/user')
var jwt = require('jwt-simple')
var _ = require('lodash')
var Limiter = require('express-rate-limiter');
var MemoryStore = require('express-rate-limiter/lib/memoryStore');
var limiterGet = new Limiter({
    db: new MemoryStore()
});
var limiterPost = new Limiter({
    db: new MemoryStore()
});
var limiterPostAll = new Limiter({
    db: new MemoryStore()
});
var limiterUser = new Limiter({
    db: new MemoryStore()
});
var limiterTypes = new Limiter({
    db: new MemoryStore()
});
var limiterAdd = new Limiter({
    db: new MemoryStore()
});
var limiterReplace = new Limiter({
    db: new MemoryStore()
});
var limiterComment = new Limiter({
    db: new MemoryStore()
});
var limiterRegister = new Limiter({
    db: new MemoryStore()
});
var LocalStorage = require('node-localstorage').LocalStorage
localStorage = new LocalStorage('./scratch')

var fs = require('fs')

var secretKey = 'supersecretkey'

var logger = require('morgan')
app.use(bodyParser.json({
    limit: '600kb'
}))
app.use(logger('dev'))
app.use('/images/', express.static(__dirname + '/images/'))
app.use('/www/', express.static(__dirname + '/www/'))
app.use('/shopImages/', express.static(__dirname + '/shopImages/'))


app.get('/api/posts', limiterGet.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    Post.find({}, function(err, posts) {
        if (err) {
            return next(err)
        }
        res.json(posts)
    })
})

app.get('/api/shops', limiterGet.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    Shop.find({}, function(err, shops) {
        if (err) {
            return next(err)
        }
        res.json(shops)
    })
})


app.get('/www/index.html', function(req, res) {
    console.log(req.useragent)
    if (req.useragent.source.indexOf('MicroMessenger') > -1) {
        console.log('cool')
    } else {
        res.end();
    }

})

// 接入验证
app.get('/', function(req, res) {
    console.log(req.useragent)

    // 签名成功
    if (weixin.checkSignature(req)) {
        res.send(200, req.query.echostr);
    } else {
        res.send(200, 'fail');
    }
});

// config
weixin.token = 'MeLXEpPPER5ZEZ5P';

// 监听文本消息
weixin.textMsg(function(msg) {
    console.log("textMsg received");
    console.log(JSON.stringify(msg));

    var resMsg = {};

    switch (msg.content) {
        case "文本":
            // 返回文本消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "text",
                content: "这是文本回复",
                funcFlag: 0
            };
            break;

        case "音乐":
            // 返回音乐消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "music",
                title: "音乐标题",
                description: "音乐描述",
                musicUrl: "音乐url",
                HQMusicUrl: "高质量音乐url",
                funcFlag: 0
            };
            break;

        case "优惠卷":
        case "红安优惠卷":
        case "优惠":
        case "打折卷":
        case "打折":
        case "便宜":
        case "活动":
        case "做活动":
        case "酬宾":
        case "coupon":

            var articles = [];

            articles[0] = {
                title: "红安优惠卷",
                description: "红安优惠卷",
                picUrl: "http://120.24.168.7/images/icon.jpg",
                url: "http://120.24.168.7/www/index.html"
            };



            // 返回图文消息
            resMsg = {
                fromUserName: msg.toUserName,
                toUserName: msg.fromUserName,
                msgType: "news",
                articles: articles,
                funcFlag: 0
            }
    }

    weixin.sendMsg(resMsg);
});

// 监听图片消息
weixin.imageMsg(function(msg) {
    console.log("imageMsg received");
    console.log(JSON.stringify(msg));
});

// 监听位置消息
weixin.locationMsg(function(msg) {
    console.log("locationMsg received");
    console.log(JSON.stringify(msg));
});

// 监听链接消息
weixin.urlMsg(function(msg) {
    console.log("urlMsg received");
    console.log(JSON.stringify(msg));
});

// 监听事件消息
weixin.eventMsg(function(msg) {
    console.log("eventMsg received");
    console.log(JSON.stringify(msg));
});

// Start
app.post('/', function(req, res) {

    // loop
    weixin.loop(req, res);

});


app.post('/api/posts', limiterPost.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    var idNumber;

    Post.find({
        "name": req.body.name
    }, function(err, data) {

        if (err) {

            return next(err)

        } else if (!data.length) {

            console.log("nice")

            Post.find({}, function(err, posts) {
                console.log("nice!")

                if (err) {
                    return next(err)
                }
                idNumber = posts.length
                callback(idNumber, req, res)
            })
        } else {
            res.send("already exists")
        }
    })
})


app.post('/api/postAll', limiterPostAll.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    var idNumber;
    Post.find({}, function(err, posts) {
        if (err) {
            return next(err)
        } else {
            console.log(posts.length)
            for (var i = 0; i < req.count; i++) {
                idNumber = (Post.length + 2)
                console.log(idNumber)
                callback(idNumber, req[i], res)
            }
        }
    })
})

var callback = function(idNumber, req, res) {
    var imageURL = "http://120.24.168.7/images/" + req.body.name + ".jpg";
    var post = new Post({
        id: idNumber,
        name: req.body.name,
        numbers: req.body.numbers,
        category: req.body.category,
        productName: req.body.productName,
        shopName: req.body.shopName,
        discountPrice: req.body.discountPrice,
        fullPrice: req.body.fullPrice,
        productIntroduction: req.body.productIntroduction,
        productDetail: req.body.productDetail,
        timeLimit: req.body.timeLimit,
        image: imageURL
    })

    data = req.body.image;
    var base64Data, binaryData;
    if (data) {

        base64Data = data.replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/png;base64,/, "");
        base64Data += base64Data.replace('+', ' ');
        binaryData = new Buffer(base64Data, 'base64').toString('binary');

        fs.writeFile("images/" + req.body.name + ".jpg", binaryData, "binary", function(err) {
            console.log(err); // writes out file without error, but it's not a valid image
        });
    }


    post.save(function(err, post) {
        if (err) {
            return next(err)
        }
        res.status(201).json(post)
    })

}


app.post('/api/registerShop', limiterPost.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    var idNumber;
    var imageURL = "http://120.24.168.7/shopImages/" + req.body.shopName + ".jpg";
    data = req.body.shopImage;
    var base64Data, binaryData;
    if (data) {

        base64Data = data.replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/png;base64,/, "");
        base64Data += base64Data.replace('+', ' ');
        binaryData = new Buffer(base64Data, 'base64').toString('binary');

        fs.writeFile("shopImages/" + req.body.shopName + ".jpg", binaryData, "binary", function(err) {
            console.log(err); // writes out file without error, but it's not a valid image
        });
    }

    certificateURL = "http://120.24.168.7/shopCertificates/" + req.body.shopName +".jpg";
    data = req.body.shopCertificate;
    if (data) {
        base64Data = data.replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/png;base64,/, "");
        base64Data += base64Data.replace('+', ' ');
        binaryData = new Buffer(base64Data, 'base64').toString('binary');
        fs.writeFile("shopCertificates/" + req.body.shopName + ".jpg", binaryData, "binary", function(err) {
            console.log(err); // writes out file without error, but it's not a valid image
        });
    }

    Shop.update({
        "shopName": req.body.shopName
    }, {
        shopName: req.body.shopName,
        shopCategory: req.body.shopCategory,
        shopAddress: req.body.shopAddress,
        shopContactWay: req.body.shopContactWay,
        shopCertificate:certificateURL,
        shopImage: imageURL
    }, {
        upsert: true
    }, function(err, data) {
        if (err) {
            res.send("error")
        } else {
            res.send("OK")
        }
    })
})


/*
 app.get('/api/user',function (req, res, next) {
 User.find(function (err, data) {
 if (err) {
 return next(err)
 }
 res.json(data)
 })
 })
 */


app.post('/api/user', limiterUser.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    User.find({
        username: req.body.username
    }, function(err, data) {
        console.log(data)
        console.log(req.body.username)
        if (err) {
            res.send("[]")
        } else {
            console.log(data)
            if (typeof data[0] == "undefined") {
                res.send("[]")
                console.log(data[0])
            } else {
                res.json(data[0].possession)
            }
        }
    })
})


app.post('/api/types', limiterTypes.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    var type = new Type({
        id: req.body.id,
        name: req.body.name,
        category: req.body.category
    })
    type.save(function(err, type) {
        if (err) {
            return next(err)
        }
        res.status(201).json(type)
    })
})

app.post('/api/add', limiterAdd.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    console.log(req.body)
    Post.update({
        "name": req.body.name
    }, {
        $inc: {
            numbers: -1
        }
    }, function() {
        User.update({
            "username": req.body.username
        }, {
            $push: {
                "possession": req.body._id
            }
        }, function() {
            Post.find({
                name: req.body.name
            }, function(err, data) {
                console.log(data)
                if (err) {
                    return next(err)
                } else if (data.length > 0) {

                    if (data[0].numbers >= 0) {
                        var resp = data[0].numbers
                        console.log(resp)
                        res.json(resp)
                    } else {
                        res.send("couldn't find")
                    }
                }
            })
        })
    })
})


app.post('/api/comment', limiterComment.middleware({
    innerLimit: 1,
    outerTimeLimit: 3600000,
    outerLimit: 1,
    headers: false
}), function(req, res, next) {
    console.log(req.body);
    Post.update({
        "name": req.body.name
    }, {
        $push: {
            "comment": {
                title: req.body.comment,
                date: Date.now(),
                username: req.body.username,
                rate: req.body.rate
            }
        }
    }, function() {
        Post.find({
            "name": req.body.name
        }, function(err, data) {
            if (err) {
                return next(err)
            } else {
                if (typeof data[0] == "undefined") {
                    res.send([])
                } else {
                    res.json(data[0].comment)
                }
            }
        })
    })
})

app.post('/api/replace', limiterReplace.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    var imageURL = "http://120.24.168.7/images/" + req.body.name + ".jpg";

    Post.update({
        "name": req.body.name
    }, {
        name: req.body.name,
        numbers: req.body.numbers,
        category: req.body.category,
        productName: req.body.productName,
        shopName: req.body.shopName,
        discountPrice: req.body.discountPrice,
        fullPrice: req.body.fullPrice,
        productIntroduction: req.body.productIntroduction,
        productDetail: req.body.productDetail,
        timeLimit: req.body.timeLimit,
        image: imageURL
    }, function() {
        Post.find({
            "name": req.body.name
        }, function(err, data) {
            if (err) {
                return next(err)
            } else if (data && data[0]) {
                if (data[0].numbers >= 0) {
                    data = req.body.image;
                    var base64Data, binaryData;
                    base64Data = data.replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/png;base64,/, "");
                    base64Data += base64Data.replace('+', ' ');
                    binaryData = new Buffer(base64Data, 'base64').toString('binary');

                    if (fs.exists("images/" + req.body.name + ".jpg")) {
                        fs.unlink("images/" + req.body.name + ".jpg", function(err) {
                            if (err) throw err;
                            console.log('successfully deleted ');
                        });
                    }
                    fs.writeFile("images/" + req.body.name + ".jpg", binaryData, "binary", function(err) {
                        console.log(err); // writes out file without error, but it's not a valid image
                    });
                    res.send("OK")

                }
            }
        })
    })
})

app.post('/api/register', limiterRegister.middleware({
    innerLimit: 10,
    outerLimit: 60,
    headers: false
}), function(req, res, next) {
    var name = req.body.username
    var password = req.body.password
    User.find({}, function(err, data) {
        if (err) {
            return next(err)
        }
        var userdata = findUsername(data, name)
        if (!userdata) {
            console.log("couldnt find user name")
            var token = jwt.encode({
                username: name
            }, secretKey)

            var user = new User({
                username: req.body.username,
                password: req.body.password,
                phonenumber: req.body.phonenumber
            })
            user.save(function(err, data) {
                if (err) {
                    return next(err)
                }
                console.log(data)
                res.status(201).json(token)
            })
        } else res.send("already registered")
    })

})


function findUsername(users, user) {
    return _.find(users, {
        "username": user
    })
}

function validUser(user, password) {
        return user.password === password
    }
    /*
     app.get('/api/user', limiter.middleware({innerLimit: 10, outerLimit: 60}),function (req, res, next) {
     var token = req.headers['x-auth']
     var user = jwt.decode(token, secretKey)
     res.json(user)
     })
     */

app.listen(80, function() {
    console.log('server listening on', 80)
})
