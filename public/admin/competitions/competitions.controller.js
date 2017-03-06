(function () {

    "use strict";

    Controllers.controller('CompetitionsViewController', CompetitionsViewController);
    CompetitionsViewController.$inject = ['$scope', '$location', 'Competitions'];
    function CompetitionsViewController ($scope, $location, Competitions) {

	$scope.competitions = Competitions.query();

	$scope.createCompetition = function () {
	    $scope.$parent.competition = null;
	    $location.path('competition');
	};

	$scope.editCompetition = function (competition) {
	    $scope.$parent.competition = competition;
	    $location.path('competition');
	};

	$scope.playersView = function (competition) {
	    $scope.$parent.competition = competition;
	    $location.path('players');
	};
    }
})();
