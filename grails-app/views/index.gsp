<!DOCTYPE html>
<html>
<head>
    <title>Welcome to Angular</title>

    <asset:stylesheet href="application.css"/>
    <asset:javascript src="application.js"/>

</head>
<body ng-app="app">
<div ng-controller="welcomeController">
    {{ message }}
</div>
<div ng-controller="otherController">
    {{ otherControllerMsg }}
</div>

<br><br><br>

<div ng-controller="songController">
    <table>
        <thead>
        <tr>
            <th>Title</th><th>Artist</th><th>Date/Time</th>
        </tr>
        </thead>
        <tr ng-repeat="play in plays">
            <td>{{play.song.title}}</td>
            <td>{{play.artist.name}}</td>
            <td>{{play.time}}</td>
        </tr>
    </table>
</div>


<br><br><br>

<div ng-controller="listingController">
    <table ng-show="!showingDetails">
        <thead>
        <tr>
            <th>Title</th><th>Artist</th>
        </tr>
        </thead>
        <tr ng-repeat="listing in listings">
            <td><span ng-click="showEdit(listing.id)" style="text-decoration: underline; cursor: pointer;">{{listing.name}}</span></td>
            <td>{{listing.description}}</td>
        </tr>
        <tr><td colspan="3"><button ng-click="showCreate()">Create angular_test.Listing</button></td></tr>
    </table>
    <div ng-show="showingDetails">
        <table><tr><td>Name: </td><td><input type="text" id="listingCreateName"></td></tr>
            <tr><td>Description: </td><td><input type="text" id="listingCreateDescription"></td></tr></table>
        <input type="hidden" id="listingId">
        <button ng-click="showCreate()">Close</button><button ng-click="save()">Save</button>
    </div>
</div>

</body>
</html>
