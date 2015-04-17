var app = angular.module('app');
app.controller('accountsController', function($scope, $resource, $modal) {







    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };





    $scope.showingDetails = false;

    $scope.showEdit = function(id){
        $scope.showingDetails = !$scope.showingDetails;

        if($scope.showingDetails) {
            if (id) {
                $($scope.accounts).each(function(i){
                    if(this.id == id){
                        $scope.newAccount = this;
                    }
                });
            }
            else {
                $scope.newAccount = {
                    id: null,
                    username: 'test',
                    email: 'test@test.com',
                    name: 'test',
                    password: 'abcd1234',
                    addressStreet:'123',
                    addressCity:'fake',
                    addressState:'MN',
                    addressZip:'54321'
                };
            }
        }
    };

    //var Accounts = $resource('api/accounts/');
    var Accounts = $resource('api/accounts/:id');

    /*
     Accounts = $resource('api/accounts/:id', {}, {
     save: {method: 'PUT'}
     });

     var Accounts = $resource('api/accounts/:id', {
     create: {method: "POST"},
     save: {method: "PUT"},
     find: {
     method: "GET",
     isArray: true,
     url:"api/accounts/?sort=:sort&offset=:offset",
     params:{offset:0}}
     });
     */

    var getAccounts = function(){
        $scope.accounts = Accounts.query();
    };
    getAccounts();

});
