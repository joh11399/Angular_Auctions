angular.module("app").config(function($routeProvider) {

    $routeProvider.when("/", { templateUrl: "templates/listings.html" });

    $routeProvider.when("/listings", { templateUrl: "templates/listings.html" });
    $routeProvider.when("/listing", { templateUrl: "templates/listing.html" });
    $routeProvider.when("/listing/:id", { templateUrl: "templates/listing.html" });

    $routeProvider.when("/accounts", { templateUrl: "templates/accounts.html"});
    $routeProvider.when("/account", {templateUrl: "templates/account.html"});
    $routeProvider.when("/account/:id", {templateUrl: "templates/account.html"});


    //$routeProvider.otherwise("/listings", { templateUrl: "templates/listings.html" });
});
