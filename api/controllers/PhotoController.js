module.exports = {
	upload: function(req, res) {
		var fs = require('fs-extra');

		var tmp_path = req.files.file.path;
		var target_path = '.tmp/public/images/photos/' + req.files.file.name;

		fs.rename(tmp_path, target_path, function(err) {
			if (err) throw err;
			fs.copy(target_path, 'assets/images/photos/' + req.files.file.name, function(err) { });
			fs.unlink(tmp_path, function() {
				if (err) throw err;
				console.log('File uploaded to: ' + target_path);
				res.send( { filelink: '/images/photos/' + req.files.file.name } );
			});
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
