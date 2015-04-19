angular.module('app').factory('Accounts', function($resource) {
    return $resource('api/accounts/');
});

angular.module('app').factory('Account', function($resource) {
    return $resource('api/account/:id');
});