var HomeController = function ($scope, $rootScope) {
    $scope.title = "Home - UTA WATA POLO";
    $rootScope.login_staus = false;
}

// The $inject property of every controller (and pretty much every other type of object in Angular) 
// needs to be a string array equal to the controllers arguments, only as strings
HomeController.$inject = ['$scope', '$rootScope'];