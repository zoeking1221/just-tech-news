const User = require('./User');
const Post = require('./Post');

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

module.exports = { User, Post };