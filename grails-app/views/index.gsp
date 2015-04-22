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
<a href="#/account" class="loginLink" ng-show="loggedInUser==''">create account</a>
<a class="loginLink" ng-click="loginLink()" ng-show="loggedInUser==''">login</a>
<label class="loginLbl" ng-show="loggedInUser!=''">logged in as {{loggedInUser}}</label>
</div>

<ng-view></ng-view>

</body>
</html>
