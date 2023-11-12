const http = require("http");
const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    var mysql = require('mysql2'); 
    // create a new MySQL connection
    var connection = mysql.createConnection({
        host: "sql12.freesqldatabase.com",
        user: "sql12658981",
        password: "hZVmGXb3JQ",
        database: "sql12658981",
        port: 3306
    });
    try {
        // connect to the MySQL database
        connection.connect(function (error) {
            if (error) {
    	        console.error('Error connecting to MySQL database: ', error);
            } else {
   	        console.log('Connected to MySQL database!');
            }
        });
    } 
    catch(error) {
        console.error('Error: ', error);
    }
    
    //set the request route
    if (req.url === "/api" && req.method === "GET") {
        //response headers
        res.writeHead(200, { "Content-Type": "application/json" });
        //set the response
        res.write(JSON.stringify({ message: "Hi there, This is a CatNA's API" }));
        //end the response
        res.end();
    }
    else if (req.url === "/api/accountNumber" && req.method === "GET") {
    	try {
	    var sql = "select myNumber from AccountCount";
    	    connection.query(sql, function (error, results) {
              if (error) {
      	          console.error('Error querying to MySQL database: ', error);
	      } else {
	      	//response headers
        	res.writeHead(200, { "Content-Type": "application/json" });
        	//set the response
        	res.write(JSON.stringify({ myNumber: results[0].myNumber }));
        	//end the response
        	res.end();
	      }
	    });
	} 
	catch(error) {
	    console.error('Error: ', error);
	}
    }
    else if (req.url === "/api/accountNumber" && req.method === "POST") {
    	try {
	    var sql = "select myNumber from AccountCount";
    	    connection.query(sql, function (error, results) {
              if (error) {
      	          console.error('Error querying to MySQL database: ', error);
	      } else {
	      	var myNumber = Number(results[0].myNumber) + 1;
	      	sql = "update AccountCount set myNumber = " + myNumber;
	      	connection.query(sql, function (error, results) {
              	  if (error) {
      	              console.error('Error querying to MySQL database: ', error);
	          } else {
	      	      //response headers
        	      res.writeHead(200, { "Content-Type": "application/json" });
        	      //set the response
        	      res.write(JSON.stringify({ message: "Successfully created" }));
        	      //end the response
        	      res.end();
	          }
	        });
	      }
	    });
	} 
	catch(error) {
	    console.error('Error: ', error);
	}
    }
    // If no route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
