/**
 * BlogController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
    index: function (req, res) {

    var model = Blog.find(function(err, blogs) {
      //res.view({model: posts});
      console.log(blogs);
      return res.view(model);
    });
  },

  'new': function (req ,res) {
    res.locals.blog = _.clone(req.session.blog);
    if (res.locals.blog)
      res.view({blog: res.locals.blog});
    else
      res.view({blog: [{title: ""}, {content: ""}]});
    req.session.blog = {};
  },
  /**
   * Action blueprints:
   *    `/posts/create`
   */
   create: function (req, res) {
    var title = req.param("title");
    var content = req.param("content");

    content = nl2br(content);

    Blog.create( {title: title, content: content}).done(function(error, blog) {
      if (error) {
        res.set('error', 'DB Error');
        res.send(500, { error: 'DB Error'});
      } else {
        res.redirect('/home/index');
      }
    });
  },
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to BlogController)
   */
  _config: {}

  
};

function nl2br (value) {
  return value.replace(/\n/g, "<br />");
}