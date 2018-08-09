const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = new Schema({

  videoId: {type:Schema.Types.ObjectId, ref:'Cortos'},
  author: {type:Schema.Types.ObjectId, ref:'User'},
  comment: {type: String},
  contador:{type:Number}
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;