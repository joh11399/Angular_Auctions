var app = angular.module('app');
app.controller('listingController', function($scope, $resource, $routeParams, $location) {

    var Listing = $resource('api/listings/:id', {}, { save:'PUT' });
    var Listings = $resource('api/listings', {}, { create:'POST' });

    $scope.listings = Listings.query();

    $scope.newListing = {};
    if($routeParams.id) {
        var getListing= Listing.get({id: $routeParams.id});

        getListing.$promise.then(function(result){
            console.log(result);
            $scope.newListing = result;
        });

        var listings = Listings.query();


        /*

        //in the accountController, it loops through all the accounts and
        // assigns $scope.newAccount = this.
        //  that seemed to work, so I might try it in listingController too

        listings.$promise.then(function(){
            //$scope.accounts = accounts;

            $(listings).each(function(){
                if(this.id == $routeParams.id){
                    //$scope.newAccount = this;
                    console.log(this);
                }
            });
        });
        */

    }

    $scope.startDateFormatted = function(){
        return $scope.newListing.startDate
    };


    $scope.save = function(){

        //reset alerts
        //  the user may have previously gotten an error but not cleared it
        $scope.alerts = [];

        if($scope.newListing.id) {

            $($scope.listings).each(function (i) {
                if (this.id == $scope.newListing.id) {

                    //$scope.listings[i] = $scope.newListing;

                    var saveListing = Listing.save($scope.newListing);

                    console.log($scope.newListing);

                    saveListing.$promise.then(function () {

                            console.log('update......');

                            //$location.path("listings");
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
            var createListing = Listings.create($scope.newListing);

            createListing.$promise.then(function(result) {
                    console.log('create...succeeded....');
                    console.log(result.responseText);
                    console.log(result.status);

                    console.log(result); //this returns the indexed logon page

                    //$location.path("listings");
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

});