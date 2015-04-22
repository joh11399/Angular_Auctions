var app = angular.module('app');
app.controller('accountController', function($scope, $location, $resource, $modal, $routeParams, accountService, confirmDelete) {

    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.newAccount = {};

    if($routeParams.id) {
        accountService.getAccount($routeParams.id).then(function(data){
            $scope.newAccount = data;
        });
    }
    else {


        //TODO.. this is just auto-fill info for testing (so I don't need to type all this out when trying to create a user)
        $scope.newAccount = {
            id: null,
            username: 'test',
            email: 'test@test.com',
            name: 'test',
            password: 'abcd1234',
            addressStreet: '123',
            addressCity: 'fake',
            addressState: 'MN',
            addressZip: '54321'
        };
    }

    $scope.save = function(){

        //reset alerts
        //  the user may have previously gotten an error but not cleared it
        $scope.alerts = [];

        if($scope.newAccount.id) {

            accountService.updateAccount($scope.newAccount).then(
                function () {
                    $location.path("accounts");
                },
                function () {
                    $scope.alerts.push({type: 'danger', msg: 'there was a problem updating this account.'});
                });
        }
        else {
            accountService.createAccount($scope.newAccount).then(function() {
                    $location.path("accounts");
                    //$scope.alerts.push({type: 'success', msg: result.responseText });
                },
                function(result){
                    $scope.alerts.push({type: 'danger', msg: 'there was a problem creating this account.<br>' + result.responseText});
                });
        }
    };

    $scope.passwordValid = false;

    $scope.passwordKeyup = function(){
        var pw = $scope.newAccount.password;

        var pwMsg = '';

        if(pw.length < 8 || pw.length > 16){
            pwMsg = '8-16 characters';
        }

        if(!pw.match(/[a-z]/i)){
            if(pwMsg!=''){ pwMsg+=', '; }
            pwMsg += 'contains a letter'
        }

        if(!pw.match(/\d+/g)){
            if(pwMsg!=''){ pwMsg+=', '; }
            pwMsg += 'contains a number'
        }

        pwMsg = pwMsg.replace('contains a letter, contains a number','contains a letter and a number');

        $scope.passwordValid = pwMsg=='';

        $scope.passwordStrength = pwMsg;
    };

    $scope.hideEdit = function(){
        $scope.alerts = [];
        $location.path("accounts");
    };


    $scope.deleteClick = function(){
        confirmDelete().result.then(function() {
            accountService.deleteAccount($routeParams.id).then(
                function(){
                    $location.path("accounts");
                }, function(result){
                    $scope.alerts.push({type: 'danger', msg: result.status + ': '+ result.statusText});
                });
        });
    };
});