'use strict';

gdg.factory('Page', function($resource) {
	return $resource('/api/v1/pages/:slug', {
		slug: "@slug"
	},{
		create : { method : 'POST' },
		save : { method : 'PUT' }
	});
});