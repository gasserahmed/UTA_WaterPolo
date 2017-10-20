var UTAWaterPoloApp = angular.module('UTAWaterPoloApp', ['ngRoute', 'ngMaterial', 'ngMessages']);
UTAWaterPoloApp.controller('MainController',MainController);
UTAWaterPoloApp.controller('BookController',BookController);
UTAWaterPoloApp.controller('ChapterController', ChapterController);
UTAWaterPoloApp.controller('HomeController', HomeController);
UTAWaterPoloApp.controller('LoginController', LoginController);
UTAWaterPoloApp.controller('LogoutController', LogoutController);
UTAWaterPoloApp.controller('RegisterController', RegisterController);
UTAWaterPoloApp.controller('EventController', EventController);
UTAWaterPoloApp.controller('AboutController', AboutController);
UTAWaterPoloApp.controller('AdminController', AdminController);

// register services
UTAWaterPoloApp.service('UserService', UserService);
UTAWaterPoloApp.service('WaterPoloService', WaterPoloService);

// register directive
UTAWaterPoloApp.directive("passwordVerify", passwordVerify);

var configFunction = function ($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/routes/Home',
            controller: HomeController
        })
        .when('/About', {
            templateUrl: '/routes/About',
            controller: AboutController
        })
        .when('/Events', {
            templateUrl: '/routes/Events',
            controller: EventController
        })
        .when('/Gallery', {
            templateUrl: '/routes/Gallery'
        })
        .when('/Admin', {
            templateUrl: '/routes/Admin',
            controller: AdminController
        })
        .when('/login', {
            templateUrl: '/Account/LoginPage',
            controller: LoginController
        })
        .when('/logout', {
            templateUrl: '/Account/LoginPage',
            controller: LogoutController
        })
        .when('/register', {
            templateUrl: '/Account/RegisterPage',
            controller: RegisterController
        })
        ;

    // configure html5 to get links working on jsfiddle
    $locationProvider.html5Mode(true);
}
configFunction.$inject = ['$routeProvider', '$httpProvider', '$locationProvider'];

UTAWaterPoloApp.config(configFunction);

