module.exports = {
	upload: function(req, res) {
		console.log(req.files);
		console.log("filename " + req.files.file.path);
		console.log(req);
		var fs = require('fs');

		fs.readFile(req.files.file.path, function(err, data) {
			fs.writeFile('assets/images/photos/' + req.files.file.name, data, function(err) {
				if (err) {
					console.log(err);
				};
			});
			res.send( { filelink: '/images/photos/' + req.files.file.name } );
		});
	},

	create: function(req, res) {
		var id = req.body.postId;
		var photos = req.body.photos;

		photos.forEach(function(photo) {
			Photo.create( {postId: id, filename: photo} ).done(function(err, p) {
				if (err) {
       				res.set('error', 'DB Error');
        			res.send(500, { error: 'DB Error'});
        		}
			});
		});
	},

	index: function(req, res) {
		Photo.find().done(function(err, photos) {
			console.log(photos);
			res.view({ model: photos });


		});
		//console.log(photos);
	},

  _config: {}

};
