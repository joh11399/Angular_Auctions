var app = angular.module('app');
app.controller('listingController', function($scope, $resource, $routeParams, listingService, loginService) {

    $scope.newListing = {};
    if($routeParams.id) {
        listingService.getListing($routeParams.id).then(function (data) {
            $scope.newListing = data;
        });
    }else{
        loginService.getLoggedInUser().then(function(result) {
            $scope.newListing.seller = {};
            $scope.newListing.seller.id = result.data[0].id;
        });
    }



    $scope.startDateFormatted = function(){
        return $scope.newListing.startDate
    };

    $scope.save = function(){

        //reset alerts
        //  the user may have previously gotten an error but not cleared it
        $scope.alerts = [];

        if($scope.newListing.id) {

                    listingService.updateListing($scope.newListing).then(function(){


                            console.log('update......');

                            //$location.path("listings");
                        },
                        function (result) {

                            console.log('update...FAILED......');
                            console.log(result.responseText);
                            console.log(result.status);

                            console.log(result); //this returns the indexed logon page

                            $scope.alerts.push({type: 'danger', msg: 'there was a problem updating this listing.'});

                        });
                }
        else {
            console.log($scope.newListing);

            listingService.createListing($scope.newListing).then(function(){

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

                    $scope.alerts.push({type: 'danger', msg: 'there was a problem creating this listing.'});

                });
        }
    };

});