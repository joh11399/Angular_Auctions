var app = angular.module('app');

app.controller('loginController', function ($scope, $resource, $modalInstance) {
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

app.controller('loginLinksController', function($scope, $http, $location, loginDialog){
    $scope.loggedInUser = '';
    $http.get('api/logins').then(function(result) {
        $scope.loggedInUser = result.data[0].username;
    });

    $scope.loginLink = function(){
        loginDialog();
    };

    $scope.createAccountLink = function(){
        $location.path("account");
    };
});