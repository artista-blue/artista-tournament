let app, Controllers;

(function () {

    "use strict";
    
    app = angular.module('app', [
	'ngResource',
	'ui.bootstrap',
	'Controllers'
    ]);

    Controllers = angular.module('Controllers', []);

    Controllers.controller('MainController', MainController);
    MainController.$inject = ['$scope', '$location', 'Competitions','Players'];
    function MainController ($scope, $location, Competitions, Players) {

	const getUrlVars = function(){
	    var vars = {}; 
	    var param = location.search.substring(1).split('&');
	    for(var i = 0; i < param.length; i++) {
		var keySearch = param[i].search(/=/);
		var key = '';
		if(keySearch != -1) key = param[i].slice(0, keySearch);
		var val = param[i].slice(param[i].indexOf('=', 0) + 1);
		if(key != '') vars[key] = decodeURI(val);
	    } 
	    return vars; 
	};

	const vars = getUrlVars();
	$scope.comp_id = vars['comp_id'],
	$scope.event_name = vars['event_name'],
	$scope.clazz_name = vars['clazz_name'];
	Competitions.query({ comp_id: $scope.comp_id}, function (competitions) {
	    $scope.competition = competitions[0];
	    const eventMap = {};
	    console.log($scope.competition);
	    $scope.competition.events.map((event) => {
		eventMap[event.name] = event.physical_name;
	    });
	    $scope.event_physical_name = eventMap[$scope.event_name];
	    
	    $scope.players = Players.query({
		comp_id: $scope.comp_id,
		event_physical_name: $scope.event_physical_name,
		clazz_name: $scope.clazz_name
	    });
	});
    }
    
})();
