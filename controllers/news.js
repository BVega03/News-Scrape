// NPM Modules

var express = require("express");
// var path = require('path');
var request = require("request");
var cheerio = require("cheerio");
var axios = require("axios");
var router = express.Router();
var mongoose = require("mongoose");
var Promise = require("bluebird");

// Assign Mongoose promise
mongoose.Promise = Promise;

// Mongodb models
var Articles = require("../models/Articles");
var Comments = require("../models/Comments");

// Website To Be Scraped
var url = "https://www.nba.com/";

axios.get("https://www.nba.com").then(function(response) {
        // load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);
        var result = [];
        $("a.content_list--item").each(function (i, element) {
            var title = $(element).text();
            var newsLink = $(element).attr("href");
            // var imgLink = $(element).find("a").find("img").attr("src");
            // var summary = $(element).find("h5.content_list--title").text();
            // summary = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
            result.push({
                Title: title,
                News: newsLink,
                // Link: imgLink,
                // Summary: summary
            });
        });
        console.log(result);
        res.send(result);
    });


// // Default route renders the index handlebars view
// router.get('/', function (req, res) {
//     res.render('index');
// });

// // Scrape the website and assign stories to the database. Checks to verify story has not been added previously.
// router.get('/scrape', function (req, res) {
//     request(url, function (error, response, html) {
//         var $ = cheerio.load(html);
//         var result = [];
//         // Scrape website
//         $("h5.content_list--title").each(function (i, element) {
//             var title = $(element).find("a").find("img").attr("title");
//             // var newsLink = $(element).find("a").attr("href");
//             // var imgLink = $(element).find("a").find("img").attr("src");
//             // var summary = $(element).find("h5.content_list--title").text();
//             // summary = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
//             result.push({
//                 Title: title,
//                 // News: newsLink,
//                 // Link: imgLink,
//                 // Summary: summary
//             });
//             // Check database to see if story saved previously to database
//             Articles.findOne({
//                 'title': title
//             }, function (err, articleRecord) {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     if (articleRecord == null) {
//                         Articles.create(result[i], function (err, record) {
//                             if (err) throw err;
//                             console.log("Record Added");
//                         });
//                     } else {
//                         console.log("No Record Added");
//                     }
//                 }
//             });
//         });
//     });
// });

// Get all current articles in database
axios.get('/articles', function (req, res) {
    Articles.find().sort({
        createdAt: -1
    }).exec(function (err, data) {
        if (err) throw err;
        res.json(data);
    });
});

// Get all comments for one article
axios.get('/comments/:id', function (req, res) {
    Comments.find({
        'articleId': req.params.id
    }).exec(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

// Add comment for article
axios.post('/addcomment/:id', function (req, res) {
    console.log(req.params.id + ' ' + req.body.comment);
    Comments.create({
        articleId: req.params.id,
        name: req.body.name,
        comment: req.body.comment
    }, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log("New Comment Added");
        }
    });
});

// Delete comment for article
axios.get('/deletecomment/:id', function (req, res) {
    console.log(req.params.id)
    Comments.remove({
        '_id': req.params.id
    }).exec(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log("Comment deleted");
        }
    })
});

module.exports = axios;