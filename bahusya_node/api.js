const http = require('http');
const mongo_client = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const mongoconnection_details = require('./properties/mongoconnection.js');

const mongo_client_connection = new mongo_client(mongoconnection_details.connectionurl);


const server = http.createServer((req, res) => {
    if(req.url=='/'){
        fs.readFile(path.join(__dirname, 'public/index.html'), (error, data) => {
              if (error) {
                console.error(error);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
              } else {
                  res.writeHead(200, {'Content-Type': 'text/html'});
                  res.end(data);
              }
            });
    }
    else if(req.url=='/api'){
        const headers = {
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
                            "Content-Type": 'application/json'
                       };
        (async (req, res) => {
          try {
            await mongo_client_connection.connect();
            const database = mongo_client_connection.db(mongoconnection_details.database);
            const collection = database.collection(mongoconnection_details.collection);

            if (req.method === 'GET') {
              var docs_json = await collection.find({}).toArray();
              docs_json = JSON.stringify(docs_json, null, 2);
              fs.writeFile('./public/db.json', docs_json, () => {});
              res.writeHead(200, headers);
              res.end(docs_json);
            }
            else {
              res.writeHead(405, {'Content-Type': 'text/plain'});
              res.end('Method Not supported');
            }
          } catch (err) {
            console.error(err);
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('server failed to handle the request');
          }
        })(req,res);
    }
    else if(req.url.includes(".css")){
        fs.readFile(path.join(__dirname, 'public', req.url), (error, data) => {
              if (error) {
                console.error(error);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
              } else {
                  res.writeHead(200, {'Content-Type': 'text/css'});
                  res.end(data);
              }
            });
    }
    else if(req.url.includes(".jpeg") || req.url.includes(".jfif")){
        fs.readFile(path.join(__dirname, 'public', req.url), (error, data) => {
              if (error) {
                console.error(error);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
              } else {
                  res.writeHead(200, {'Content-Type': 'image/jpeg'});
                  res.end(data);
              }
            });
    }
    else if(req.url.includes(".html")){
        fs.readFile(path.join(__dirname, 'public', req.url), (error, data) => {
              if (error) {
                console.error(error);
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
              } else {
                  res.writeHead(200, {'Content-Type': 'text/html'});
                  res.end(data);
              }
            });
    }
    else{
        res.end("<h1>Nothing is here</h1>");
     }
});


const PORT= 3000;
server.listen(PORT,()=> console.log(`Great our server is running on port ${PORT} `));