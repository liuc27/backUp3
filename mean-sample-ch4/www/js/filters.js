angular.module('starter.filters', [])
    .filter('possessed', function() {
        return function(items, possession) {
            var result = [];
            angular.forEach(items,function(itemValue) {
                angular.forEach(possession, function (value) {
                    if (itemValue._id == value) {
                        result.push(itemValue)
                    }
                })
            })
            return result
        }
    })
    .filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        }
    })
    .filter('typeFilter', function() {
        return function(items, type) {
            if(type == "all"){
                return items
            } else{
            var result = [];
            angular.forEach(items,function(itemValue) {
                if (itemValue.category == type) {
                    result.push(itemValue)
                }
            })
            return result
            }
        }
    })
 /**
 * Created by chao liu on 2014/11/23.
  $scope.find = function(item) {

            }
 */
