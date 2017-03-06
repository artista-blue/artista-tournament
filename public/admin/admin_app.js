let app, Controllers;

(function () {

    "use strict";
    
    app = angular.module('app', [
	'ngRoute',
	'ngResource',
	'ui.bootstrap',
	'Controllers'
    ]);

    app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	    when("/competitions", {
		controller: 'CompetitionsViewController',
		templateUrl: 'competitions/competitions.view.html'
	    }).
	    when("/competition", {
		controller: 'CompetitionRegisterViewController',
		templateUrl: 'competitions/competition_register.view.html'
	    }).
	    otherwise({
		redirectTo: '/'
	    });
    }]);

    Controllers = angular.module('Controllers', []);

    Controllers.controller('AdminMainController', AdminMainController);
    AdminMainController.$inject = ['$scope', '$location'];
    function AdminMainController ($scope, $location) {

	$scope.top = function () {
	    $location.path('/');
	};

	$scope.competitionsView = function () {
	    $location.path('/competitions');
	};
    }
    
})();
