var BookController = function ($scope, $route, $routeParams, $location) {
    $scope.name = 'BookController';
    $scope.params = $routeParams;
}

// The $inject property of every controller (and pretty much every other type of object in Angular) 
// needs to be a string array equal to the controllers arguments, only as strings
BookController.$inject = ['$scope', '$route', '$routeParams', '$location'];

//ngRouteExample.controller('BookController', function ($scope, $route, $routeParams, $location) {
//        $scope.name = 'BookController';
//        $scope.params = $routeParams;
//});