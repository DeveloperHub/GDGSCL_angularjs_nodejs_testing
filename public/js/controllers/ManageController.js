'use strict';

gdg.controller('ManageController', function ManageController($scope, $rootScope, $location, $routeParams, Page) {

	if($routeParams.slug != undefined){
		$scope.page = Page.get({ slug: $routeParams.slug });
		$scope.action = 'edit';
	}else
		$scope.action = "add";
	
	$scope.process = function(item){
		var successHandler = function(response){
			$rootScope.$broadcast('updateMenuItems', { items: Page.query()});
			$location.path('/' + response.data.slug);
		};

		var errorHandler = function(err){ 
			if(err.status == 403)
				alert('Chyba ' + err.data.message);
		};

		if(item.slug == undefined)
			Page.create(item, successHandler, errorHandler);
		else
			Page.save(item, successHandler, errorHandler);
	};

});
