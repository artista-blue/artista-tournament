(function () {

    "use strict";

    Controllers.controller('EventsViewController', EventsViewController);
    EventsViewController.$inject = ['$scope', '$location', 'Events'];
    function EventsViewController ($scope, $location, Events) {

	const getData = () => {
	    Events.get({event_type: $scope.eventType}, (event) => {
		const clazzList = [];
		Object.keys(event).forEach((clazzName) => {
		    const list = event[clazzName];
		    let clazz = {
			eventType: $scope.eventType,
			name: clazzName,
			players: list
		    };
		    if (!Array.isArray(list)) {
			return;
		    }
		    $scope.clazzMap[clazzName] = clazz;
		    clazzList.push(clazz);
		});
		$scope.clazzes = clazzList;
	    });
	};

	$scope.clazzMap = {};
	getData();

	$scope.tournamentView = function (clazz) {
	    $scope.$parent.eventType = clazz.eventType;
	    $scope.$parent.clazzName = clazz.name;
	    $scope.$parent.players = $scope.clazzMap[clazz.name];
	    $location.path('/tournament');	    
	};

	$scope.openMergeDialog = () => {
	};

	$scope.merge = () => {
	    // merge request via API

	    // reload
	    
	};

	$scope.$watch('eventType', () => {
	    getData();
	});

    }
})();
