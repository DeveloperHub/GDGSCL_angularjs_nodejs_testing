'use strict';

gdg.controller('MenuController', function MenuController($scope, $location, Page) {

    $scope.pages = Page.query();
    $scope.$on('updateMenuItems', function(e, args) {
        $scope.pages = args.items;
    });

    
});
