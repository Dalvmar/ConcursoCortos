const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const configSchema = new Schema({
  enableVideos: {type:Boolean ,default:false,unique:true }


}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Config = mongoose.model('Config', configSchema);

const ConfigNew= new Config({ enableVideos:false });

ConfigNew.save().then(() => console.log('creado'));
module.exports = Config;