const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

// create associations
// creates the reference for the id column in the User model to link to the corresponding 
// foreign key pair which is the user_id in the Post model
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// a post can belong to one user, but not many
// declare the link to the foreign key (user_id in the Post model)
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// when we query Post, we can see a total of how many votes a user creates
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
  });

// when we query User, we can see all of the posts they've voted on
Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
  });

// if we want to see the total number of votes on a post, we need to direcltly connect Post and Vote
// by creating one-to-many associations, we can perform aggregated SQL functions b/w mdoels
// in this case, we can see a total count of votes for a single post when queried
Vote.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Vote.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Vote, {
    foreignKey: 'user_id'
  });
  
  Post.hasMany(Vote, {
    foreignKey: 'post_id'
  });

  Comment.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Comment.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Comment, {
    foreignKey: 'user_id'
  });
  
  Post.hasMany(Comment, {
    foreignKey: 'post_id'
  });

module.exports = { User, Post, Vote, Comment };