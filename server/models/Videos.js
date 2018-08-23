const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const VideoSchema = new Schema({
  video: {type: String},
  author: {type:Schema.Types.ObjectId, ref:'User'},
  commment: [{type:Schema.Types.ObjectId, ref:'Comment'}],
  creator: {type: String},
  desription:{type:String},
  cover:{type:String},
  like:{type:Number},
  unlike:{type:Number}
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;