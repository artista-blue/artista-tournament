(function () {

    "use strict";

    Controllers.controller('CompetitionRegisterViewController', CompetitionRegisterViewController);
    CompetitionRegisterViewController.$inject = ['$scope', '$location', 'Competitions'];
    function CompetitionRegisterViewController ($scope, $location, Competitions) {

	$scope.addMeta = function (meta) {
	    const m = { "": "" };
	    $scope.competition.metas.push(m);
	};

	$scope.delMeta = function (index) {
	    $scope.competition.metas.splice(index, 1);
	};
	
	$scope.addEvent = function () {
	    const ev = {
		id: $scope.competition.events.length + 1,
		name: null,
		classes: [
		    {
			id: 1,
			name: null
		    }
		]
	    };
	    $scope.competition.events.push(ev);
	};

	$scope.delEvent = function (event) {
	    const index = $scope.competition.events.indexOf(event);
	    $scope.competition.events.splice(index, 1);
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
	    const instance = new Competitions($scope.competition);
	    instance.status = "INITIALIZED";
	    instance.$save(function (instance, resHeader) {
		if (instance) {
		    $location.path('competitions');
		    return;
		}
		const header = resHeader();
		console.log(header);
	    });
	};

	$scope.updateCompetition = function () {
	    $scope.competition.$save();
	};

	if (!$scope.competition) {
	    const meta = {"":""};
	    $scope.competition = {
		id: 1,
		name: "",
		events: [],
		metas: [ meta ]
	    };
	    $scope.addEvent();
	    $scope.mode = 'create';
	} else {
	    $scope.mode = 'edit';
	}
    }
})();
