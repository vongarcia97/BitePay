const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  username: String,
  table_name: String,
});

const User = mongoose.model('Users', userSchema);

const tableSchema = mongoose.Schema({
  table_name: String,
  table_items: Array,
  tipRate: Number
})

const Table = mongoose.model('Tables', tableSchema);

module.exports = {User, Table};