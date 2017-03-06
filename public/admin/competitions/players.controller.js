(function () {

    "use strict";

    Controllers.controller('PlayersViewController', PlayersViewController);
    PlayersViewController.$inject = ['$scope', '$location', 'Players', 'Competitions'];
    function PlayersViewController ($scope, $location, Players, Competitions) {

	Competitions.query(function (competitions) {
	    $scope.competition = competitions[0];
	});

	const cond = {
	    id: $scope.competition.id
	};
	Players.query(cond, function (players) {
	    /* temporary */
	    $scope.players = players.map(function (player) {
		player.events = {
		    "massogi": player.massogi,
		    "tul": player.tul,
		    "special": player.special
		};
		player.metas = {
		    "dojo": player.dojo
		};
		delete player.massogi;
		delete player.tul;
		delete player.special;
		delete player.dojo;
		return player;
	    });
	});
    }
})();
