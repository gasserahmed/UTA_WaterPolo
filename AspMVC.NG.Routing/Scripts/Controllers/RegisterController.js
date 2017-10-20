var RegisterController = function ($scope, $rootScope, $location, UserService) {
    $scope.regex = '\[^0-9]+';
    // declare registerForm object
    $scope.registerForm = {
        utaID:'',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        role: '',
        status: '',
        lastActivity: '',
        registrationFailure: false
    };
    $scope.duplicated = false;

    $scope.RegisterUser = function () {
        var userTable = {
            uta_id: $scope.utaID,
            email: $scope.emailAddress,
            password: $scope.password,
            first_name: $scope.firstName,
            last_name: $scope.lastName
        };

        var getData = UserService.RegisterUser(userTable);
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
            alert('Error in registering record');
        });
    }
}

RegisterController.$inject = ['$scope', '$rootScope', '$location', 'UserService'];