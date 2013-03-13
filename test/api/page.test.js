var request = require('supertest')
	, async = require('async')
	, app = require(process.cwd() + '/server/app')
	, db = require("mongojs").connect("gdg:gdg@ds039417.mongolab.com:39417/gdg-pages", ["pages"]);

var data = [
	{
    "slug" : "prvni-page",
    "content" : "obsah prvni stranky",
    "label" : "Prvni stranka"
	},
	{
    "slug" : "druha-page",
    "content" : "obsah druhe stranky",
    "label" : "Druha stranka"
	},
];

function save(doc){
	db.pages.save(doc, function(err, saved){});
}

describe('GDG Spaghetti Code Liberec example app', function () {
  
	beforeEach(function (done) {
		db.pages.remove({}, function(err, deleted) {
		  async.parallel(
		  	[
		  	save(data[0]), 
		  	save(data[1])
		  	]);
		  done();
	  	});
	});

	describe('GET /api/v1/pages', function () {
	  it('Vrati vsechny stranky', function (done) {
	  	request(app)
	  	.get('/api/v1/pages')
	  	.set('Accept', 'application/json')
	  	.expect(200)
	  	.end(function(err, res){
	  		res.body.length.should.eql(2);
	  		done();
	  	});
	  });
	  it('Vrati 404 pri neexistujici kolekci', function(done){
	     request(app)
	     .get('/app/v1/pagess')
	     .expect(404, done);
	  });
	  it('Content-Type json', function(done){
	     request(app)
	     .get('/api/v1/pages')
	     .end(function(err, res){
	     	res.should.be.json;
	     	done();
	     });
	  });
	  it('Vrati 406 != json', function(done){
	     request(app)
	     .get('/api/v1/pages')
	     .set('Accept', 'application/xml')
	     .expect(406, done);
	  });
	});

	describe('GET /api/v1/pages/:page', function () {
	  it('Vrátí konkrétní dokument', function (done) {
	   	request(app)
	   	.get('/api/v1/pages/' + data[0]['slug'])
	   	.expect(200)
	   	.end(function(err, res){
	   		res.body.slug.should.eql( data[0]['slug']);
	   		done();
	   	});
	  });
	  it('Vraceny dokument obsahuje pole slug, content, label', function(done){
	    request(app)
	    .get('/api/v1/pages/' + data[0]['slug'])
	    .expect(200)
	    .end(function(err, res){
	    	res.body.content.should.eql(data[0]['content']);
	    	res.body.slug.should.eql(data[0]['slug']);
	    	res.body.label.should.eql(data[0]['label']);
	    	done();
	    })
	  });
	  it('Vrati 404 pri neexistujici page', function(done){
	     request(app)
	     .get('/api/v1/pages/test')
	     .expect(404, done);
	  });
	  it('Page je ve formatu json', function(done){
	     request(app)
	     .get('/api/v1/pages/' + data[0]['slug'])
	     .expect('Content-Type', /json/)
	     .expect(200, done);
	   });
	  it('Vrati 406 pri pozadavku na jiny format nezli json', function(done){
	     request(app)
	     .get('/api/v1/pages/' + data[0]['slug'])
	     .set('Accept', 'application/xml')
	     .expect(406, done);
	  });
	});

	describe('POST /api/v1/pages/', function () {
		it('Nova stranka lze ulozit', function(done){
		   request(app)
		   .post('/api/v1/pages/')
		   .send(data[0])
		   .end(function(err, res){
		   		db.pages.findOne({slug: data[0]['slug']}, function(err, page) {
		   			page.should.eql(data[0]);
		   			done();
				});
		   });
		});
		it('Vrati 400, pokud poslu prazdnou page', function(done){
		   request(app)
		   .post('/api/v1/pages/')
		   .send({})
		   .expect(400, done);
		});
		it('Vrati 415, pokud data posilam v jinem formatu nezli json', function(done){
		   request(app)
		   .post('/api/v1/pages')
		   .set('Content-Type', 'application/xml')
		   .send('<xml>pes</xml>')
		   .end(function(err, res){
		   		done();
		   });
		});
		it('Vrati 404, pokud poslu page na neexistujici kolekci', function(done){
		   request(app)
		   .post('/api/v1/pagess')
		   .expect(404, done);
		});
	});
});