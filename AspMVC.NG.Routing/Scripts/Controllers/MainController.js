var MainController = function ($scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;
}

// The $inject property of every controller (and pretty much every other type of object in Angular) 
// needs to be a string array equal to the controllers arguments, only as strings
MainController.$inject = ['$scope', '$route', '$routeParams', '$location'];

//ngRouteExample.controller('MainController', function ($scope, $route, $routeParams, $location) {
//        $scope.$route = $route;
//        $scope.$location = $location;
//        $scope.$routeParams = $routeParams;
//});