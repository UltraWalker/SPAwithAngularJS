(function () {
'use strict';

angular.module('MenuApp')
.component('categoryList', {
  templateUrl: 'src/menu/templates/categoryList.component.template.html',
  bindings: {
    items: '<'
  }
});

})();
