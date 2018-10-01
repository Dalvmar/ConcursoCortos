const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const VideoSchema = new Schema({
  video: { type: String },
  author:{ type: Schema.Types.ObjectId, ref: 'User' },
  creator: { type: String },
  desription: { type: String },
  cover: { type: String },
  like: { type: Number ,default:0},
  unlike: { type: Number ,default:0}

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;