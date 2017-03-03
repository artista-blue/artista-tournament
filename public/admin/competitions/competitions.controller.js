(function () {

    "use strict";

    Controllers.controller('CompetitionsViewController', CompetitionsViewController);
    CompetitionsViewController.$inject = ['$scope', '$location', 'Competitions'];
    function CompetitionsViewController ($scope, $location, Competitions) {

	$scope.newCompetition = {
	    id: 1,
	    name: "",
	    events: []
	};

	$scope.addEvent = function () {
	    const ev = {
		id: $scope.newCompetition.events.length + 1,
		name: null,
		classes: [
		    {
			id: 1,
			name: null
		    }
		]
	    };
	    $scope.newCompetition.events.push(ev);
	};

	$scope.addClass = function (event, lastIndex) {
	    event.classes.push({
		id: lastIndex + 1,
		name: null
	    });
	};

	$scope.delClass = function (event, clazz) {
	    const index = event.classes.indexOf(clazz);
	    event.classes.splice(index, 1);
	    // renumbering
	    event.classes.forEach((clazz, i) => {
		clazz.id = i + 1;
	    });
	};
	
	$scope.createNewCompetition = function () {
	    window.alert(JSON.stringify($scope.newCompetition, null, 4));
	};

    }
})();
