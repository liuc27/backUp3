angular.module('starter.controllers', ['naif.base64', 'ngCordova'])

  .controller('CouponCtrl', function ($scope, $http, $stateParams,$ionicScrollDelegate, $ionicSlideBoxDelegate, $rootScope, localStorageService, types, resolvedItems, resolvedShops, resolvedPossession) {


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
      console.log(menu.type)
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
    $scope.menus = types.getMenu();
    console.log($scope.menus);
    $scope.doRefresh = types.doRefresh()

    console.log($stateParams);
    if($stateParams!=undefined){
    $scope.selectedIndex = $stateParams;
    if($stateParams.couponId!=undefined)
    $scope.chosenItem.value = $scope.menus[$stateParams.couponId].type;
    console.log($scope.chosenItem.value)
    console.log($stateParams)

}

  })
  .controller('CouponCategorySelectedCtrl', function ($scope, $http, $stateParams,$ionicScrollDelegate, $ionicSlideBoxDelegate, $rootScope, localStorageService, types, resolvedItems, resolvedShops, resolvedPossession) {


    $scope.typeList = types.typeList();
    $scope.orderList = types.getOrderList();
    $scope.locationList = types.getLocationList();
    $scope.selectedType = $scope.typeList[7];
    $scope.selectedLocation = $scope.locationList[4];
    $scope.selectedOrder = $scope.orderList[4];

    $rootScope.hideTabs = true;
    $scope.$on('$destroy', function() {
      $rootScope.hideTabs = false;
    });

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
      console.log(menu.type)
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
    $scope.menus = types.getMenu();
    console.log($scope.menus);
    $scope.doRefresh = types.doRefresh()

    console.log($stateParams);
    if($stateParams!=undefined){
    $scope.selectedIndex = $stateParams;
    if($stateParams.couponId!=undefined)
    $scope.chosenItem.value = $scope.menus[$stateParams.couponId].type;
    console.log($scope.chosenItem.value)
    console.log($stateParams)

}

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


        $scope.shareFacebook = function () {
          var url = 'https://www.facebook.com/dialog/share?app_id=149120325435621'
                    + '&display=popup&href=ec2-54-238-168-110.ap-northeast-1.compute.amazonaws.com:8080/www/index.html';

                    window.open(url,"_blank","width=350,height=250,scrollbars=yes");
        }

        $scope.shareLine = function () {
          var url = 'http://line.me/R/msg/text/?http://ec2-54-238-168-110.ap-northeast-1.compute.amazonaws.com:8080/www/index.html';
                    window.open(url,"_blank","width=350,height=250,scrollbars=yes");
        }

        $scope.shareGoogle = function () {
          var url = 'https://plus.google.com/share?url=http://ec2-54-238-168-110.ap-northeast-1.compute.amazonaws.com:8080/www/index.html';
                    window.open(url,"_blank","width=500,height=350,scrollbars=yes");
        }




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

        $http.post("http://ec2-54-238-168-110.ap-northeast-1.compute.amazonaws.com:8080/api/comment", {
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
          $http.post("http://ec2-54-238-168-110.ap-northeast-1.compute.amazonaws.com:8080/api/add", {
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

  .controller('oauthCtrl', function ($scope, $rootScope, $stateParams, localStorageService, $http, $state, $ionicPopup, $location, $q ) {
        $scope.accessToken = JSON.parse(window.localStorage.getItem("token")).oauth.access_token;
        $scope.provider = window.localStorage.getItem("provider");

        $http.post("http://ec2-54-238-168-110.ap-northeast-1.compute.amazonaws.com:8080/api/oauth",{
          "tokenType": $scope.provider,
          "accessToken": $scope.accessToken
        }).success(function (data) {
          console.log(data)
          if (data.type === "newUser") {
            $rootScope.username = data.id
            localStorageService.set("usernameData", data.id)


            //$state.go('tab.login');
            //window.location.href = "http://localhost:8100/#/tab/login";
            //$scope.username = data.id
            //$scope.usernameExist = true
  //          $ionicPopup.alert({
  //                  title: 'ログイン成功しました！'
  //          title: data.id
  //          });
            var promise = $q(function (resolve, reject) {
              setTimeout(function () {
                if (localStorageService.set("usernameData", data.id)) {
                  resolve('クーポンの獲得　をはじめてください!');
                } else {
                  reject('エラー!');
                }
              }, 10);
            });

            promise.then(function (greeting) {
              //console.log(localStorageService.get("usernameData"));
              //alert('Success: ' + greeting);
              $state.go('tab.login');
              //window.location.replace("http://localhost:8100/#/tab/login");
            }, function (reason) {
              //alert('Failed: ' + reason);
              $state.go('tab.login');
              //window.location.replace("http://localhost:8100/#/tab/login");
            });

          }else if (data.type === "oldUser") {
            $ionicPopup.alert({
              title: '欢迎您再次使用～赶紧的去挑选吧！'
            });
            //$scope.username = data.id;
            //$scope.usernameExist = true;
            $rootScope.username = data.id;
            localStorageService.set("usernameData", data.id)
            $state.go('tab.login');
            }else{
            $ionicPopup.alert({
              title: 'something went wrong.'
            });
              $state.go('tab.login');
          }
        })

    })



  .controller('registerNewCtrl', function ($scope, $rootScope, localStorageService, $state, $http, $ionicPopup) {
    $scope.backLogin = function(){
      $state.go('tab.login');
    }

    $scope.registerNew = function(username,password,email,nickname){
      $http.post("http://ec2-54-238-168-110.ap-northeast-1.compute.amazonaws.com:8080/api/registerNew",{
        "username": username,
        "password": password,
        "email": email,
        "nickname": nickname
      }).success(function (data) {
        console.log(data)
        if(data === "success"){
          $ionicPopup.alert({
            title: 'Register Success!'
          });
          //$scope.usernameExist = true;
          $rootScope.username = username;
          localStorageService.set("usernameData", username)
          $state.go('tab.login');

        }else if(data === "exist"){
          $ionicPopup.alert({
            title: 'Username exist. Please try another one'
          });

        }else{
          $ionicPopup.alert({
            title: 'Unknown error occured'
          });
          $state.go('tab.login');
        }

      })

    }

  })

  .controller('loginCtrl',  function($scope, $rootScope, $ionicPopup, $cordovaOauth, localStorageService, $http, $state, $q, resolvedAccount) {
        //$scope.username = resolvedAccount
        $scope.username = $rootScope.username
        if (typeof $scope.username === "undefined" || $scope.username === null) {
          $ionicPopup.alert({
            title: 'ログインしてください'
          });
          setTimeout(function () {
            $state.go('tab.login');
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
        if ($scope.username) {
          $scope.usernameExist = true
        } else {
          $scope.usernameExist = false
        }

        $scope.logout = function () {
          localStorageService.clearAll();
          console.log($scope.username)
          $rootScope.usernameExist = false
          $rootScope.username = null
          $scope.usernameExist = false
          $scope.username = null
          $ionicPopup.alert({
          title: 'ログアウトしました！'
          });
          setTimeout(function () {
            $state.go('tab.login');
          }, 300)
        }


        $scope.loginGoogle = function() {
                    var client_id="664538543521-mk52iolffl800pke2m7dn05dntqh3o6g.apps.googleusercontent.com";
                    var scope="email%20profile";
                    var o="http://localhost:8100/oauth/google_cb.html";
                    var response_type="token";
                    var u="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+o+
                    "&response_type="+response_type;
                    window.location.replace(u);


        };

        $scope.loginFacebook = function() {
                    var client_id="149120325435621";
                    var o="http://localhost:8100/oauth/facebook_cb.html";
                    var response_type="token";
                    var u="https://www.facebook.com/v2.0/dialog/oauth?client_id="+client_id+"&redirect_uri="+o+
                    "&response_type="+response_type;
                    window.location.replace(u);
        };

        $scope.loginYahoo = function() {
                    var client_id="dj0zaiZpPXVaU0pCNmFsdnNjaSZzPWNvbnN1bWVyc2VjcmV0Jng9MmE-";
                    var o="http://localhost:8100/oauth/yahoo_cb.html";
                    var response_type="token";
                    var scope="openid profile"
                    var u="https://auth.login.yahoo.co.jp/yconnect/v1/authorization?client_id="+client_id+"&redirect_uri="+o+
                    "&response_type="+response_type+"&scope="+scope;
                    window.location.replace(u);
        };

        $scope.loginLine = function() {
            var client_id="1469916875";
            //var o="https%3A%2F%2Flocalhost%3A8100%2Foauth%2Fline_cb.html";
            var o="https://127.0.0.1:8100/oauth/line_cb.html";
            var response_type="code";
            var u="https://access.line.me/dialog/oauth/weblogin?client_id="+client_id+"&redirect_uri="+o+
            "&response_type="+response_type+"&state=12345";
            window.location.replace(u);
          };



        $scope.goRegister = function(){
          $state.go('tab.registerNew');
        }

          $scope.login = function(username,password){
            if (username == null || password == null) {
              $ionicPopup.alert({
                title: '正しいユーザ名とパスワードを入力してください！'
              });
            } else{
              $http.post("http://ec2-54-238-168-110.ap-northeast-1.compute.amazonaws.com:8080/api/login",{
                "username": username,
                "password": password
              }).success(function (data) {
                console.log(data)
                if(data === "success"){
                  $ionicPopup.alert({
                    title: 'Login Success!'
                  });
                  $scope.username = username;
                  $scope.usernameExist = true;
                  $rootScope.username = username;
                  localStorageService.set("usernameData", username)
                  $state.go('tab.coupon');

                }else if(data === "account not exist"){
                  $ionicPopup.alert({
                    title: 'Account not exist. Please try again'
                  });
                  $state.go('tab.login');

                }else if(data === "wrong password"){
                  $ionicPopup.alert({
                    title: 'Wrong password. Please try again'
                  });
                  $state.go('tab.login');

                }else{
                  $ionicPopup.alert({
                    title: 'Unknown error occured'
                  });
                  $state.go('tab.login');
                }

              })

            }

          }



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
        $http.post("http://ec2-54-238-168-110.ap-northeast-1.compute.amazonaws.com:8080/api/register", {
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
      $http.post("http://ec2-54-238-168-110.ap-northeast-1.compute.amazonaws.com:8080/api/posts", $scope.product).success(function (data) {
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
      $http.post("http://ec2-54-238-168-110.ap-northeast-1.compute.amazonaws.com:8080/api/replace", $scope.product).success(function (data) {
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
        $http.post("http://ec2-54-238-168-110.ap-northeast-1.compute.amazonaws.com:8080/api/registerShop", $scope.shop).success(function (data) {
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
