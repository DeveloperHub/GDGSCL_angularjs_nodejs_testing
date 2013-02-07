'use strict';

gdg.factory('Page', function($resource) {
    return $resource('/api/pages/:slug', {
        slug: "@slug"
    });
});