
module.exports = {
    
	login: function(req, res, next) {
		var username = req.param('username');
		var password = req.param('password');
		console.log("inlogin");
		if (username) {
			if (username == 'create-admin') {
				var hasher = require('password-hash');
				password = hasher.generate(password);
				Admin.create({ username: 'admin', password: password }).done(function(err, admin) {
					if (err) {
						console.log(err);
					} else if (admin) {
						req.session.admin = true;
						req.session.username = 'Admin';
						return res.redirect('/');
					}
				});
			} else if (username == 'admin') {
				Admin.findOneByUsername(username).done(function(err, admin) {
					if (err) {
						console.log(err); //db error
					} else if (admin) {
						var hasher = require('password-hash');
						if (hasher.verify(password, admin.password)) {
							req.session.admin = true;
							req.session.username = admin.username;
							return res.redirect('/');
						} else {
							res.set('error', 'Password is incorrect.');
							res.send(400, { error: 'Password is incorrect.' });
						}
					}
				});
			} else {
				// any other username is invalid
				res.set('error', 'Admin access only.');
				res.send(400, { error: 'Admin access only.' });
			}
		} else {
			// No username?  Tell the user.
			res.set('error', 'Please provide a username.');
			res.send(400, { error: 'Please provide a username.' });
		}
	},  

	logout: function(req, res) {
		req.session.destroy();
		res.redirect('/');
	},

	upload: function(req, res) {
		console.log(req.files);
		console.log("filename " + req.files.file.path);
		var fs = require('fs');

		fs.readFile(req.files.file.path, function(err, data) {
			if (err) {
				console.log("readfile" + err);
			}
				fs.writeFileSync('assets/images/' + req.files.file.name, data);
				res.send( { filelink: '/images/' + req.files.file.name } );
			
		});
		
	},

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to SessionController)
   */
  _config: {}

  
};
