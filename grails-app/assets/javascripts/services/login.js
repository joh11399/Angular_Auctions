var app = angular.module('app').factory('loginDialog', function($modal) {
    return function() {
        return $modal.open({
            templateUrl: 'templates/login.html',
            size: 'med',
            controller: 'loginController'
        });
    }
});