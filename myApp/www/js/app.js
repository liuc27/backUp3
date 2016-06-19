// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'naif.base64', 'starter.controllers', 'starter.services', 'starter.filters', 'ionic.rating', 'LocalStorageModule', 'ngCordova'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .config(function ($ionicConfigProvider) {
  })
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('myApp')
      .setNotify(true, true)
  })
  .config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
      // setup an abstract state for the tabs directive
      .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html",
        resolve: {
          resolvedItems: function (types) {
            return types.allItems()
          },
          resolvedPossession: function (types) {
            return types.checkPossession()
          },
          resolvedShops: function (types) {
            return types.allShops()
          },
          resolvedAccount: function (types) {
            return types.autoLoginAccount()
          }
        }
      })

      .state('tab.login', {
        url: '/login',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-login.html',
            controller: 'loginCtrl'

          }
        }
      })
      .state('tab.registerNew', {
        url: '/registerNew',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-registerNew.html',
            controller: 'registerNewCtrl'
          }
        }
      })
      .state('tab.oauth', {
        //url: '/google/oauth/#:access_token&:token_type&:expires_in',
        url: '/oauth',
        views: {
          'tab-account': {
            templateUrl: '/templates/tab-oauth.html',
            controller: 'oauthCtrl'
          }
        }
      })
      .state('tab.register', {
        url: '/register',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-register.html',
            controller: 'registerCtrl'
          }
        }
      })

      .state('tab.favoriteList', {
        url: '/favoriteList',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-favoriteList.html',
            controller: 'favoriteListCtrl'

          }
        }
      })

      .state('tab.favoriteListCouponDetail', {
        url: '/favoriteList/:couponId',
        views: {
          'tab-account': {
            templateUrl: 'templates/tab-coupon-detail.html',
            controller: 'CouponDetailCtrl'
          }
        }
      })

      .state('tab.coupon', {
        url: '/coupon',
        views: {
          'tab-coupon': {
            templateUrl: 'templates/tab-coupon.html',
            controller: 'CouponCtrl'
          }
        }
      })

      .state('tab.coupon-category', {
        url: '/coupon-category/:couponId',
        views: {
          'tab-coupon': {
            templateUrl: 'templates/tab-coupon-category.html',
            controller: 'CouponCategorySelectedCtrl'
          }
        }
      })
      .state('tab.coupon-detail', {
        url: '/coupon-detail/:couponId',
        views: {
          'tab-coupon': {
            templateUrl: 'templates/tab-coupon-detail.html',
            controller: 'CouponDetailCtrl'
          }
        }
      })

      .state('tab.tab-shops', {
        url: '/shops',
        views: {
          'tab-types': {
            templateUrl: 'templates/tab-shops.html',
            controller: 'shopsCtrl'
          }
        }
      })

      .state('tab.tab-shop-detail', {
        url: '/shop-detail/:shopId',
        views: {
          'tab-types': {
            templateUrl: 'templates/tab-shop-detail.html',
            controller: 'ShopDetailCtrl'
          }
        }
      })
      .state('tab.tab-shop-coupon-detail', {
        url: '/shop-detail-item/:couponId',
        views: {
          'tab-types': {
            templateUrl: 'templates/tab-coupon-detail.html',
            controller: 'CouponDetailCtrl'
          }
        }
      });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/login');

  });
