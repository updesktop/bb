'use strict';
const express = require('express');
const https = require('https');
const fs = require('fs');

const puppeteer = require('puppeteer');
const multer = require('multer');
const path = require('path');

const app = express();
const mysql = require('mysql');
const { Console } = require('console');
app.use(express.static('public'));

const FILE_NAME = 'data.json';

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //cb(null, 'uploads/');
    cb(null, 'public/uploadz/');
  },
  filename: (req, file, cb) => {
    //cb(null, Date.now() + '-' + file.originalname);
    cb(null,file.originalname);
  },
});
const upload = multer({ storage });



/*
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/

/*
var rawdata = fs.readFileSync('enadsys.json');
console.log('raw:'+rawdata);

var enadsys= JSON.parse(rawdata);
enadsys=rawdata;

console.log('enadsys:'+enadsys);
var db_ip=enadsys.db_ip;

console.log('json:',db_ip);
*/

const fileContent = fs.readFileSync('./enadsys.json', "utf8");
const fileJsonContent = JSON.parse(fileContent);
var db_ip=fileJsonContent.db_ip;
var db_dbase=fileJsonContent.db_dbase;
var db_host=fileJsonContent.db_host;
//console.clear();
console.log(fileJsonContent);

/*
var con = mysql.createConnection({
  host: db_ip,   
  user: 'root',
  password: '',
  database: db_dbase
});
con.connect((err) => {
 if(err){
   console.log('Error connecting to Db');   
   return;
 }
 console.log('Connection established');   
});
*/

//==================================================================================================
//==================================================================================================
// File Upload Endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  //res.json({ message: 'File uploaded successfully', filename: req.file.filename });
  res.send('OK');
});



//==================================================================================================
//==================================================================================================
// get total rlocks
app.get('/api/get_tot_lock', function(req, res){
  let jeSQL="SELECT * FROM locker";    
  con.query(jeSQL,[],function (err, result) {
    if (err) throw err;    
    else res.send(result);   
  });    
});
//==================================================================================================
//==================================================================================================
// drop all rlocks
app.delete('/api/drop_rlock', function(req, res){
  /*
  fs.writeFileSync('./records.json', JSON.stringify([], null, 2));
  res.send('All Record Locks Dropped'); 
  */
  var jeSQL="DELETE from locker";
  con.query(jeSQL,[],function (err, result) {  
    if (err) throw err;    
    res.send('All Record Locks Dropped'); 
  });
});

// get latest docno
app.get('/api/get_latest', function(req, res){    
  let trans=req.query.trans;  
  let docno=req.query.docno;  
  let new_arr=[]; let ctr_arr=0;
  let new_docno='';
  console.log('trans:'+trans+' vs docno:'+docno);
  /*
  var filepath='./records.json';
  const data = JSON.parse(fs.readFileSync(filepath, "utf8"));
  console.log('data:'+data.length);
  //new_arr.sort(JBE_SORT_ARRAY(['descrp']));
  for(var i=0;i<data.length;i++){
    if(data[i].status=='ADD' && data[i].trans==trans){ 
      new_arr[ctr_arr]=data[i].docno;
      ctr_arr++;
    }
  }
  */

  let jeSQL="SELECT * FROM locker WHERE trans=?";    
  con.query(jeSQL,[trans],function (err, result) {
    if (err) throw err;    
    //else res.send(result);   
    else{
      //new_arr=result; 
      for(var i=0;i<result.length;i++){
        if(result[i].status=='ADD' && result[i].trans==trans){ 
          new_arr[ctr_arr]=result[i].docno;
          ctr_arr++;
        }
      }

      //console.log('new_arr:'+new_arr.length);
      if(new_arr.length > 0){
        new_arr.sort();
        new_docno=new_arr[new_arr.length-1];
      }  
      //console.log('new_docno:'+new_docno);
      res.send(new_docno);
    }
  });    
});

// get rlock NEW
/*
app.get('/api/get_rlock', function(req, res){    
  let trans=req.query.trans;  
  let docno=req.query.docno;  
  let new_arr=[];
  var filepath='./records.json';
  const data = JSON.parse(fs.readFileSync(filepath, "utf8"));

  for(var i=0;i<data.length;i++){
    if(data[i].trans==trans && data[i].docno==docno){
      new_arr=data[i];
      break;
    }
  }
  //console.log('data:'+new_arr);
  res.send(new_arr);
});
*/

app.get('/api/get_rlock', function(req, res){    
  let trans=req.query.trans;  
  let docno=req.query.docno;    
  let jeSQL="SELECT * FROM locker WHERE trans=? AND docno=?";  
  
  con.query(jeSQL,[trans,docno],function (err, result) {
    if (err) throw err;    
    else res.send(result);    
  });  
});

app.put('/api/add_rlock', function(req, res){  
  /*
  let arr=req.query.arr;  
  var filepath='./records.json';
  const data = JSON.parse(fs.readFileSync(filepath, "utf8"));
  data.push(JSON.parse(arr));

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  //console.log('add');
  res.send('added'); 
  */
  let arr=req.query.arr;
});

app.delete('/api/del_rlock', function(req, res){ 
  let trans=req.query.trans;  
  let docno=req.query.docno;
  
  var jeSQL="DELETE from locker where trans=? and docno=?";
  con.query(jeSQL,[trans,docno],function (err, result) {  
    if (err) throw err;    
    else res.send('Record Lock released:'+docno); 
  });

  //res.send('Record Lock released:'+docno); 
});

