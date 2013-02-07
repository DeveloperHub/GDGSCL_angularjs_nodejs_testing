'use strict';

var gdg = angular.module('gdg', ['ngResource', 'ngSanitize']);

gdg.config(function($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $routeProvider.
        when('/new-page', { controller: 'ManageController', templateUrl: 'views/form.html' }).
        when('/:slug/edit', { controller: 'ManageController', templateUrl: 'views/form.html' }).
        when('/:slug', { controller: 'PageController', templateUrl: 'views/page.html' }).
        when('/', { controller: 'PageController', templateUrl: 'views/page.html' });
});