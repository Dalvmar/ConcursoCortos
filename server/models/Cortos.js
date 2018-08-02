const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CortoSchema = new Schema({
  video: {type: String},
  author: {type:Schema.Types.ObjectId, ref:'User'},
  commment: [{type:Schema.Types.ObjectId, ref:'Commnet'}],
  creator: {type: String},
  desription:{type:String},
  cover:{type:String}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Corto = mongoose.model('Corto', CortoSchema);
module.exports = Corto;