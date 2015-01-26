/// <reference path="sha1.js" /> 
/// <reference path="../angular-local-storage.js" /> 

(function () {
    var app = angular.module('authApp', ['LocalStorageModule']);

    app.constant('APP_TOKEN', 'e4d909c290d0fb1ca068ffaddf22cbd0');
    app.constant('AUTH_ENDPOINT', 'http://h139-233.rackhostvps.com/auth');

    app.service('AuthHandler', ['$http', 'localStorageService', 'APP_TOKEN', 'AUTH_ENDPOINT', function ($http, localStorageService, APP_TOKEN, AUTH_ENDPOINT) {
        function authenticate() {
            return $http({
                url: AUTH_ENDPOINT,
                method: 'POST',
                headers: {
                    Authorization: SHA1(APP_TOKEN)
                },
                data: {
                    applicationToken: APP_TOKEN
                }
            }).success(function (data) {
                localStorageService.set('clientToken', data.clientToken);
            });
        }

        function getClientToken() {
            return localStorageService.get('clientToken');
        }

        return {
            authenticate: authenticate,
            getClientToken: getClientToken
        };
    }]);

    app.controller('LoginController', ['$scope', 'AuthHandler', '$window', function ($scope, AuthHandler, $window) {
        $scope.clientToken = null;

        $scope.authenticate = function () {
            return AuthHandler.authenticate().success(function () {
                $scope.clientToken = AuthHandler.getClientToken();
            }).error(function (message) {
                $window.alert(message);
            });
        };
    }]);
})();
