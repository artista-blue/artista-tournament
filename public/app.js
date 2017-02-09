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
	    when("/players", {
		controller: 'PlayersViewController',
		templateUrl: 'players/players.view.html'
	    }).
	    when("/events", {
		controller: 'EventsViewController',
		templateUrl: 'events/events.view.html'
	    }).
	    when("/tournament", {
		controller: 'TournamentViewController',
		templateUrl: 'tournament/tournament.view.html'
	    }).
	    otherwise({
		redirectTo: '/'
	    });
    }]);

    Controllers = angular.module('Controllers', []);

    Controllers.controller('MainController', MainController);
    MainController.$inject = ['$scope', '$location'];
    function MainController ($scope, $location) {

	$scope.top = function () {
	    $location.path('/');
	};

	$scope.playersView = function () {
	    $location.path('/players');
	};

    	$scope.eventsView = function (type) {
	    $scope.eventType = type;
	    $location.path('/events');
	};
}
    
})();
