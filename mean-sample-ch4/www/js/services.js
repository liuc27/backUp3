angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
    .factory('types', function ($rootScope, $http, localStorageService, $q, $state,$ionicPopup) {
        var items = [];
        var checked = new Array();
        var username;
        var possession = [];
        username = localStorageService.get("usernameData")
        //localStorageService.clearAll();

        console.log(localStorageService.get("usernameData"))

        if(username === null){
            $ionicPopup.alert({
                title: '请注册帐号'
            });
            setTimeout(function() {
                $state.go('tab.register');
            },100)
        }else{
            $ionicPopup.alert({
                title: '已登录帐号: ' + username
            });
            console.log(username)
            setTimeout(function() {
                $state.go('tab.coupon');
            },100)

        }

        var menu = [
            {
                id: 0,
                name: '美食',
                icon: 'ion-wineglass',
                color: 'red',
                type:'food'
            },
            {
                id: 1,
                name: '购物',
                icon: 'ion-bag',
                color: '#5383FF',
                type: 'shopping'

            },
            {
                id: 2,
                name: '美容',
                icon: 'ion-ios-color-wand',
                color: 'pink',
                type: 'beauty'
            },
            {
                id: 3,
                name: '旅馆',
                icon: 'ion-ios-moon',
                color: '#5383FF',
                type: 'hotel'
            },            {
                id: 4,
                name: '电影',
                icon: 'ion-ios-film',
                color: 'silver',
                type: 'house'
            },
            {
                id: 5,
                name: '车房',
                icon: 'ion-model-s',
                color: 'gold',
                type: 'car'
            },
            {
                id: 6,
                name: 'K歌',
                icon: 'ion-music-note',
                color: 'orange',
                type: 'KTV'
            },
            {
                id: 7,
                name: '招聘',
                icon: 'ion-speakerphone',
                color: 'lightgreen',
                type: 'job'
            }
        ];


        return {
            typeList: function () {
                return menu;
            },
            getMenu: function () {
                return menu;
            },
            get: function (typeId) {
                return menu[typeId];
            },
            fetch: function (couponId) {
                var x = [];
                angular.forEach(items, function (value) {
                    if (value._id == couponId) {
                            x = value;
                    }
                })
                return x;
            },
            fetchFavorite: function (couponId) {
                return checked[couponId];
            },
            getCommentLength: function(comment) {
                if (typeof comment === "undefined") {
                    return 0
                } else{
                    return comment.length;
                }
            },
            allItems: function () {
                return  $http.get("http://120.24.168.7/api/posts").success(function (data) {
                    console.log(data.length)
                    console.log(data)
                    items = data
                    return data
                })
            },
            favoriteList: function () {
                return checked;
            },
            comment: function (couponId) {
                angular.forEach(items, function (value) {
                    if (value._id == couponId) {
                        x = value.comment;
                    }
                })
                return x ? x : false;
            },
            checkPossession: function(){
                return $http.post("http://120.24.168.7/api/user", {
                    "username": localStorageService.get("usernameData")
                }).success(function (data) {
                    console.log(data);
                    if (data == "not exist"){
                        localStorageService.remove("usernameData");
                        username = null;
                    }else{
                        return data;
                    }
                })
            },
            autoLoginAccount: function(){
                return username;
            }
        }
    });

