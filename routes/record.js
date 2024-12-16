const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Record = require('../models/record');

router.route('/:id').post( (req, res, next) => {
  let newRecord = new Record ({
    name: req.body.name,
    user_id: req.body.user_id,
    amount: req.body.amount,
    mandatory: req.body.mandatory,
    isIncome: req.body.isIncome
  });

  Record.addRecord(newRecord, (err, Record) => {
    if(err){
      res.json({success: false, msg:'Failed to add'});
    } else {
      res.json({success: true, msg:'added', data:Record});
    }
  });
})

.get(passport.authenticate('jwt', {session:false}), (req, res, next) => {
  if(req.headers.lastweek == "lastweek"){
    Record.getRecordByDate(req.user.id, (err, Record) => {
      if(err){
        res.json({success: false, msg:'Failed to get'});
      } else {
        res.json(Record);
      }
    });

  } else {

    Record.getRecordByUser_Id(req.user.id, (err, Record) => {
      if(err){
        res.json({success: false, msg:'Failed to add'});
      } else {
        res.json(Record);
      }
    });

  }


})


.delete(passport.authenticate('jwt', {session:false}),(req, res, next) => {
  Record.rmRecord(req.params.id, (err, Record) => {
    if(err){
      res.json({success: false, msg:'Failed to remove'});
    } else {
      res.json({success: true, msg:'removed'});
    }
  });
})

.put(passport.authenticate('jwt', {session:false}),(req, res, next) => {
  Record.editRecord(req.body, (err, Record) => {
    if(err){
      res.json({success: false, msg:'Failed to Edit'});
    } else {
      res.json({success: true, msg:'Success'});
    }
  });
});

router.route('/one/:id').get(passport.authenticate('jwt', {session:false}), (req, res, next) => {
  Record.getRecordById(req.params.id, (err, Record) => {
    if(err){
      res.json({success: false, msg:'get'});
    } else {
      res.json({success: true, data:Record});
    }
  });
})
module.exports = router;
