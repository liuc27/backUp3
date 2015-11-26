angular.module('starter.controllers', ['naif.base64'])

  .controller('CouponCtrl', function ($scope, $http,$ionicScrollDelegate, $ionicSlideBoxDelegate, $rootScope, localStorageService, types, resolvedItems, resolvedShops, resolvedPossession) {

      $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
      }
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


    $rootScope.averageRate = function (item) {
      return types.caculateItemAverageRate(item);
    }


    $rootScope.commentNumbers = function (item) {
      return types.caculateItemCommentNumbers(item);
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

  .controller('shopsCtrl', function ($rootScope, $scope, types, resolvedShops, $ionicPopover) {
    $scope.typeList = types.typeList();
    $scope.orderList = types.getOrderList();
    $scope.locationList = types.getLocationList();
    $scope.doRefresh = types.doRefresh();

    $scope.selectedType = $scope.typeList[7];
    $scope.selectedLocation = $scope.locationList[4];
    $scope.selectedOrder = $scope.orderList[4];

    //$scope.shops = resolvedShops.data

    $scope.shopRate = {
      value: null
    };


    $rootScope.shopAverageRate = function (shop) {
      return types.caculateShopAverageRate(shop);
    };

    $rootScope.shopCommentNumbers = function (shop) {
      return types.caculateShopCommentNumbers(shop);
    };
  })

  .controller('ShopDetailCtrl', function ($scope, $http,$ionicScrollDelegate, $rootScope, $stateParams, types, resolvedShops, resolvedItems, resolvedPossession) {
    //$scope.shops = resolvedShops.data;
    $scope.shop = types.fetchShop($stateParams.shopId);
    console.log($stateParams.shopId);

    $scope.items = $rootScope.items;
    console.log($scope.items);


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


  .controller('CouponDetailCtrl', function ($scope, $stateParams, $rootScope, localStorageService, $ionicPopup, $ionicScrollDelegate, types, $http, resolvedItems, resolvedAccount, resolvedPossession) {

    //$scope.items = $rootScope.items;
    console.log($rootScope.items);
    $scope.possession = resolvedPossession.date

    $scope.username = resolvedAccount ? resolvedAccount : $scope.username
    $scope.rate = {
      value: 3
    };

    $scope.max = 5;
    console.log("stateParams are");
    console.log($stateParams);
    console.log($rootScope.possession)
    $scope.coupon = types.fetch($stateParams.couponId)
    console.log($scope.coupon)
    $scope.favorites = "button icon-left ion-plus button-positive";
    $scope.favoritesText = "獲得　";
    $scope.commentNumbers = function (item) {
      return types.caculateItemCommentNumbers(item);
    }

    $scope.disableClick = {
      value: false
    }

    $scope.clicked = false;
    $scope.comment = types.comment($stateParams.couponId);


    $scope.showComment = false;
    console.log($scope.comment)
    var theNewCoupon = angular.copy($scope.coupon);
    //$scope.comment.push({"text":theNewCoupon.productName})
    $scope.changeShowComment = function () {
      $scope.showComment = !$scope.showComment
      //$ionicScrollDelegate.scrollBy(0, 100);
    }
    $scope.submitComment = function (couponId) {
      $scope.disableClick.value = true

      if ($scope.username) {

        $http.post("http://120.24.168.7/api/comment", {
          "name": $scope.coupon.name,
          "username": $scope.username,
          "comment": $scope.comment.comment,
          "rate": $scope.rate
        }).success(function (data) {
          console.log(data)
          console.log($scope.showComment)
          $scope.showComment = !$scope.showComment

          $scope.comment = data

          $scope.commentLength++;

          angular.forEach($rootScope.items, function (itemValue) {
            if (itemValue._id == couponId) {
              console.log(itemValue.comment)
              itemValue.comment = data;
              console.log(itemValue.comment)
            }
          });


        }).error(function (data) {
          console.log(data)
          if (data == "Rate limit exceeded") {
            $ionicPopup.alert({
                title: "頻繁的な評価ができません!"
              }
            )
          } else {
            $ionicPopup.alert({
              title: "このIPが暫く評価できません！"
            })
          }
        })

      } else {
        $ionicPopup.alert({
          title: 'ログインしてください！'
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
        if ($scope.favoritesText === "獲得　") {
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
                title: '在庫切れのため、獲得　できません。'
              })
              $scope.favoritesText = "在庫切れ"
            } else {
              $ionicPopup.alert({
                title: '獲得　成功しました!'
              });
              console.log(resolvedPossession)
              console.log($rootScope.possession)

              $rootScope.possession.push(_id);

              $scope.favoritesText = "獲得　済み"
              $scope.favorites = "button icon-left ion-heart button-positive"
              $scope.coupon.numbers = data
              //console.log(data)
            }
          })
        }
      } else {
        $ionicPopup.alert({
          title: 'ログインしてください！'
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
        $scope.favoritesText = "獲得　済み";
        $scope.disableClick.value = true
      }
    };
  })
  .controller('favoriteListCtrl', function ($scope, $ionicScrollDelegate,$rootScope, $stateParams, localStorageService, types, resolvedItems, resolvedPossession) {
    //localStorageService.clearAll()
    //$rootScope.items = resolvedItems.data;
    //$scope.possession = resolvedPossession.data;

  })

  .controller('registerCtrl', function ($scope, $rootScope,$ionicScrollDelegate, $ionicPopup, $ionicSideMenuDelegate, localStorageService, types, $http, $state, $q, resolvedAccount) {
    $scope.product = {};
    $scope.shop = {};
    $scope.image = {};

    $scope.username = resolvedAccount
    if (typeof $scope.username === "undefined" || $scope.username === null) {
      $ionicPopup.alert({
        title: 'ログインしてください'
      });
      setTimeout(function () {
        $state.go('tab.register');
      }, 150)
    } else {
      $ionicPopup.alert({
        title: 'アカウント: ' + $scope.username
      });
      console.log($scope.username)
      setTimeout(function () {
        $state.go('tab.coupon');
      }, 150)

    }
    $scope.registeredShop = {};
    if ($scope.username) {
      $scope.usernameExist = true

      if ($scope.username.shop) {
        $scope.registeredShop.done = true;
      } else {
        $scope.registeredShop.done = false;
      }
    } else {
      $scope.usernameExist = false
    }

    $scope.logout = function () {
      localStorageService.clearAll();
      $rootScope.usernameExist = false
      $rootScope.username = null
      $scope.usernameExist = false
      $scope.username = null
      $ionicPopup.alert({
        title: 'ログアウトしました！'
      });
      setTimeout(function () {
        $state.go('tab.register');
      }, 300)
    }

    $scope.toggleRegisterShop = function () {
      $scope.registeredShop.done = !($scope.registeredShop.done);
    }

    $scope.register = function (username, password) {
      if (username == null || password == null) {
        $ionicPopup.alert({
          title: '正しいユーザ名とパスワードを入力してください！'
        });
      } else {
        $http.post("http://120.24.168.7/api/register", {
          "username": username,
          "password": password
        }).success(function (data) {
          if (data === "already registered") {
            $ionicPopup.alert({
              title: 'ユーザ名も使用されました、他のユーザ名を使用してください！'
            });
          } else if (data === "passed") {
            $rootScope.username = username
            $scope.username = username
            $scope.usernameExist = true
            $ionicPopup.alert({
              title: 'ログイン成功しました！'
            });
            var promise = $q(function (resolve, reject) {
              setTimeout(function () {
                if (localStorageService.set("usernameData", username)) {
                  resolve('クーポンの獲得　をはじめてください!');
                } else {
                  reject('エラー!');
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
              title: '登録成功しました！自動ログイン成功しました!'
            });

            var promise = $q(function (resolve, reject) {
              setTimeout(function () {
                if (localStorageService.set("usernameData", username)) {
                  resolve('クーポンの獲得　をはじめてください!');
                } else {
                  reject('エラー!');
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
      if ($scope.image.shopCertificate) {
        $scope.shop.shopCertificate = "data:" + $scope.image.shopCertificate.filetype + ";base64," + $scope.image.shopCertificate.base64;
      }
    }

    $scope.createUserCertificate = function () {
      if ($scope.image.userCertificate) {
        $scope.shop.userCertificate = "data:" + $scope.image.userCertificate.filetype + ";base64," + $scope.image.userCertificate.base64;
      }
    }

    $scope.sendJson = function () {
      $scope.product.timeLimit = new Date($scope.year, $scope.month - 1, $scope.day, '23', '59', '59');
      $http.post("http://120.24.168.7/api/posts", $scope.product).success(function (data) {
        console.log(data)
        if (data == "already exists") {
          alert("商品も既に存在したため、更新失敗")

        } else {
          alert("更新成功")

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
      if ($scope.shop.shopName == null || $scope.shop.shopAddress == null || $scope.shop.userCertificate == null || $scope.shop.shopContactWay == null || $scope.image.shopCertificate.base64 == null) {
        $ionicPopup.alert({
          title: '項目を全部入力してください！'
        });
      } else {
        console.log($scope.shop);
        $http.post("http://120.24.168.7/api/registerShop", $scope.shop).success(function (data) {
          console.log(data)
          if (data == "OK") {
            $scope.registeredShop.done = true;
            alert("更新成功")

          }
        })
      }
    };


    $scope.showTab = function () {
      $scope.showAccountTab = true;
    }

  });
