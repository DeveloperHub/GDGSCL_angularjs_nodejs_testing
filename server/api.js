module.exports = function(db){

    var BSON = require('mongodb').BSONPure;
    var methods = {};


    methods.findAll = function(req, res){
        db.pages.find(function(err, pages) {
          if( err || !pages) res.send(400, {errror: err});
          else {
            res.send(pages);
          };
        });
    };


    methods.find = function(req, res){
        db.pages.findOne({slug: req.route.params.slug}, function(err, page) {
          if( err || !page) res.send(400, {errror: err});
          else {
            res.send(page);
          };
        });
    };


    methods.save = function(req, res){
        var data = {
            label: req.body.label,
            slug: webalize(req.body.label),
            content: req.body.content
        }

        if(req.body.slug == undefined)
            db.pages.findOne({ slug: data.slug }, function(err, finded){
                if(err)
                    res.send({error: err});
                else if(!finded)
                    db.pages.save(data, function(err, saved){
                        if( err || !saved ) res.send(400, {errror: err})
                        else res.send(200, 'Saved');
                    });
                else
                    db.pages.update({slug: data.slug}, {$set: data}, function(err, updated) {
                        if( err || !updated ) res.send(400, {errror: err})
                        else res.send(200, 'updated');
                    });
            });
        else
            db.pages.update({slug: req.body.slug}, {$set: data}, function(err, updated) {
                if( err || !updated ) res.send(400, {errror: err})
                else res.send(200, 'updated');
            });
    };


    methods.delete = function(req, res){
        db.pages.remove({slug: req.route.params.slug}, function(err, updated) {
          if( err || !updated ) res.send(400, {errror: err})
          else res.send(200, 'deleted');
        });
    };


    function webalize(slug){
        return slug.toLowerCase() 
            .replace(/^\s+|\s+$/g, "")    
            .replace(/[_|\s]+/g, "-") 
            .replace(/[^a-z0-9-]+/g, "") 
            .replace(/[-]+/g, "-") 
            .replace(/^-+|-+$/g, ""); 
    }



    return methods;

}



