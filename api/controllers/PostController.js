/**
 * PostController
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
      var dateFormat = require('dateformat');
      
      Post.find()
      .sort('id DESC')
      .limit(10)
      .exec(function(err, posts) {
        posts.forEach(function(post) {
          post.createdAt = dateFormat(post.createdAt, "dddd, mmmm, dS, yyyy, @ h:MM TT");
        });
        res.view({ model: posts });
      });
  },

  'new': function (req ,res) {
    res.locals.post = _.clone(req.session.post);
    if (res.locals.post)
      res.view({post: res.locals.post});
    else
      res.view({post: [{title: ""}, {content: ""}]});
    req.session.post = {};
  },
  /**
   * Action blueprints:
   *    `/posts/create`
   */
   create: function (req, res) {
    var title = req.param("title");
    var content = req.param("content");

    Post.create( {title: title, content: content}).done(function(error, post) {
      if (error) {
        res.set('error', 'DB Error');
        res.send(500, { error: 'DB Error'});
      } else {
        res.redirect('/blog');
      }
    });
  },

  update: function (req, res) {
    
    var id = req.param("id");
    var postToEdit = Post.findOne(id).done(function(err, post) {
      if (err) {
        res.set('error', 'DB Error');
        res.send(500, { error: 'DB Error'});
      };

      if (post) {
        req.session.post = post;
        res.redirect('/blog/new');
      };

    });
  },
  
 edit: function(req, res) {
    var id = req.param("id");
    console.log("in the edit");
    var postToUpdate = Post.findOne(id).done(function(err, post) {
      if (err) {
        res.set('error', 'DB Error');
        res.send(500, { error: 'DB Error'});
      }
        console.log("updating post");

      if (post) {
        post.title = req.param("title");
        post.content = req.param("content");
        post.save(function(err) {
          console.log("save");
        });
      }
    });
    res.redirect('/blog');
  },

  delete: function(req, res) {
    var id = req.param('id');
    Post.findOne(id).done(function(err, post) {
      post.destroy(function(err) {
        //record is gone.
      });
    });
    res.redirect('/blog');
  },
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to PostController)
   */
  _config: {}

  
};
