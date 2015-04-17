var app = angular.module('app');
app.controller('listingsController', function($scope, $resource){

    $scope.showingDetails = false;
    $scope.showCreate = function(){

        var id = 0;
        $($scope.listings).each(function(){
            if(this.id > id){
                id = this.id;
            }
        });
        id++;

        $('#listingId').val(id);
        $scope.showingDetails = !$scope.showingDetails;
    };
    $scope.showEdit = function(id){
        $('#listingId').val(id);

        var i = $scope.getIndexById(id);
        $('#listingCreateName').val($scope.listings[i].name);
        $('#listingCreateDescription').val($scope.listings[i].description);

        $scope.showingDetails = !$scope.showingDetails;
    };

    var Listings = $resource('api/listings/:id', {
        create: {method: "POST"},
        save: {method: "PUT"},
        find: {
            method: "GET",
            isArray: true,
            url:"api/listings/?sort=:sort&offset=:offset",
            params:{offset:0}}
    });

    var getListings = function(){


        $scope.listings = Listings.query();

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
    getListings();


    $scope.getIndexById = function(id){
        var index = -1;
        $($scope.listings).each(function(i){
            if(this.id == id){
                index = i;
            }
        });
        return index;
    };

    $scope.save = function(){
        var id = $('#listingId'),
            name = $('#listingCreateName'),
            description = $('#listingCreateDescription');

        var i = $scope.getIndexById(id.val());

        if(i==-1){
            $scope.listings.push({ id: id.val(), name: name.val(), description: description.val() });

            //Songs.save({title: 'Loser', artist: {id: 3, name: 'Beck'}}) // POST

        }
        else {
            //$scope.listings[i] = {id: id.val(), name: name.val(), description: description.val()};


            var saveListing = Listings.save({id: id.val(), name: name.val(), description: description.val()});

            saveListing.$promise.then(function(result) {
                console.log('promise complete!');
                console.log(result); //this returns the indexed logon page
            });

            //getListings();

        }

        id.val('');
        name.val('');
        description.val('');

        $scope.showCreate();
    };
});