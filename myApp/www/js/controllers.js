angular.module('starter.controllers', ['naif.base64'])

.controller('CouponCtrl', function ($scope, $http, $rootScope, localStorageService, types, things, possessionData) {

  console.log(things)
  $scope.items = things.data
  $scope.chosenItem = {
    "value": "all"
  }

  $scope.chooseMenuItem = function (menu, $index) {
    $scope.chosenItem.value = menu.type
    $scope.selectedIndex = $index
    console.log($index)
  }

  console.log($scope.chosenItem.value)
  console.log(possessionData.data)
  $scope.find = function (item) {
    var exist = false;
    angular.forEach(possessionData.data, function (value) {
      if (value == item._id) {
        exist = true;
      }
    });
    return exist;
  }
  $scope.menus = types.getMenu()
  $scope.doRefresh = function () {
    $http.get("http://120.24.168.7/api/posts").success(function (data) {
      $rootScope.items = data
      $scope.items = data
      things.data = data

    }).finally(function () {
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
})

.controller('shopsCtrl', function ($scope, types, shops, $ionicPopover) {
  $scope.typeList = types.typeList();
  $scope.orderList = types.getOrderList();
  $scope.chosenItem = {
    "value": "all"
  }
  $scope.shops = shops.data
  $scope.choosePopoverItem = function (type) {
    $scope.chosenItem.value = type.type;
    console.log(type.type)
    $scope.popoverCategory.hide();
  }

  // .fromTemplate() method
  $ionicPopover.fromTemplateUrl('templates/popover/popoverCategory.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popoverCategory = popover;
  });

  $ionicPopover.fromTemplateUrl('templates/popover/popoverOrder.html', {
    scope: $scope
  }).then(function (popover) {
    $scope.popoverOrder = popover;
  });


  $scope.openPopoverCategory = function ($event) {
    $scope.popoverCategory.show($event);
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

.controller('ShopDetailCtrl', function ($scope, $http, $rootScope, $stateParams, types, shops, things, possessionData) {
  //$scope.shops = shops.data;
  $scope.shop = types.fetchShop($stateParams.shopId);
  var shopItems = [];
  angular.forEach(things.data, function (itemValue) {
    if (itemValue.shopName == $scope.shop.shopName) {
      shopItems.push(itemValue)
    }
  })
  $scope.items = shopItems;
  $scope.find = function (item) {
    var exist = false;
    angular.forEach(possessionData.data, function (value) {
      if (value == item._id) {
        exist = true;
      }
    });
    return exist;
  }
  $scope.doRefresh = function () {
    $http.get("http://120.24.168.7/api/shops").success(function (data) {
      $rootScope.shops = data
      $scope.shops = data
      shops.data = data
    }).finally(function () {
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  }
})


.controller('CouponDetailCtrl', function ($scope, $stateParams, localStorageService, $ionicPopup, $ionicScrollDelegate, types, $http, things, preLoadAccount, possessionData) {

  $scope.items = things.data;
  $scope.possession = possessionData.date

  $scope.username = preLoadAccount ? preLoadAccount : $scope.username
  $scope.rate = {
    value: 3
  };
  $scope.max = 5;
  console.log("stateParams are");
  console.log($stateParams);
  console.log(possessionData.data)
  $scope.coupon = types.fetch($stateParams.couponId);
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
  $scope.averageRate = (sumRate / lengthRate).toFixed(2) != "NaN" ? (sumRate / lengthRate).toFixed(2) : "暂无";

  $scope.showComment = false;
  console.log($scope.comment)
  var theNewCoupon = angular.copy($scope.coupon);
  //$scope.comment.push({"text":theNewCoupon.productName})
  $scope.changeShowComment = function () {
    $scope.showComment = !$scope.showComment
    $ionicScrollDelegate.scrollBy(0, 100);
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
        $scope.averageRate = ((sumRate + $scope.rate.value) / (lengthRate + 1)).toFixed(2);

        $scope.commentLength++;
        things.data[$stateParams.couponId].comment = data
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
        title: '请先注册'
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
        console.log(possessionData)
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
            console.log(possessionData)
            console.log(possessionData.data)

            possessionData.data.push(_id);

            $scope.favoritesText = "已经领取"
            $scope.favorites = "button icon-left ion-heart button-positive"
            $scope.coupon.numbers = data
            //console.log(data)
          }
        })
      }
    } else {
      $ionicPopup.alert({
        title: '请先注册'
      })
      $scope.disableClick.value = false

    }
  }

  $scope.favoriteClass = function () {
    var exist = false
    angular.forEach(possessionData.data, function (value) {
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
  .controller('favoriteListCtrl', function ($scope, $stateParams, localStorageService, types, things, possessionData) {
    //localStorageService.clearAll()
    $scope.items = things.data;
    $scope.possession = possessionData.data;
  })
  .controller('AccountCtrl', function ($scope, types, $http, $ionicSideMenuDelegate, localStorageService, $state, $q) {

  })
  .controller('MenuCtrl', function ($scope, types, $http, $ionicSideMenuDelegate, localStorageService, $state, $q) {

  })
  .controller('registerCtrl', function ($scope, $rootScope, $ionicPopup, $ionicSideMenuDelegate, localStorageService, types, $http, $state, $q, preLoadAccount) {
    $scope.product = {};
    $scope.shop = {};
    $scope.image = {};

    $scope.username = preLoadAccount ? preLoadAccount : localStorageService.get("usernameData")
    $scope.usernameExist = preLoadAccount
    $scope.registeredShop = {};
    if($scope.username.shop){
        $scope.registeredShop.done = true;
    } else{
        $scope.registeredShop.done = false;
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
      $scope.shop.userName = $scope.username;
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