app.put('/api/chg_rlock', function(req, res){ 
  let trans=req.query.trans;  
  let docno=req.query.docno;  
  let new_docno=req.query.new_docno;
  //console.log(trans+' vs '+new_docno);
  /*
  var filepath='./records.json';
  const data = JSON.parse(fs.readFileSync(filepath, "utf8"));

  for(var i=0;i<data.length;i++){
    if(data[i].trans==trans && data[i].docno==docno){
      data[i].docno=new_docno;
    }
  }
    
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  */

  let jeSQL="UPDATE locker SET docno=? WHERE trans=? AND docno=?";
  con.query(jeSQL,[new_docno,trans,docno],function (err, result) {  
    if (err) throw err;    
    else res.send('Record Docno Changed to:'+new_docno);  
  });   
});

//========================================================================================================
//========================================================================================================
//========================================================================================================
// Middleware to parse request body
//app.use(bodyParser.json());

// CREATE
app.post('/create', (req, res) => {
  let tbl=req.query.tbl;  
  let arr=req.query.arr;  
  console.log(arr);
  var filepath='./db/'+tbl+'.json';
  const data = JSON.parse(fs.readFileSync(filepath, "utf8"));
  data.push(JSON.parse(arr));

  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  const items = readData(tbl);
  res.send(items);
});

// READ
app.get('/items', (req, res) => {
  let tbl=req.query.tbl;
  const items = readData(tbl);
  res.send(items);
});

// READ
app.get('/items/get_user', (req, res) => {
  let userid = req.query.userid.toUpperCase();
  let pword = req.query.pword.toUpperCase();   
  let tbl='user';
  
  let db = readData(tbl);
  //console.log(items);  
  console.log(userid,pword);  

  let newArr=[];
  for(var i=0;i<db.length;i++){
    console.log((i+1),db[i].userid,db[i].pword);
    if(db[i].userid.toUpperCase()==userid && db[i].pword.toUpperCase()==pword){
      newArr[0]=db[i];
      break;
    }
  }
  
  console.log(newArr.length); 
  res.send(newArr);  
});

app.get('/items/get_all_tables', function (req, res) {    
  let aryTable = req.query.tbl;  
  let aryResult=[];    
  console.log('get_all_tables:'+aryTable.length);

  for(let i=0;i<aryTable.length;i++){
    let db=readData(aryTable[i]);
    aryResult[i]=db;
  }
  res.send(aryResult); 
});

//========================================================================================================
//======FM_LIB============================================================================================
//========================================================================================================

app.get('/items/fmlib_get', function(req, res){
  let tbl=req.query.tbl;
  let items = readData(tbl);
  console.log(tbl);
  res.send(items);
});

//************************************************************ */
// Function to read data from the JSON file
const readData = (tbl) => {
  const data = fs.readFileSync('./db/'+tbl+'.json');
  return JSON.parse(data);
};

// Function to write data to the JSON file
const writeData = (tbl,data) => {
  //console.log(data);
  fs.writeFileSync('./db/'+tbl+'.json', JSON.stringify(data, null, 2));
};
//************************************************************ */

app.post('/items/fmlib_update', function(req, res){
  let recno_fld = req.query.recno_fld;
  let recno_val = req.query.recno_val;
  let recno_data = req.query.recno_data;
  let tbl = req.query.tbl;

  console.log(recno_data);

  let items = readData(tbl);

  let index = items.findIndex(i => i[recno_fld] === recno_val);
  if(index !== -1) {
    items[index] = JSON.parse(recno_data);
    writeData(tbl,items);
    res.send(items);
  }else{
    //res.status(404).send({ message: 'Item not found' });
    res.send([]);
  }
});

app.post('/items/fmlib_save2', function(req, res){
  let recno_fld = req.query.recno_fld;
  let recno_val = req.query.recno_val;
  let recno_data = JSON.parse(req.query.recno_data);
  let tbl = req.query.tbl;
  
  let items = readData(tbl);
  
  let newArr = items.filter((item) => {
    return item[recno_fld] !== recno_val;
  });
  newArr.push(...recno_data);
  //console.log(newArr);
  writeData(tbl,newArr);      
  res.send(newArr);
});

app.post('/items/fmlib_add', (req, res) => {
  let recno_fld = req.query.recno_fld;
  let recno_val = req.query.recno_val;
  let tbl = req.query.tbl;
  let recno_data=req.query.recno_data;    

  //console.log(recno_data);

  let items = readData(tbl);  
  items.push(JSON.parse(recno_data));
  writeData(tbl,items); 
  res.send(items);
});

app.post('/items/fmlib_del', function(req, res){
  let recno_fld = req.query.recno_fld;
  let recno_val = req.query.recno_val;
  let tbl = req.query.tbl;

  console.log(recno_fld,recno_val, tbl); 
  
  let items = readData(tbl);
  let newArr = items.filter((item) => {
    return item[recno_fld] !== recno_val;
  });
  writeData(tbl,newArr);      
  res.send(newArr);
});

app.post('/items/fmlib_del2', function(req, res){
  let recno_fld = req.query.recno_fld;
  let recno_val = req.query.recno_val;
  let tbl = req.query.tbl;

  console.log(recno_fld,recno_val, tbl); 
  
  let items = readData(tbl);
  let newArr = items.filter((item) => {
    return item[recno_fld] !== recno_val;
  });
  writeData(tbl,newArr);      
  res.send(newArr);
});


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
var server = app.listen(db_host, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("App listening at http://%s:%s", host, port)
});
///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
