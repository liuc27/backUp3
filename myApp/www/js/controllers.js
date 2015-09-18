angular.module('starter.controllers', ['naif.base64'])

.controller('CouponCtrl', function ($scope, $http, $rootScope, localStorageService, types, resolvedItems, resolvedShops, resolvedPossession) {

  console.log(resolvedItems)
  $rootScope.items = resolvedItems.data
      $rootScope.shops = resolvedShops.data
      $rootScope.possession = resolvedPossession.data
  $scope.chosenItem = {
    "value": "all"
  }

  $scope.chooseMenuItem = function (menu, $index) {
    $scope.chosenItem.value = menu.type
    $scope.selectedIndex = $index
    console.log($index)
  }

  console.log($scope.chosenItem.value)
  console.log(resolvedPossession.data)



      $scope.averageRate = function(item){
        var sumRate = 0,
            lengthRate = 0;
        console.log($scope.comment)
        angular.forEach(item.comment, function (value) {
          if (value.rate) {
            if (value.rate.value > 0) {
              sumRate += value.rate.value;
              lengthRate++;
            }
          }
        })
        return (sumRate / lengthRate).toFixed(2) != "NaN" ? (sumRate / lengthRate).toFixed(2) : "暂无";


      }


  $scope.find = function (item) {
    var exist = false;
    angular.forEach($rootScope.possession, function (value) {
      if (value == item._id) {
        exist = true;
      }
    });
    return exist;
  }
  $scope.menus = types.getMenu()
  $scope.doRefresh = types.doRefresh()
})

.controller('shopsCtrl', function ($scope, types, resolvedShops, $ionicPopover) {
  $scope.typeList = types.typeList();
  $scope.orderList = types.getOrderList();
  $scope.locationList = types.getLocationList();
      $scope.doRefresh = types.doRefresh();

  $scope.chosenCategory = {
    "value": "all"
  }
  $scope.chosenLocation = {
    "value": "all"
  }
  $scope.chosenOrder = {
    "value": "all"
  }
  //$scope.shops = resolvedShops.data
  $scope.cate = {"value":"全部"};
  $scope.location = {"value":"全部"};
  $scope.order = {"value":"全部"};

  $scope.chooseCategoryItem = function (type) {
    $scope.chosenCategory.value = type.type;
    console.log(type.type)
    $scope.popoverCategory.hide();
    $scope.cate.value = type.name
  }

  $scope.chooseLocationItem = function (type) {
    $scope.chosenLocation.value = type.type;
    console.log(type.type)
    $scope.popoverLocation.hide();
    $scope.location.value = type.name
  }

  $scope.chooseOrderItem = function (type) {
    $scope.chosenOrder.value = type.type;
    console.log(type)
    console.log(type.type)
    $scope.popoverOrder.hide();
    $scope.order.value = type.name
  }
  // .fromTemplate() method
  $ionicPopover.fromTemplateUrl('templates/popover/popoverCategory.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popoverCategory = popover;
  });
  $ionicPopover.fromTemplateUrl('templates/popover/popoverLocation.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popoverLocation = popover;
  });
  $ionicPopover.fromTemplateUrl('templates/popover/popoverOrder.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popoverOrder = popover;
  });


  $scope.openPopoverCategory = function ($event) {
    $scope.popoverCategory.show($event);
  };
  $scope.openPopoverLocation = function ($event) {
    $scope.popoverLocation.show($event);
  };
  $scope.openPopoverOrder = function ($event) {
    $scope.popoverOrder.show($event);
  };

  $scope.closePopoverCategory = function () {
    $scope.popoverCategory.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function () {
    $scope.popoverCategory.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function () {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function () {
    // Execute action
  });
})

.controller('ShopDetailCtrl', function ($scope, $http, $rootScope, $stateParams ,types, resolvedShops, resolvedItems, resolvedPossession) {
  //$scope.shops = resolvedShops.data;
  $scope.shop = types.fetchShop($stateParams.shopId);
  console.log($stateParams.shopId);
  $scope.shopRate = {
    value: 3
  };
  $scope.shopAverageRate = {
    value: 0
  };
  $scope.shopProducts = [];
  $scope.shopCommentLength = 0;
  $scope.shopSumRate = 0;

  angular.forEach($rootScope.items, function (itemValue) {
    if (itemValue.shopName == $scope.shop.shopName) {
      $scope.shopProducts.push(itemValue);
      $scope.shopCommentLength += types.getCommentLength(itemValue.comment);
      angular.forEach(itemValue.comment,function(value){
          $scope.shopSumRate += value.rate.value
      })
    }
  })
  $scope.shopAverageRate.value = ( $scope.shopSumRate / $scope.shopCommentLength).toFixed(2) != "NaN" ? ($scope.shopSumRate / $scope.shopCommentLength).toFixed(2) : "暂无";




  $scope.find = function (item) {
    var exist = false;
    angular.forEach($rootScope.possession, function (value) {
      if (value == item._id) {
        exist = true;
      }
    });
    return exist;
  }

})


