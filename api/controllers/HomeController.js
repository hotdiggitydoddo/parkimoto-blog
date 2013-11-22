module.exports = {

	index: function(req, res) {
		res.view();
	},

	about: function(req, res) {
		res.view();
	},

	contact: function(req, res) {
		res.view();
	},


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to HomeController)
   */
  _config: {}

  
};
