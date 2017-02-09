(function () {

    "use strict";

    Controllers.controller('PlayersViewController', PlayersViewController);
    PlayersViewController.$inject = ['$scope', '$location', 'Players'];
    function PlayersViewController ($scope, $location, Players) {
	$scope.players = Players.query();
    }
})();
