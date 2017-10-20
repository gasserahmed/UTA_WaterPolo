var ChapterController = function ($scope, $route, $routeParams, $location) {
    $scope.name = 'ChapterController';
    $scope.params = $routeParams;
}

// The $inject property of every controller (and pretty much every other type of object in Angular) 
// needs to be a string array equal to the controllers arguments, only as strings
ChapterController.$inject = ['$scope', '$route', '$routeParams', '$location'];

//ngRouteExample.controller('ChapterController', function ($scope, $route, $routeParams, $location) {
//    $scope.name = 'ChapterController';
//    $scope.params = $routeParams;
//});