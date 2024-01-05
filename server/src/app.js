
// app.js
const http = require('http');
const url = require('url');
const pool = require('./db'); // Assuming db.js is in the same directory
const fs = require('fs');
const path = require('path');

const server = http.createServer(async (req, res) => {
   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
   if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
   const reqUrl = url.parse(req.url, true);
   const categoryId = parseInt(reqUrl.pathname.split('/').pop(), 10);
     if(reqUrl.path === '/login') {
         const filePath = path.join(__dirname, 'login.html');
         fs.readFile(filePath, 'utf-8', (err, data) => {
            if(err) {
               res.writeHead(500, { 'Content-Type': 'text/plain'});
               res.end('Internal Server Error');
            } else {
               res.setHeader('Cache-Control', 'no-cache');
               res.writeHead(200, {'Content-Type': 'text/html'});
               res.end(data);
            }
          
         })  
     } else if(reqUrl.path == '/categories' && req.method === 'GET') {
         const selectQuery = 'SELECT * FROM categories ORDER BY id DESC';
         let client;
         try {
            client = await pool.connect();
            const result = await client.query(selectQuery);
            const data = result.rows;
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(data));
            //console.log('Retrieved data:', data);

         } catch(error) {
            console.error('Error fetching data from database: ', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal Server Error' }));
         } finally {
            if (client) {
               client.release(); // Release the client back to the pool
             }
         }
     }
     else if(reqUrl.path === '/categories' && req.method === 'POST') {
         if(req.headers['content-type'] === 'application/json') {
            let body = '';
            //chunk is a json object being read from the client in this case
            req.on('data', (chunk) => {
               body += chunk;
            });
            req.on('end', () => {
               try {
                  const formData = JSON.parse(body);
                  if(formData.name.length > 255) {
                     res.end(JSON.stringify({message: 'Please Enter no more than 255 character'}));
                  }
                  else if(formData.name === '') {
                     res.end(JSON.stringify({message: 'Please enter some categories to proceed'}));
                  } else {
                     pool.connect((err, client, release) => {
                        if(err) {
                           return new Error('Error acquring client', err.stack());
                        }
                        const insertQuery = 'INSERT INTO categories(name) values($1) RETURNING *';
                        client.query(insertQuery, [formData.name], (err, result) => {
                           release();
                           if(err) {
                              return console.error('Error executing query', err.stack);
                           }
                          // console.log('Inserted data successfully',result.rows[0]);
                           res.writeHead(200, {'Content-Type': 'application/json'});
                           res.end(JSON.stringify({insertedData: result.rows[0]})); //server is resonding in the form of JSON 
                        });
                     });
                  }
      
               }catch(error) {
                  console.error('Error parsing JSON:', error.message);
                  res.writeHead(400, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ message: 'Invalid JSON data' }));
               }
            });
         } else {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({message: 'Invalid Content Type'}));
            return;
         }
     }
     else if(reqUrl.pathname.startsWith('/categories/') && !isNaN(categoryId) && req.method === 'DELETE') {
          if(req.headers['content-type'] === 'application/json') {
            let body = ''; 
            req.on('data', (chunk) => {
               body+= chunk.toString(); 
             });
            req.on('end', () => {
               const category = JSON.parse(body);
               pool.connect((err, client, release) => {
                  if(err) {
                     throw new Error('Error acquring client', err.stack());
                  }
                  const deleteQuery = 'DELETE FROM categories WHERE id=$1 RETURNING *';
                  const values = [category.id];
                  client.query(deleteQuery, values, (err, result) => {
                     release();
                     if(err) {
                        console.error('Error deleting query: ' + err);
                        res.end(JSON.stringify({message: 'Internal Server Error'}));
                     } else {
                        res.end(JSON.stringify(result.rows));
                     }
                  });
               })
            });
          }
     }
     else if(reqUrl.pathname.startsWith('/categories/') && !isNaN(categoryId) && req.method === 'PUT') {
      if(req.headers['content-type'] === 'application/json') {
        let body = ''; 
        req.on('data', (chunk) => {
           body+= chunk.toString(); 
         });
        req.on('end', () => {
           const category = JSON.parse(body);
           pool.connect((err, client, release) => {
              if(err) {
                 throw new Error('Error acquring client', err.stack());
              }
              const updateQuery = 'UPDATE categories SET name=$1 WHERE id=$2 RETURNING *';
              const values = [category.name, category.id];
              client.query(updateQuery, values, (err, result) => {
                 release();
                 if(err) {
                    console.error('Error updating query: ' + err);
                    res.end(JSON.stringify({message: 'Internal Server Error'}));
                 } else {
                    res.end(JSON.stringify(result.rows));
                 }
              });
           })
        });
      }
 }

     else if(reqUrl.pathname === '/admin' && req.method === 'GET') {
        const filePath = path.join(__dirname, 'admin.html');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if(err) {
               res.writeHead(500, { 'Content-Type': 'text/plain'});
               res.end('Internal Server Error');
            } else {
               res.setHeader('Cache-Control', 'no-cache');
               res.writeHead(200, {'Content-Type': 'text/html'});
               res.end(data);
            }
        });   
     } 
     else if(reqUrl.pathname === '/product/cosmetics' && req.method === 'POST') {
      
     }
     else {
        res.writeHead(404, { 'Content-Type': 'text/plain'});
        res.end('Page Not Found')
     }
});

const port = 3001;
server.listen(port, () => {
  console.log(`Application Server is running on port ${port}`);
});