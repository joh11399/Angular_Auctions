var app = angular.module('app');
app.controller('listingsController', function($scope, $resource, bidDialog, reviewDialog, loginService){

    $scope.itemsPerPage = 10;
    $scope.currentPage = 1;
    $scope.description = '';
    $scope.includeCompleted = false;

    $scope.loggedInId = '';
    $scope.loggedInName = '';
    loginService.getLoggedInUser().then(function(result) {
        $scope.loggedInId = result.data[0].id;
        $scope.loggedInName = result.data[0].name;
    });

    var Listings = $resource('api/listings/?max=:max&offset=:offset&description=:description&includeCompleted=:includeCompleted&returnListingCount=:returnListingCount');

    var listingsKeyupTimer;
    $scope.getListingsKeyup = function(){
        window.clearTimeout(listingsKeyupTimer);
        listingsKeyupTimer = setTimeout(function(){
            $scope.getListings();
        },700);
    };

    $scope.getListings = function(){
        var _offset = ($scope.currentPage - 1) * $scope.itemsPerPage;

         Listings.query({max: $scope.itemsPerPage, offset: _offset, description: $scope.description, includeCompleted: $scope.includeCompleted}).$promise.then(function(data){

             $scope.listings = data;

             var id = $scope.loggedInId;
             var name = $scope.loggedInName;

            $(data).each(function(i){
                var hb = $scope.listings[i].highestBidStr;
                try{ hb = hb.substring(hb.indexOf(' - ') + 3); }
                catch(ex){}

                if($scope.loggedInId==''){
                    $scope.listings[i].canBid = false;
                    $scope.listings[i].canReview = false;
                }else{
                    $scope.listings[i].canBid = data[i].timeRemaining != 'completed';
                    $scope.listings[i].canReview = data[i].timeRemaining == 'completed' && (hb.indexOf(name) != -1 || data[i].seller.id == id);
                }
            });

        });

        Listings.get({description: $scope.description, includeCompleted: $scope.includeCompleted, returnListingCount: true}).$promise.then(function(data){
            $scope.totalItems = data.listingCount;
        });


        /*

         for reference.....

         $scope.listings.$promise.then(function(result) {
         console.log('promise complete!');
         });


         Songs.get({id:33}); // returns object returned from of GET at songs/33
         Songs.query(); // returns array returned from GET at songs/
         Songs.remove({id:22}) // sends a DELETE to songs/22
         Songs.delete({id:44}) // sends a DELETE to songs/22
         Songs.save({title: 'Loser', artist: {id: 3, name: 'Beck'}}) // POST
         */
    };
    $scope.getListings();


    $scope.createBid = function(listingId){
        bidDialog(null, listingId).result.then(function() {
            $scope.getListings();
        });
    };
    $scope.createReview = function(listingId){
        reviewDialog(null, listingId).result.then(function() {
            $scope.getListings();
        });
    };
});