var LogoutController = function ($rootScope, $location) {
    $rootScope.login_status = false;
    $rootScope.admin_status = false;
    $rootScope.uta_id = "";
    $location.path('/login');
}

LogoutController.$inject = ['$rootScope', '$location'];