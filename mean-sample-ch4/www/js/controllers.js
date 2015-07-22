angular.module('starter.controllers', [])

    .controller('CouponCtrl', function ($scope,$http, $rootScope, localStorageService, types, things, possessionData) {

        console.log(things)
        $scope.items = things.data
        $scope.chosenItem = {"value": "all"}

        $scope.chooseMenuItem = function(menu,$index){
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

    .controller('typesCtrl', function ($scope, types) {
        $scope.typeList = types.typeList();
    })

    .controller('typeDetailCtrl', function ($scope, $http,$rootScope,$stateParams, types, things, possessionData) {
        $scope.type = types.get($stateParams.typeId).type;
        console.log($scope.type)
        $scope.items = things.data;
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
        $scope.find = function(item) {
            var exist = false;
            angular.forEach(possessionData.data, function (value) {
                if (value == item._id) {
                    exist = true;
                }
            });
            return exist;
        }
    })

    .controller('CouponDetailCtrl', function ($scope, $stateParams, localStorageService, $ionicPopup,$ionicScrollDelegate,types, $http, things, preLoadAccount,possessionData) {

        $scope.items = things.data;
        $scope.possession = possessionData.date

        $scope.username = preLoadAccount ? preLoadAccount : $scope.username
        $scope.rate = {value:3};
        $scope.max = 5;
        console.log("stateParams are");
        console.log($stateParams);
        console.log(possessionData.data)
        $scope.coupon = types.fetch($stateParams.couponId);
        console.log($scope.coupon)
        $scope.favorites = "button icon-left ion-plus button-positive";
        $scope.favoritesText = "点击领取";
        $scope.commentLength = types.getCommentLength($scope.coupon.comment)
        $scope.disableClick = {value:false}

        $scope.clicked = false;
        $scope.comment = types.comment($stateParams.couponId);
        console.log($stateParams.couponId)
        var sumRate = 0, lengthRate = 0;
        console.log($scope.comment)
        angular.forEach($scope.comment, function (value) {
            if(value.rate) {
                if (value.rate.value > 0) {
                    sumRate += value.rate.value;
                    lengthRate++;
                }
            }
        })
        $scope.averageRate = (sumRate/lengthRate).toFixed(2)!="NaN" ? (sumRate/lengthRate).toFixed(2) : "暂无";

        $scope.showComment = false;
        console.log($scope.comment)
        var theNewCoupon = angular.copy($scope.coupon);
        //$scope.comment.push({"text":theNewCoupon.productName})
        $scope.changeShowComment = function() {
            $scope.showComment = !$scope.showComment
            $ionicScrollDelegate.scrollBy(0,100);
        }
        $scope.submitComment = function () {
            var couponName = $scope.coupon.name
            $scope.disableClick.value = true

            if($scope.username){

                $http.post("http://120.24.168.7/api/comment",{
                    "name": couponName,
                    "username":$scope.username,
                    "comment": $scope.comment.comment,
                    "rate": $scope.rate
                }).success(function (data) {
                    console.log(data)
                    console.log($scope.showComment)
                    $scope.showComment = !$scope.showComment

                    $scope.comment = data
                    $scope.averageRate = ((sumRate+$scope.rate.value)/(lengthRate+1)).toFixed(2);

                    $scope.commentLength++;


                    angular.forEach(things.data, function (value) {
                        if (value._id == $stateParams.couponId) {
                            value.comment = data;
                        }
                    })
                }).error(function(data){
                    console.log(data)
                    if(data == "Rate limit exceeded"){
                        $ionicPopup.alert({
                                title: "为防止刷分,用户无法频繁评论,请见谅!"
                            }

                        )}else{
                        $ionicPopup.alert({
                            title: "当前IP暂时禁止评论"
                        })
                    }
                })

            } else{
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
            if($scope.username){
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
                            console.log( possessionData)
                            console.log( possessionData.data)

                            possessionData.data.push(_id);

                            $scope.favoritesText = "已经领取"
                            $scope.favorites = "button icon-left ion-heart button-positive"
                            $scope.coupon.numbers = data
                            //console.log(data)
                        }
                    })
                }
            } else{
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
    .controller('AccountCtrl', function ($scope, types, $http, $ionicSideMenuDelegate, localStorageService,$state,$q) {

    })
    .controller('MenuCtrl', function ($scope, types, $http, $ionicSideMenuDelegate, localStorageService,$state,$q) {

    })
    .controller('registerCtrl', function ($scope,$rootScope, $ionicPopup, $ionicSideMenuDelegate,localStorageService, types, $http, $state, $q, preLoadAccount) {

        $scope.username = preLoadAccount ? preLoadAccount: localStorageService.get("usernameData")
        $scope.usernameExist = preLoadAccount
        $scope.register = function (username, password) {
            if(username == null || password == null){
                $ionicPopup.alert({
                    title: '请输入正确的用户名和密码！'
                });
            }else {
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

                        var promise = $q(function(resolve, reject) {
                            setTimeout(function() {
                                if (localStorageService.set("usernameData", username)) {
                                    resolve('开始抢折扣卷吧!');
                                } else {
                                    reject('出错咯,开始抢折扣卷吧!');
                                }
                            }, 10);
                        });

                        promise.then(function(greeting) {
                            //console.log(localStorageService.get("usernameData"));
                            //alert('Success: ' + greeting);
                            $state.go('tab.coupon');
                        }, function(reason) {
                            //alert('Failed: ' + reason);
                            $state.go('tab.coupon');
                        });

                    }
                });
            }
        };

        $scope.showTab = function(){
            $scope.showAccountTab = true;
        }

    });
