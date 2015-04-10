// This is a manifest file that'll be compiled into application.js.
//
// Any JavaScript file within this directory can be referenced here using a relative path.
//
// You're free to add application-wide JavaScript to this file, but it's generally better 
// to create separate JavaScript files as needed.
//
//= require jquery/dist/jquery
//= require angular/angular
//= require_self
//= require_tree .

var app = angular.module('app', []);
app.controller('welcomeController', function($scope){
    $scope.message = 'test new angular message'
});
app.controller('otherController',function($scope){
    $scope.otherControllerMsg = 'other message......'
});
app.controller('songController', function($scope){
    var getPlayData = function () {
        return [
            {song: {title: 'Blue Monday'}, artist: {name: 'New Order'}, time: new Date('02/14/2015 12:37:00')},
            {song: {title: 'We Want the Airwaives'}, artist: {name: 'Ramones'}, time: new Date('02/14/2015 11:32')},
            {song: {title: 'Kids With Guns'}, artist: {name: 'Gorillaz'}, time: new Date('02/14/2015 11:22')}
        ];
    };

    $scope.plays = getPlayData();
});


app.controller('listingController', function($scope){

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

    var getListings = function(){
        return [
            {id: 1, name: 'name 1', description: 'description  1'},
            {id: 2, name: 'name 2', description: 'description  2'},
            {id: 3, name: 'name 3', description: 'description  3'}
        ];
    };
    $scope.listings = getListings();

    $scope.getIndexById = function(id){
        var index = -1;
        $($scope.listings).each(function(i){

            console.log(this);
            console.log(id);

            if(this.id == id){
                index = i;
            }
        });
        return index;
    }

    $scope.save = function(){
        var id = $('#listingId'),
            name = $('#listingCreateName'),
            description = $('#listingCreateDescription');

        var i = $scope.getIndexById(id.val());

        if(i==-1){
            $scope.listings.push({ id: id.val(), name: name.val(), description: description.val() });
        }
        else {
            $scope.listings[i] = {id: id.val(), name: name.val(), description: description.val()};
        }

        id.val('');
        name.val('');
        description.val('');

        $scope.showCreate();
    };
});


if (typeof jQuery !== 'undefined') {
    (function($) {
        $('#spinner').ajaxStart(function() {
            $(this).fadeIn();
        }).ajaxStop(function() {
            $(this).fadeOut();
        });
    })(jQuery);
}
