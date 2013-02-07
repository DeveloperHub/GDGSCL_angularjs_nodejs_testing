'use strict';

gdg.controller('ManageController', function ManageController($scope, $rootScope, $location, $routeParams, Page) {

    if($routeParams.slug == undefined)
        $scope.page = { label: "", content: "" };
    else
        $scope.page = Page.get({ slug: $routeParams.slug });

    $scope.process = function(item){
        var object = new Page(item);
        object.$save(function(){
            $rootScope.$broadcast('updateMenuItems', { items: Page.query()});
        });

        $location.path('/');
    };

});
