var LoginController = function ($scope, $rootScope, $routeParams, $location, UserService) {
    $scope.loginForm = {
        emailAddress: '',
        password: '',
        returnUrl: $routeParams.returnUrl,
        loginFailure: false
    };

    $scope.Login = function () {
        var userTable = {
            email: $scope.loginForm.emailAddress,
            password: $scope.loginForm.password
        };

        var getData = UserService.Login(userTable);
        getData.then(function (msg) {
            if (msg.data === "") {
                $scope.loginForm.loginFailure = true;
            }
            else if (msg.data != null) {
                if (msg.data[0].role === "Admin") {
                    $rootScope.admin_status = true;
                }
                $location.path('/');
                $rootScope.login_status = true;
                $rootScope.uta_id = msg.data[0].uta_id;
                $scope.loginForm.loginFailure = false;                
            }            
        }, function () {
            alert('Error in login');
        });
    }
}

LoginController.$inject = ['$scope', '$rootScope', '$routeParams', '$location', 'UserService'];