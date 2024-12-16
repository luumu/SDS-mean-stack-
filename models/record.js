const mongoose = require('mongoose');
const config = require('../config/database');
const ObjectId = mongoose.Schema.Types.ObjectId;

  const RecordSchema = mongoose.Schema({
  name: {
    type: String
  },
  user_id: {
    type: ObjectId,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
     type: Date,
     default: Date.now()
   },
   mandatory: {
     type: Boolean,
     default: false
   },
   isIncome: {
     type: Boolean,
     required: true
   }

});

const Record = module.exports = mongoose.model('Record', RecordSchema);

module.exports.getRecordByUser_Id = function(user_id, callback){
  const query = {user_id: user_id}
  Record.find(query, callback);
}
module.exports.getRecordById = function(id, callback){
  Record.findById(id, callback);
}

module.exports.getRecordByDate = function(user_id, callback){ //Gets sums grouped by date
  var id = mongoose.Types.ObjectId(user_id);
  Record.aggregate([{$match: {"user_id": id

  }},{$group: {
      "_id":{
           year : { $year : "$date" },
           month : { $month : "$date" },
           day : { $dayOfMonth : "$date" },
      },
      "income": {$sum: {$cond: ["$isIncome", '$amount', 0]}},
      "expense": {$sum: {$cond: ["$isIncome",0, '$amount']}},
    }}

  ], callback)
}

module.exports.addRecord = function(newRecord, callback){
  newRecord.save(callback);
}

module.exports.rmRecord = function(id, callback){
  const query = {id:id}
  Record.findByIdAndRemove(id, callback);

}

module.exports.editRecord = function(newRecord, callback){
  Record.findByIdAndUpdate(newRecord._id, {$set: {
    name: newRecord.name,
    amount: newRecord.amount
}} , callback);
}
