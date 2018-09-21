const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const newsSchema = new Schema({
  title: {type: String ,require:true},
  description:{type: String ,require:true},
  img: String

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const News = mongoose.model('News', newsSchema);
module.exports = News;