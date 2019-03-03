var mongoose = require("mongoose");

// Local Database Configuration with Mongoose
// mongoose.connect("mongodb://localhost/goodnews", function(error)
// 	{if(error) throw error;
// 	console.log("Database connected");
// });

// mLab database

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);
// mongoose.connect("mongodb://heroku_", function (err) {
//     if (err) throw err;
//     console.log('database connected');
// });