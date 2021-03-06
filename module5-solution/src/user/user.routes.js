(function() {
'use strict';

angular.module('user')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('myinfo', {
      url: '/myinfo',
      templateUrl: "src/user/myinfo.template.html",
      controller: 'myInfoController',
      controllerAs: 'profileCtrl',
      resolve: {
        MenuItem: ['SubscriptionService', function (SubscriptionService) {
          if(SubscriptionService.userSubscribed())
            return SubscriptionService.getMenu4ShortName();
          return null;
        }]
      }
    });
}
})();
