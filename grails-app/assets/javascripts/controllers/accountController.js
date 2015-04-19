var app = angular.module('app');
app.controller('accountController', function($scope, $location, $resource, $modal, $routeParams, Account, Accounts, confirmDelete) {
    var NewAccount = $resource('api/accounts');


    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };



    $scope.newAccount = {};

    if($routeParams.id) {
        var accounts = Accounts.query();
        accounts.$promise.then(function(){
            $scope.accounts = accounts;

            $(accounts).each(function(){
                if(this.id == $routeParams.id){
                    $scope.newAccount = this;
                    }
            });
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

                            $location.path("accounts");


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
            var createAccount = NewAccount.save($scope.newAccount);

            createAccount.$promise.then(function(result) {
                    console.log('create...succeeded....');
                    console.log(result.responseText);
                    console.log(result.status);

                    console.log(result); //this returns the indexed logon page

                    $location.path("accounts");

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
        $location.path("accounts");
    };


    $scope.deleteClick = function(){
        confirmDelete().result.then(function() {
            Account.delete({id: $routeParams.id},
            function(result){

                    console.log(result);

                    //$location.path("accounts");

            }, function(result){
                    $scope.alerts.push({type: 'danger', msg: result.status + ': '+ result.statusText});
            });
        });
    };
});