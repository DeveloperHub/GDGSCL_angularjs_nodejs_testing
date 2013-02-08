'use strict';

gdg.factory('Page', function($resource) {
    return $resource('/api/pages/:slug', {
        slug: "@slug"
    },{
        query : { method : 'GET', isArray : true }, 
        save : { method : 'PUT' }, 
        create : { method : 'POST' },
        delete : { method : 'DELETE' }
    });
});