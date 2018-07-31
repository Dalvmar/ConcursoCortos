const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = new Schema({

  cortoId: {type:Schema.Types.ObjectId, ref:'Cortos'},
  text: {type: String},
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Commnent = mongoose.model('Comment', commentSchema);
module.exports = Comment;