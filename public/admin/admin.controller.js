(function () {

    "use strict";

    Controllers.controller('AdminViewController', AdminViewController);
    AdminViewController.$inject = ['$scope', '$location', 'Competitions'];
    function AdminViewController ($scope, $location, Competitions) {

	$scope.create = () => {
	    const json = {
		name: $scope.newCompetitonName
	    };
	    Competitions.create(json);
	};
    }
})();
