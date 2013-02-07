'use strict';

gdg.controller('PageController', function PageController($scope, $rootScope, $routeParams, Page, $location) {

    if($routeParams.slug == "")
        Page.query(function(pages){
            $scope.page = pages[0];
        });
    else
        $scope.page = Page.get({ slug: $routeParams.slug });
    
    $scope.delete = function(page){
        Page.delete({ slug: page.slug}, function(){
            $rootScope.$broadcast('updateMenuItems', { items: Page.query()});
            $location.path('/');
        });
    };

});
