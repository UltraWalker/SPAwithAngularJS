(function () {
'use strict';

angular.module('MenuApp')
.component('itemDetail', {
  templateUrl: 'src/menu/templates/itemDetail.component.template.html',
  bindings: {
    items: '<'
  }
});

})();
