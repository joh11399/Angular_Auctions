var app = angular.module('app');

app.controller('loginController', function ($scope, $resource, $modalInstance) {
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

app.controller('loginLinksController', function($scope, loginService, $location, loginDialog){

    $scope.loggedInUser = '';
    loginService.getLoggedInUser().then(function(result) {
        $scope.loggedInUser = result.data[0].username;
    });


    $scope.loginLink = function(){
        loginDialog();
    };

    $scope.createAccountLink = function(){
        $location.path("account");
    };
});