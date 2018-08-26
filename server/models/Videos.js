const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Comments = require('./Comments')
// const User = require('./User')

const VideoSchema = new Schema({
  video: { type: String },
  author:

    { type: Schema.Types.ObjectId, ref: 'User' },

  commment: [
    { type: Schema.Types.ObjectId, ref: 'Comment' }],
  creator: { type: String },
  desription: { type: String },
  cover: { type: String },
  like: { type: Number },
  unlike: { type: Number }

}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

// VideoSchema.pre('remove',async function (next) {
//   try {
//     await Comments.remove({
//       "_id": {
//         $in: this.commment
//       }
//     });
//     await User.remove({
//       "_id": {
//         $in: this.author
//       }
//     });
//     next();
//   } catch (error) {
//     next(err)
//   }


// });


const Video = mongoose.model('Video', VideoSchema);
module.exports = Video;