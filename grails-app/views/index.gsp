<%@ page import="org.springframework.security.core.context.SecurityContextHolder" %>
<!DOCTYPE html>
<html>
<head>
    <!-- TODO  .. change the name -->
    <title>angular assignment</title>

    <asset:stylesheet href="application.css"/>
    <asset:javascript src="application.js"/>

</head>
<body ng-app="app">

<a href="#/accounts">accounts</a>
<a href="#/listings">listings</a>
<a href="#/bids">bids</a>
<a href="#/reviews">reviews</a>

<div ng-controller="loginLinksController" style="display: inline;">
<a id="createAccountBtn" class="btn btn-default loginLink" href="#/accountEdit" ng-show="loggedInUser==''">create account</a>

    <!-- TODO  ng-show="loggedInUser==''"  the login text doesn't always appear if the user is logged out (or account is deleted)  -->
    <a id="loginBtn" class="btn btn-primary loginLink" ng-click="loginLink()" >login</a>

<a id="viewAccountBtn" class="btn btn-default loginLink" href="#/account/{{loggedInId}}" ng-show="loggedInUser!=''">view account</a>
<label id="loginLbl" class="loginLbl" ng-show="loggedInUser!=''">logged in as {{loggedInUser}}</label>
</div>

<ng-view></ng-view>

</body>
</html>
