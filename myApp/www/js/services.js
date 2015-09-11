angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('types', function($rootScope, $http, localStorageService, $q, $state, $ionicPopup) {
    var items = [];
    var checked = new Array();
    var username;
    var possession = [];


    var menuList = [{
        id: 0,
        name: '美食',
        icon: 'ion-wineglass',
        color: 'red',
        type: 'food'
    }, {
        id: 1,
        name: '购物',
        icon: 'ion-bag',
        color: '#5383FF',
        type: 'shopping'

    }, {
        id: 2,
        name: '美容',
        icon: 'ion-ios-color-wand',
        color: 'pink',
        type: 'beauty'
    }, {
        id: 3,
        name: '旅馆',
        icon: 'ion-ios-moon',
        color: '#5383FF',
        type: 'hotel'
    }, {
        id: 4,
        name: '电影',
        icon: 'ion-ios-film',
        color: 'silver',
        type: 'house'
    }, {
        id: 5,
        name: '车房',
        icon: 'ion-model-s',
        color: 'gold',
        type: 'car'
    }, {
        id: 6,
        name: 'K歌',
        icon: 'ion-music-note',
        color: 'orange',
        type: 'KTV'
    }, {
        id: 7,
        name: '招聘',
        icon: 'ion-speakerphone',
        color: 'lightgreen',
        type: 'job'
    }, {
        id: 8,
        name: '全部',
        icon: 'ion-speakerphone',
        color: 'lightgreen',
        type: 'all'
    }];

    var orderList = [{
        id: 0,
        name: '距离',
        color: '#5383FF',
        type: 'distance'
    }, {
        id: 1,
        name: '评价',
        color: '#5383FF',
        type: 'rating'

    }, {
        id: 2,
        name: '评价数',
        color: '#5383FF',
        type: 'ratingNumber'

    }, {
        id: 3,
        name: '销量',
        color: '#5383FF',
        type: 'salesNumber'
    }, {
        id: 4,
        name: '全部',
        icon: 'ion-speakerphone',
        color: 'lightgreen',
        type: 'all'
    }];


    var locationList = [{
        id: 0,
        name: '湖北',
        color: '#5383FF',
        type: 'hubei'
    }, {
        id: 1,
        name: '上海',
        color: '#5383FF',
        type: 'shanghai'

    }, {
        id: 2,
        name: '北京',
        color: '#5383FF',
        type: 'beijing'

    }, {
        id: 3,
        name: '香港',
        color: '#5383FF',
        type: 'xianggang'
    }, {
        id: 4,
        name: '全部',
        icon: 'ion-speakerphone',
        color: 'lightgreen',
        type: 'all'
    }];

    return {
        typeList: function() {
            return menuList;
        },
        getMenu: function() {
            return menuList;
        },
        getOrderList: function(){
            return orderList;
        },
        getLocationList: function(){
            return locationList;
        },
        get: function(typeId) {
            return menu[typeId];
        },
        fetch: function(couponId) {
            var x = [];
            angular.forEach(items, function(value) {
                if (value._id == couponId) {
                    x = value;
                }
            })
            return x;
        },
        fetchShop: function(shopId) {
            var x = [];
            angular.forEach(shops, function(value) {
                if (value._id == shopId) {
                    x = value;
                }
            })
            return x;
        },
        fetchFavorite: function(couponId) {
            return checked[couponId];
        },
        getCommentLength: function(comment) {
            if (typeof comment === "undefined") {
                return 0
            } else {
                return comment.length;
            }
        },
        allItems: function() {
            return $http.get("http://120.24.168.7/api/posts").success(function(data) {
                console.log(data.length)
                console.log(data)
                items = data
                return data
            })
        },
        allShops: function() {
            return $http.get("http://120.24.168.7/api/shops").success(function(data) {
                console.log(data.length)
                console.log(data)
                shops = data
                return data
            })
        },
        favoriteList: function() {
            return checked;
        },
        comment: function(couponId) {

            var x = [];
            angular.forEach(items, function(value) {
                if (value._id == couponId) {
                    x = value.comment;
                }
            })
            return x;
        },
        checkPossession: function() {
            return $http.post("http://120.24.168.7/api/user", {
                "username": localStorageService.get("usernameData")
            }).success(function(data) {
                console.log(data);
                console.log(localStorageService.get("usernameData"));

                console.log(data.length);

                if (data.length == 0) {
                    localStorageService.remove("usernameData");
                    username = null;
                } else {
                    return data;
                }
            })
        },
        autoLoginAccount: function() {
            username = localStorageService.get("usernameData")

            return username;

        }
    }
});
