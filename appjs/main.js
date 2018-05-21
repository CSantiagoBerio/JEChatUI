(function() {

    var app = angular.module('JEChat',['ngRoute']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider, $location) {

        $routeProvider
        .when('/JEChat', {
          templateUrl: 'pages/home.html'

        })
        .when('/JEChat/login', {
            templateUrl: 'pages/login.html',
            controller: 'LogController',
            controllerAs : 'loginCtrl'

        })
        .when('/JEChat/register', {
          templateUrl: 'pages/register.html',
          controller: 'RegisterController',
          controllerAs: 'registerCtrl'

        })
        .when('/JEChat/:uid/Groupchats', {
            templateUrl: 'pages/groupchats.html',
            controller: 'GroupController',
            controllerAs : 'groupCtrl'

        })
        .when('/JEChat/:userid', {
            templateUrl: 'pages/profile.html',
            controller: 'ProfileController',
            controllerAs : 'profileCtrl'

        })
        .when('/JEChat/:user/Groupchats/:groupname', {
          templateUrl: 'pages/chat.html',
          controller: 'ChatController',
          controllerAs: 'chatCtrl'

        })
        .otherwise({
            redirectTo: '/JEChat/login'
        });
    }]);
})();
