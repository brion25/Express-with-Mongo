var express = require('express'),
    bodyparser = require('body-parser'),
    client = require('mongodb').MongoClient,
    urlDb = 'mongodb://localhost:27017/test',
    app = express(),
    database = null;

client.connect(urlDb,function(err,db){
  if(err) throw err;
  database = db;
});

app.use(bodyparser.json());

app.post('/:collection',function(req,res){
  var collectionName = req.params.collection,
      collectionData = req.body,
      collection = database.collection(collectionName);

  collection.save(collectionData,function(err,result){
    if(err) throw err;
    res.send(result);
  })
});

app.get('/:collection',function(req,res){
  var collectionName = req.params.collection,
      collection = database.collection(collectionName);

  collection.find().toArray(function(err, docs){
    if(err) throw err;
    if(docs.length>0){
      var response = '<table border="1">'
      for(var i=0;i<docs.length;i++){
        var doc = docs[i];
        response+='<tr>'
        Object.keys(doc).forEach(function(key){
          response+='<td>'+key+'</td><td>'+doc[key]+'</td>';
        });
        response+='</tr>'
      }
      response+='</table>';
      res.send(response);
    }else{
      res.send('<h1>'+collectionName+'</h1>');
    }
  });
});

var server = app.listen(3000,function(){

  var host = server.address().address,
      port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
