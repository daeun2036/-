const express = require('express');
const router = express.Router();
const db = require("./database.js");

/* GET Read todolist */
router.get('/Read', function(req, res, next) {
  res.send(date);
  try{
    db.query("select * from todo",(err,results)=>{
      if(err) console.log(err);
      else{
        console.log("complete!");
        res.send(results);
      }
    });
  } catch(err){
    console.log(err);
  }
});

/* POST Add todolist */

router.post('/add', function(req, res, next) {
  const date = new Date();
  try{
    db.query(`insert into todo (users_ID,contents,date) values (1,'hello',"${date}")`,(err,results)=>{
      if(err) console.log(err);
      else{
        console.log("complete!");
        res.send(results);
      }
    });
  } catch(err){
    console.log(err);
  }
});


/* POST Delete todolist*/
router.post('/del', function(req, res, next) {
  try{
    db.query("delete from todo where users_ID = 1",(err,results)=>{
      if(err) console.log(err);
      else{
        console.log("complete!");
        res.send(results);
      }
    });
  } catch(err){
    console.log(err);
  }
});


module.exports = router;