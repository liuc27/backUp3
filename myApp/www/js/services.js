angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
  .factory('types', function ($rootScope, $http, localStorageService, $q, $state, $ionicPopup) {
    var items = [];
    var shops = [];
    var checked = new Array();
    var username;
    var possession = [];


    var menuList = [{
      id: 0,
      name: '食べる',
      icon: 'ion-wineglass',
      color: 'red',
      type: 'food'
    }, {
      id: 1,
      name: 'ショピング',
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
      name: '泊まる',
      icon: 'ion-ios-moon',
      color: '#5383FF',
      type: 'hotel'
    }, {
      id: 4,
      name: '映画',
      icon: 'ion-ios-film',
      color: 'silver',
      type: 'movie'
    }, {
      id: 5,
      name: '車・不動産',
      icon: 'ion-model-s',
      color: 'gold',
      type: 'car'
    }, {
      id: 6,
      name: 'カラオケ',
      icon: 'ion-speakerphone',
      color: 'lightgreen',
      type: 'job'
    }, {
      id: 7,
      name: '全て',
      icon: 'ion-pinpoint',
      color: 'orange',
      type: 'all'
    }];

    var orderList = [{
      id: 0,
      name: '距離が近い',
      color: '#5383FF',
      type: 'distance'
    }, {
      id: 1,
      name: '評価が高い',
      color: '#5383FF',
      type: 'rating'

    }, {
      id: 2,
      name: '評価数が多い',
      color: '#5383FF',
      type: 'ratingNumber'

    }, {
      id: 3,
      name: '販売数が多い',
      color: '#5383FF',
      type: 'salesNumber'
    }, {
      id: 4,
      name: '標準',
      icon: 'ion-speakerphone',
      color: 'lightgreen',
      type: 'all'
    }];


    var locationList = [{
      id: 0,
      name: '東京',
      color: '#5383FF',
      type: 'hubei'
    }, {
      id: 1,
      name: '上海',
      color: '#5383FF',
      type: 'shanghai'

    }, {
      id: 2,
      name: '香港',
      color: '#5383FF',
      type: 'beijing'

    }, {
      id: 3,
      name: '台湾',
      color: '#5383FF',
      type: 'xianggang'
    }, {
      id: 4,
      name: '全て',
      icon: 'ion-speakerphone',
      color: 'lightgreen',
      type: 'all'
    }];

    return {
      typeList: function () {
        return menuList;
      },
      getMenu: function () {
        return menuList;
      },
      getOrderList: function () {
        return orderList;
      },
      getLocationList: function () {
        return locationList;
      },
      get: function (typeId) {
        return menu[typeId];
      },
      fetch: function (couponId) {
        var x = [];
        angular.forEach($rootScope.items, function (value) {
          if (value._id == couponId) {
            x = value;
          }
        })
        return x;
      },
      fetchShop: function (shopId) {
        var x = [];
        angular.forEach(shops, function (value) {
          if (value._id == shopId) {
            x = value;
          }
        })
        return x;
      },
      fetchFavorite: function (couponId) {
        return checked[couponId];
      },
      allItems: function () {
        return $http.get("http://120.24.168.7/api/posts").success(function (data) {
          console.log(data.length)
          console.log(data)
          items = data
          return data
        })
      },
      allShops: function () {
        return $http.get("http://120.24.168.7/api/shops").success(function (data) {
          console.log(data.length)
          console.log(data)
          shops = data
          return data
        })
      },
      doRefresh: function () {
        return function () {
          $http.get("http://120.24.168.7/api/posts").success(function (data) {
            $rootScope.items = data
            //$scope.items = data
            //resolvedItems.data = data
            console.log(data)
          }).finally(function () {
            // Stop the ion-refresher from spinning
            $http.get("http://120.24.168.7/api/shops").success(function (data) {
              $rootScope.shops = data
              console.log(data)
            }).finally(function () {
              $rootScope.$broadcast('scroll.refreshComplete');
            })
          });
        }
      },
      caculateItemAverageRate: function (item) {
        var sumRate = 0,
          lengthRate = 0;
        angular.forEach(item.comment, function (value) {
          if (value.rate) {
            if (value.rate.value > 0) {
              sumRate += value.rate.value;
              lengthRate++;
            }
          }
        })
        return (sumRate / lengthRate).toFixed(2) != "NaN" ? (sumRate / lengthRate).toFixed(2) + "分" : "";
      },
      caculateItemCommentNumbers: function (item) {
        var commentNumbers = 0;
        angular.forEach(item.comment, function (value) {
          commentNumbers += value.rate.value > 0 ? 1 : 0;
        })

        return commentNumbers > 0 ? (commentNumbers + "评价") : "";
      },
      caculateShopAverageRate: function (shop) {
        var shopCommentLength = 0,
          shopSumRate = 0;
        angular.forEach($rootScope.items, function (itemValue) {
          if (itemValue.shopName == shop.shopName) {


            shopCommentLength += itemValue.comment.length ? itemValue.comment.length : 0;
            angular.forEach(itemValue.comment, function (value) {
              shopSumRate += value.rate.value
            })
          }
        });
        return ( shopSumRate / shopCommentLength).toFixed(2) != "NaN" ? (shopSumRate / shopCommentLength).toFixed(2) + "分" : "";
      },
      caculateShopCommentNumbers: function (shop) {
        var shopCommentLength = 0;
        angular.forEach($rootScope.items, function (itemValue) {
          if (itemValue.shopName == shop.shopName) {

            shopCommentLength += itemValue.comment.length ? itemValue.comment.length : 0;

          }
        });
        return shopCommentLength > 0 ? shopCommentLength + "评价" : "";
      },
      favoriteList: function () {
        return checked;
      },
      comment: function (couponId) {

        var x = [];
        angular.forEach($rootScope.items, function (value) {
          if (value._id == couponId) {
            x = value.comment;
          }
        })
        return x;
      },
      checkPossession: function () {
        return $http.post("http://120.24.168.7/api/user", {
          "username": localStorageService.get("usernameData")
        }).success(function (data) {
          console.log(data);
          console.log(localStorageService.get("usernameData"));

          console.log(data.length);

          if (data.length == 0) {
            //localStorageService.remove("usernameData");
            //username = null;
          } else {
            return data;
          }
        })
      },
      autoLoginAccount: function () {
        username = localStorageService.get("usernameData")

        return username;

      }
    }
  });
