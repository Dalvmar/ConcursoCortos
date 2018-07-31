const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CortoSchema = new Schema({
  video: {type: String},
  creator: {type:Schema.Types.ObjectId, ref:'User'},
  commment: {type:Schema.Types.ObjectId, ref:'Commnet'},
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Corto = mongoose.model('Corto', cortoSchema);
module.exports = Corto;