(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['MenuDataService', 'items', '$scope'];
function ItemDetailController(MenuDataService, items, $scope) {
  var itemDetail = this;
  itemDetail.items = items.data.menu_items;
}

})();
