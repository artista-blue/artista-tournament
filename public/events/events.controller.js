(function () {

    "use strict";

    Controllers.controller('EventsViewController', EventsViewController);
    EventsViewController.$inject = ['$scope', '$location', 'Events'];
    function EventsViewController ($scope, $location, Events) {

	const getData = () => {
	    Events.get({event_type: $scope.eventType}, (events) => {
		const eventList = [];
		Object.keys(events).forEach((eventName) => {
		    const list = events[eventName];
		    let event = {
			name: eventName,
			players: list
		    };
		    if (!Array.isArray(list)) {
			return;
		    }
		    eventList.push(event);
		});
		$scope.events = eventList;
	    });
	};
	
	getData();

	$scope.$watch('eventType', () => {
	    getData();
	});

    }
})();
