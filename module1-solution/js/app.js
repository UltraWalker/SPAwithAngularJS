(function () {
	'use strict';

	angular.module('LunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope) {
		  $scope.check = function () {
			  	if($scope.dishlist4launch==undefined || $scope.dishlist4launch=="") {
			  		$scope.message = "Please enter data first";
			  		$scope.MessageExtraClass = "alert-danger";
			  		$scope.InputExtraClass = "has-error";	
			  	}
			  	else {
			  		$scope.MessageExtraClass = "alert-success";
			  		$scope.InputExtraClass = "has-success";
			  		var parts = $scope.dishlist4launch.split(",");
			  		var count = parts.length;
			  		console.log(parts);
			  		for(var i=0; i<count; ++i) {
			  			if(parts[i].trim()=="")
			  				count--;
			  		}
			  		console.log(count);
			  		if(count <= 3) {
			  			$scope.message = "Enjoy!";
			  		}
				  	else {
				  		$scope.message = "Too much!";
				  	}
				}
		  }
	}
})();
