module.exports = {
	upload: function(req, res) {
		var fs = require('fs');
		// fs.readFile(req.files.file.path, function(err, data) {
		// 	if (err) {
		// 		console.log(err);
		// 	}
			fs.writeFile('assets/images/photos/' + req.files.file.name, req.files.file, function(err) {
				if (err) {
					console.log(err);
				}
				res.send( { filelink: '/images/photos/' + req.files.file.name } );
			});

		
		
	},

	create: function(req, res) {
		var id = req.body.postId;
		var photos = req.body.photos;
		console.log("photos:  " + photos);
		photos.forEach(function(photo) {
			Photo.create( {postId: id, filename: photo} ).done(function(err, p) {
				if (err) {
					console.log(err);
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
