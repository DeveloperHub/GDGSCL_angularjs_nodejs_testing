module.exports = function(db) {

	function webalize(slug){
		return slug.toLowerCase() 
			.replace(/^\s+|\s+$/g, "")    
			.replace(/[_|\s]+/g, "-") 
			.replace(/[^a-z0-9-]+/g, "") 
			.replace(/[-]+/g, "-") 
			.replace(/^-+|-+$/g, ""); 
	}

	return {
			// list pages
			index: function(req, res){
				db.pages.find(function(err, pages) {
					if( err || !pages) res.send(404, {message: err});
					else 
						res.send(pages);
				});
			},


			// create one
			create : function(req, res){
				if(!req.body.label)
					res.send(403, { status: 'error', message: "Musite vyplnit nazev stranky."});
				else{
					var data = {
						label: req.body.label,
						slug: webalize(req.body.label),
						content: req.body.content,
						main: req.body.main
					}
					
					db.pages.findOne({ slug: data.slug }, function(err, finded){
						if(err)
							res.send(403, { status: 'error', message: err });
						else if(!finded)
							db.pages.save(data, function(err, saved){
								if( err || !saved ) res.send(403, { status: 'error', message: err });
								else res.send(201, { status: "ok", data: data });
							});
						else
							res.send(403, { status: 'error', message: "Stranka s timto nazvem uz existuje." });
					});
				}
			},


			// show one
			show : function(req, res){
				db.pages.findOne({slug: req.route.params.page}, function(err, page) {
					if( err || !page) res.send(404, {message: err});
					else 
						res.send(page);
				});
			}, 

			// update existed
			update : function(req, res){
				if(!req.body.slug)
					res.send({ status: 'error', message: 'Neni zadat slug stranky kterou chcete editovat.' });
				else if (!req.body.label)
					res.send({ status: 'error', message: "Musite vyplnit nazev stranky."});
				else{
					var data = {
						label: req.body.label,
						slug: webalize(req.body.label),
						content: req.body.content,
						main: req.body.main
					}

					db.pages.update({slug: req.body.slug}, {$set: data}, function(err, updated) {
						if( err || !updated ) res.send(403, { status: 'error', message: err })
						else res.send({ status: 'ok', data: data });
					});
				}
			}, 


			// delete
			destroy : function(req, res){
				if(req.route.params.page == undefined)
					res.send(403, { status: 'error', message: "Neni zadan prvek ktery chcete vymazat." });
				else
					db.pages.findOne({ slug: req.route.params.page }, function(err, finded){
						if(err)
							res.send(403, { status: 'error', message: err });
						else if(!finded)
							res.send(403, { status: 'error', message: 'Stranku kterou chcete smazat nebyla nalezena' });
						else
							db.pages.remove({slug: finded.slug}, function(err, deleted) {
								if( err || !deleted ) res.send(403, { status: 'error', message: err});
								else res.send({ status: 'ok', data: finded});
							});
					});
			}
	};
};
