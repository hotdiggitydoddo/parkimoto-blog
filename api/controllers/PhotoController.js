module.exports = {
	upload: function(req, res) {
		var mv = require('mv');
		mv(req.files.file.path, 'assets/images' + req.files.file.name, function(err) {
				console.log(err);
				console.log(req.files.file);

			});
				res.send( { filelink: '/images/' + req.files.file.name } );



		// var fs = require('fs');
		// 	fs.rename(req.files.file.path, 'assets/images/photos' + req.files.file.name, function(err) {
		// 		console.log(req.files.file);
		// 		res.send( { filelink: '/images/photos/' + req.files.file.name } );

		// 	});

			//fs.writeFile('assets/images/photos/' + req.files.file.name, req.files.file);

					
		
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
