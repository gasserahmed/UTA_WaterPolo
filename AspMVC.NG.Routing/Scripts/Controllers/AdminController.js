var AdminController = function ($scope, $rootScope, $location, WaterPoloService) {

    $scope.GetUsers = function () {
        var getData = WaterPoloService.GetUsers();
        getData.then(function (user) {
            $scope.users = user.data;
        }, function () {
            alert('Error in getting records');
        });
    };

    $scope.FormatJsonDate = function (dateValue) {
        return new Date(dateValue.match(/\d+/)[0] * 1);
    }

    $scope.EditRowEvent = function (user) {
        $('.formData').slideDown();
        $scope.first_name = user.first_name;
        $scope.last_name = user.last_name;
        $scope.utaid = user.uta_id;
        $scope.email = user.email;
        $scope.password = user.password;
        $scope.confirmPassword = user.password;
        $scope.role = user.role;
        $scope.status = user.status;
        $scope.last_activity = $scope.FormatJsonDate(user.last_activity);
        $scope.uta_id = user.uta_id;
    };

    $scope.DeleteRowEvent = function (user) {
        var result = confirm("Want this user to delete?");
        if (!result) {
            return;
        }

        var userTable = {
            uta_id: user.uta_id
        };

        var getData = WaterPoloService.DeleteUser(userTable);
        getData.then(function (msg) {
            if (msg.data === "success") {
                $scope.GetUsers();
                alert("Successully deleted!");                
            }
            else {
                alert("Failed to delete.");
            }
        }, function () {
            alert('Error in deleting record');
        });
    };

    $scope.AddUser = function () {
        var userTable = {
            uta_id: $scope.utaID,
            email: $scope.emailAddress,
            password: $scope.password,
            first_name: $scope.firstName,
            last_name: $scope.lastName,
            role: $scope.role,
            status: $scope.status
        };

        var getData = WaterPoloService.AddUser(userTable);
        getData.then(function (msg) {
            if (msg.data === "Duplicated") {
                $scope.duplicated = true;
                $rootScope.login_status = false;
            }
            else if (msg.data === "Registered") {
                alert("Register Successful!");
                $scope.duplicated = false;
                $rootScope.login_status = true;
                $location.path('/');
            }
        }, function () {
            alert('Error in adding record');
        });
    }

    $scope.UpdateUser = function () {
        var userTable = {
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            email: $scope.email,
            role: $scope.role,
            status: $scope.status,
            last_activity: $scope.last_activity,
            uta_id: $scope.uta_id
        };

        var getData = WaterPoloService.UpdateUser(userTable);
        getData.then(function (msg) {
            if (msg.data != "") {
                $('.formData').slideUp();
                $scope.GetUsers();
            }
        }, function () {
            alert('Error in adding event!');
        });
    }


    $scope.AddNewIcon = function () {
        $('.formData').slideToggle();
        //$scope.description = "";
        //$scope.location = "";
        //$scope.startDate = "";
        //$scope.endDate = "";
        //$scope.startTime = "";
        //$scope.endTime = "";
        //$scope.fee = "";
        //$scope.event_id = "";
    }
    $scope.DeleteEvent = function (event) {

    };
    
}

AdminController.$inject = ['$scope', '$rootScope', '$location', 'WaterPoloService'];