.controller('CouponDetailCtrl', function ($scope, $stateParams,$rootScope, localStorageService, $ionicPopup, $ionicScrollDelegate, types, $http, resolvedItems, resolvedAccount, resolvedPossession) {

  //$scope.items = $rootScope.items;
  console.log($rootScope.items);
  $scope.possession = resolvedPossession.date

  $scope.username = resolvedAccount ? resolvedAccount : $scope.username
  $scope.rate = {
    value: 3
  };
  $scope.averageRate = {
    value: 0
  };
  $scope.max = 5;
  console.log("stateParams are");
  console.log($stateParams);
  console.log($rootScope.possession)
  $scope.coupon = types.fetch($stateParams.couponId)
  console.log($scope.coupon)
  $scope.favorites = "button icon-left ion-plus button-positive";
  $scope.favoritesText = "点击领取";
  $scope.commentLength = types.getCommentLength($scope.coupon.comment)
  $scope.disableClick = {
    value: false
  }

  $scope.clicked = false;
  $scope.comment = types.comment($stateParams.couponId);
  var sumRate = 0,
    lengthRate = 0;
  console.log($scope.comment)
  angular.forEach($scope.comment, function (value) {
    if (value.rate) {
      if (value.rate.value > 0) {
        sumRate += value.rate.value;
        lengthRate++;
      }
    }
  })
  $scope.averageRate.value = (sumRate / lengthRate).toFixed(2) != "NaN" ? (sumRate / lengthRate).toFixed(2) : "暂无";

  $scope.showComment = false;
  console.log($scope.comment)
  var theNewCoupon = angular.copy($scope.coupon);
  //$scope.comment.push({"text":theNewCoupon.productName})
  $scope.changeShowComment = function () {
    $scope.showComment = !$scope.showComment
    //$ionicScrollDelegate.scrollBy(0, 100);
  }
  $scope.submitComment = function () {
    var couponName = $scope.coupon.name
    $scope.disableClick.value = true

    if ($scope.username) {

      $http.post("http://120.24.168.7/api/comment", {
        "name": couponName,
        "username": $scope.username,
        "comment": $scope.comment.comment,
        "rate": $scope.rate
      }).success(function (data) {
        console.log(data)
        console.log($scope.showComment)
        $scope.showComment = !$scope.showComment

        $scope.comment = data
        $scope.averageRate.value = ((sumRate + $scope.rate.value) / (lengthRate + 1)).toFixed(2);

        $scope.commentLength++;
        resolvedItems.data[$stateParams.couponId].comment = data
      }).error(function (data) {
        console.log(data)
        if (data == "Rate limit exceeded") {
          $ionicPopup.alert({
              title: "为防止刷分,用户无法频繁评论,请见谅!"
            }

          )
        } else {
          $ionicPopup.alert({
            title: "当前IP暂时禁止评论"
          })
        }
      })

    } else {
      $ionicPopup.alert({
        title: '请先注册或登陆'
      })
      $scope.disableClick.value = true
    }
  };

  $scope.changeClass = function () {
    var couponName = $scope.coupon.name
    $scope.disableClick.value = true
    console.log($scope.isDisabled)
    console.log($scope.isDisabled)

    console.log($scope.disableClick.value)
    if ($scope.username) {
      var _id = $scope.coupon._id
      if ($scope.favoritesText === "点击领取") {
        console.log(resolvedPossession)
        console.log($scope.username)
        console.log(_id)
        $http.post("http://120.24.168.7/api/add", {
          "name": couponName,
          "username": $scope.username,
          "_id": _id

        }).success(function (data) {
          if (data === "couldn't find") {
            $ionicPopup.alert({
              title: '非常抱歉,库存不足'
            })
            $scope.favoritesText = "无法领取"
          } else {
            $ionicPopup.alert({
              title: '恭喜,成功领取!'
            });
            console.log(resolvedPossession)
            console.log($rootScope.possession)

            $rootScope.possession.push(_id);

            $scope.favoritesText = "已经领取"
            $scope.favorites = "button icon-left ion-heart button-positive"
            $scope.coupon.numbers = data
            //console.log(data)
          }
        })
      }
    } else {
      $ionicPopup.alert({
        title: '请先注册或登陆'
      })
      $scope.disableClick.value = false

    }
  }

  $scope.favoriteClass = function () {
    var exist = false
    angular.forEach($rootScope.possession, function (value) {
      if (value == $scope.coupon._id) {
        exist = true;
      }
    })
    if (exist) {
      $scope.favorites = "button icon-left ion-heart button-positive";
      $scope.favoritesText = "已经领取";
      $scope.disableClick.value = true
    }
  };
})
  .controller('favoriteListCtrl', function ($scope,$rootScope, $stateParams, localStorageService, types, resolvedItems, resolvedPossession) {
    //localStorageService.clearAll()
    //$rootScope.items = resolvedItems.data;
    //$scope.possession = resolvedPossession.data;

  })

  .controller('registerCtrl', function ($scope, $rootScope, $ionicPopup, $ionicSideMenuDelegate, localStorageService, types, $http, $state, $q, resolvedAccount) {
    $scope.product = {};
    $scope.shop = {};
    $scope.image = {};

    $scope.username = resolvedAccount
      if (typeof $scope.username === "undefined" || $scope.username === null) {
        $ionicPopup.alert({
          title: '请注册或登陆'
        });
        setTimeout(function() {
          $state.go('tab.register');
        }, 150)
      } else {
        $ionicPopup.alert({
          title: '已登录帐号: ' + $scope.username
        });
        console.log($scope.username)
        setTimeout(function() {
          $state.go('tab.coupon');
        }, 150)

      }
    $scope.registeredShop = {};
      if($scope.username) {
        $scope.usernameExist = true

        if ($scope.username.shop) {
          $scope.registeredShop.done = true;
        } else {
          $scope.registeredShop.done = false;
        }
      }else{
        $scope.usernameExist = false
      }

      $scope.logout = function(){
        localStorageService.clearAll();
        console.log($scope.username)

        setTimeout(function() {
          $state.go('tab.register');
        }, 300)
      }

      $scope.toggleRegisterShop = function(){
        $scope.registeredShop.done = !($scope.registeredShop.done);
      }

    $scope.register = function (username, password) {
      if (username == null || password == null) {
        $ionicPopup.alert({
          title: '请输入正确的用户名和密码！'
        });
      } else {
        $http.post("http://120.24.168.7/api/register", {
          "username": username,
          "password": password
        }).success(function (data) {
          if (data === "already registered") {
            $ionicPopup.alert({
              title: '用户名已经注册，请换用户名！'
            });
          } else if(data === "passed") {
            $rootScope.username = username
            $scope.username = username
            $scope.usernameExist = true
            $ionicPopup.alert({
              title: '成功登陆！'
            });
            var promise = $q(function (resolve, reject) {
              setTimeout(function () {
                if (localStorageService.set("usernameData", username)) {
                  resolve('开始抢折扣卷吧!');
                } else {
                  reject('出错咯,开始抢折扣卷吧!');
                }
              }, 10);
            });

            promise.then(function (greeting) {
              //console.log(localStorageService.get("usernameData"));
              //alert('Success: ' + greeting);
              $state.go('tab.coupon');
            }, function (reason) {
              //alert('Failed: ' + reason);
              $state.go('tab.coupon');
            });


          } else {
            $rootScope.username = username
            $scope.username = username
            $scope.usernameExist = true
            $ionicPopup.alert({
              title: '注册成功！已自动登录!'
            });

            var promise = $q(function (resolve, reject) {
              setTimeout(function () {
                if (localStorageService.set("usernameData", username)) {
                  resolve('开始抢折扣卷吧!');
                } else {
                  reject('出错咯,开始抢折扣卷吧!');
                }
              }, 10);
            });

            promise.then(function (greeting) {
              //console.log(localStorageService.get("usernameData"));
              //alert('Success: ' + greeting);
              $state.go('tab.coupon');
            }, function (reason) {
              //alert('Failed: ' + reason);
              $state.go('tab.coupon');
            });

          }
        });
      }
    };


    $scope.abc = function () {
      $scope.product.image = "data:" + $scope.image.productImage.filetype + ";base64," + $scope.image.productImage.base64;
      console.log($scope.product)
    }

    $scope.createShopCertificate = function () {
      if($scope.image.shopCertificate) {
          $scope.shop.shopCertificate = "data:" + $scope.image.shopCertificate.filetype + ";base64," + $scope.image.shopCertificate.base64;
      }
    }

    $scope.createUserCertificate = function () {
        if($scope.image.userCertificate) {
            $scope.shop.userCertificate = "data:" + $scope.image.userCertificate.filetype + ";base64," + $scope.image.userCertificate.base64;
        }
    }

    $scope.sendJson = function () {
      $scope.product.timeLimit = new Date($scope.year, $scope.month - 1, $scope.day, '23', '59', '59');
      $http.post("http://120.24.168.7/api/posts", $scope.product).success(function (data) {
        console.log(data)
        if (data == "already exists") {
          alert("商品名已经存在，推送失败")

        } else {
          alert("成功推送")

        }
      })
    }

    $scope.replace = function () {
      $scope.product.timeLimit = new Date($scope.year, $scope.month - 1, $scope.day, '23', '59', '59');
      $http.post("http://120.24.168.7/api/replace", $scope.product).success(function (data) {
        console.log(data)
        if (data = "OK")
          alert("successfully replaced")
      })
    }


    $scope.registerShop = function () {
      $scope.shop.username = $scope.username;
      if ($scope.shop.shopName == null || $scope.shop.shopAddress == null || $scope.shop.userCertificate == null|| $scope.shop.shopContactWay == null || $scope.image.shopCertificate.base64 == null) {
        $ionicPopup.alert({
          title: '请输入必须填写的项目！'
        });
      } else {
        console.log($scope.shop);
        $http.post("http://120.24.168.7/api/registerShop", $scope.shop).success(function (data) {
          console.log(data)
          if (data == "OK") {
            $scope.registeredShop.done = true;
            alert("成功推送")

          }
        })
      }
    };




    $scope.showTab = function () {
      $scope.showAccountTab = true;
    }

  });
