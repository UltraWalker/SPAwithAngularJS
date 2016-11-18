(function () {
"use strict";

angular.module('common')
.service('SubscriptionService', SubscriptionService);


SubscriptionService.$inject = ['$http', 'ApiPath'];
function SubscriptionService($http, ApiPath) {
  var service = this;
  service.uesr = null;
  service.user_subscribed = false;
  
  service.userSubscribed = function() {
      return service.user_subscribed;
  };

  service.saveUser = function (user) {
  	service.user = user;
  	service.user_subscribed = true;
    return true;
  };

  service.getUser = function () {
    return service.user;
  };  

  service.validateShortName = function (short_name) {
    return $http.get(ApiPath + '/menu_items/'+short_name+'.json').then(function (response) {
      return true;
    },function(response) {
      return false;
    });
  };

  service.shortNames = function () {
    return $http.get(ApiPath + '/menu_items.json').then(function (response) {
        return response.data;
    }).then(function(data) {
        var short_names = [];
        var count = data.menu_items.length;
        for(var i=0;i<count;++i) {
            short_names.push(data.menu_items[i].short_name);
        }
        // console.log(short_names);
        return short_names;
    });
  };

}



})();
