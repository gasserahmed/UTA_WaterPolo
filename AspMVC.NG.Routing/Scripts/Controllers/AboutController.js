var AboutController = function ($scope, $rootScope, $location, WaterPoloService) {

    $scope.GetAbout = function () {
        var getData = WaterPoloService.GetAbout();
        getData.then(function (about) {
            $scope.events = about.data;
            $scope.mission = $scope.events[0].mission;
            $scope.exec_board = $scope.events[0].exec_board;
            $scope.practices = $scope.events[0].practices;
            $scope.address = $scope.events[0].address;


        }, function () {
            alert('Error in getting records');
        });
    };

    $scope.UpdateAbout = function () {
        var aboutTable = {
            mission: $scope.mission,
            exec_board: $scope.exec_board,
            practices: $scope.practices,
            address: $scope.address
        };

        var getData = WaterPoloService.UpdateAbout(aboutTable);
        getData.then(function (msg) {
            if (msg.data != "") {
                alert(msg.data);
            }
        }, function () {
            alert('Error in updating event!');
        });
    }
    
}

AboutController.$inject = ['$scope', '$rootScope', '$location', 'WaterPoloService'];