var app = angular.module('app');
app.controller('accountController', function($scope, $location, $resource, $modal) {

    $scope.newAccount = {};

    $scope.save = function(){

        //reset alerts
        //  the user may have previously gotten an error but not cleared it
        $scope.alerts = [];

        if($scope.newAccount.id) {

            $($scope.accounts).each(function (i) {
                if (this.id == $scope.newAccount.id) {


                    console.log($scope.newAccount);
                    $scope.accounts[i] = $scope.newAccount;


                    //TODO  setting the password to null means it won't attempt to update it...
                    //$scope.accounts[i].password = null;


                    console.log($scope.accounts[i]);


                    $scope.accounts[i].$save().then(function (result) {

                            console.log('update...succeeded......');
                            console.log(result.responseText);

                            console.log(result); //this returns the indexed logon page

                            $location.path("#/accounts");

                            $scope.alerts.push({type: 'success', msg: result.responseText });

                        },
                        function (result) {

                            console.log('update...FAILED......');
                            console.log(result.responseText);
                            console.log(result.status);

                            console.log(result); //this returns the indexed logon page

                            $scope.alerts.push({type: 'danger', msg: 'there was a problem updating this account.'});

                        });
                }
            });
        }
        else {
            var createAccount = Accounts.save($scope.newAccount);

            createAccount.$promise.then(function(result) {
                    console.log('create...succeeded....');
                    console.log(result.responseText);
                    console.log(result.status);

                    console.log(result); //this returns the indexed logon page

                    $location.path("#/accounts");

                    $scope.alerts.push({type: 'success', msg: result.responseText });
                },
                function(result){

                    console.log('create...FAILED......');
                    console.log(result.responseText);
                    console.log(result.status);

                    console.log(result); //this returns the indexed logon page

                    $scope.alerts.push({type: 'danger', msg: 'there was a problem creating this account.'});

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
        $location.path("#/accounts");
    };


    $scope.testClose = function(){
        var modalInstance = $modal.open({
            templateUrl: 'confirmDialog.html',
            size: 'lg',
            controller: 'accountController',
            resolve: {
                message: function () {
                    //return 'Are you sure you want to delete "' + play.song.title + '" by ' + play.artist.name + '?'
                },
                title: function () {
                    return 'Confirm Play Delete';
                }
            }
        });

        modalInstance.result.then(function () {
            //$scope.plays.splice($scope.plays.indexOf(play), 1);
            //$scope.alerts.push({type: 'success', msg: 'Song play removed'});
        });
    };

});