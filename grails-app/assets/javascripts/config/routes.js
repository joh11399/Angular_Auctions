angular.module("app").config(function($routeProvider) {
    $routeProvider.when("/listings", { templateUrl: "templates/listings.html" });

    $routeProvider.when("/accounts", { templateUrl: "templates/accounts.html"});

    $routeProvider.when("/account", {templateUrl: "templates/account.html"});
    $routeProvider.when("/account/:id", {templateUrl: "templates/account.html"});


    $routeProvider.otherwise("/accounts", { templateUrl: "templates/accounts.html" });
    /*

    TODO,  eventually have the listings page be the default....
    $route.otherwise("/listings", function() {
        templateUrl: "listings.html"
    })
    */
});
