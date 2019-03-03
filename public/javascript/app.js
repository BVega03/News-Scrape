$(document).ready(function () {

    // Default variables
    var articleList = [];
    var articleId = '';
    var article = '';
    var previousArticle = 0;
    var currentArticle = 0;
    var nextArticle = 0;

    $('#comments').addClass('hidden');

    // Scrape website on initial page load
    $.getJSON('/scrape', function () {});

    // Get all articles when read articles button clicked and build an array of articles
    $(document).on('click', '#getArticles', function () {
        $.getJSON('/articles', function (data) {
            articleList = data;
            article = articleList[0];
            showArticle(article);
        });
    });

    // Display previous article from the array of articles
    $(document).on('click', '.previous', function () {
        article = articleList[previousArticle];
        currentArticle = previousArticle;
        showArticle(article);
    });

    // Display next article from the array of articles
    $(document).on('click', '.next', function () {
        article = articleList[nextArticle];
        currentArticle = nextArticle;
        showArticle(article);
    });

    // Add comment to article and update comments display
    $(document).on('click', '#addComment', function () {
        if ($('#commentText').val() != '') {
            var name = $('#name').val();
            var comment = $('#commentText').val();
            $.post("/addcomment/" + articleId, {
                name: name,
                comment: comment
            }, function (e) {
                e.preventDefault();
            });
            $('#name').val('');
            $('#commentText').val('');
            showComments(articleId);
        }
    });

    // Delete comment from article and update comments display
    $(document).on('click', '.deletecomment', function () {
        commentId = this.id;
        // console.log("comment id "+ commentId);
        $.ajax({
            method: "GET",
            url: "/deletecomment/" + commentId
        }).done(function (data) {})
        showComments(articleId);
    });

    // Function to build article display
    var showArticle = function (article) {
        $('#title').text(article.title);
        $("#image").removeClass("hidden");
        $('#image').attr('src', article.imgLink);
        $('#summary').text(article.summary);
        $("#readArticle").removeClass("hidden");
        $('#article').attr('href', article.storyLink);
        $("#getArticles").addClass("hidden");
        $("#navigation").empty();
        previousArticle = currentArticle - 1;
        if (previousArticle >= 0) {
            $('#navigation').append('<button id="' + previousArticle + '" class="btn btn-primary previous">Previous Article</button>');
        } else {
            $('#navigation').append('<button id="' + previousArticle + '" class="btn btn-primary disabled previous">Previous Article</button>');
        }
        nextArticle = currentArticle + 1;
        if (nextArticle < articleList.length) {
            $('#navigation').append('<button id="' + nextArticle + '" class="btn btn-primary pull-right next">Next Article</button>');
        } else {
            $('#navigation').append('<button id="' + nextArticle + '" class="btn btn-primary pull-right disabled next">Next Article</button>');
        }
        articleId = article._id;
        showComments(articleId);
    }

    // Function to build comments display for article
    var showComments = function (articleId) {
        $("#comments").removeClass("hidden");
        $("#articleComments").empty();
        var commentText = '';
        $.getJSON('comments/' + articleId, function (data) {
            for (var i = 0; i < data.length; i++) {
                commentText = commentText + '<div class="well"><span id="' + data[i]._id + '" class="glyphicon glyphicon-remove text-danger deletecomment"></span> ' + data[i].comment + ' - ' + data[i].name + '</div>';
            }
            $("#articleComments").append(commentText);
        });
    }

});

// Grab the articles as a json
// $.getJSON("/articles", function(data) {
//     // For each one
//     for (var i = 0; i < data.length; i++) {
//       // Display the apropos information on the page
//       $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
//     }
//   });


//   // Whenever someone clicks a p tag
//   $(document).on("click", "p", function() {
//     // Empty the notes from the note section
//     $("#notes").empty();
//     // Save the id from the p tag
//     var thisId = $(this).attr("data-id");

//     // Now make an ajax call for the Article
//     $.ajax({
//       method: "GET",
//       url: "/articles/" + thisId
//     })
//       // With that done, add the note information to the page
//       .then(function(data) {
//         console.log(data);
//         // The title of the article
//         $("#notes").append("<h2>" + data.title + "</h2>");
//         // An input to enter a new title
//         $("#notes").append("<input id='titleinput' name='title' >");
//         // A textarea to add a new note body
//         $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
//         // A button to submit a new note, with the id of the article saved to it
//         $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

//         // If there's a note in the article
//         if (data.note) {
//           // Place the title of the note in the title input
//           $("#titleinput").val(data.note.title);
//           // Place the body of the note in the body textarea
//           $("#bodyinput").val(data.note.body);
//         }
//       });
//   });

//   // When you click the savenote button
//   $(document).on("click", "#savenote", function() {
//     // Grab the id associated with the article from the submit button
//     var thisId = $(this).attr("data-id");

//     // Run a POST request to change the note, using what's entered in the inputs
//     $.ajax({
//       method: "POST",
//       url: "/articles/" + thisId,
//       data: {
//         // Value taken from title input
//         title: $("#titleinput").val(),
//         // Value taken from note textarea
//         body: $("#bodyinput").val()
//       }
//     })
//       // With that done
//       .then(function(data) {
//         // Log the response
//         console.log(data);
//         // Empty the notes section
//         $("#notes").empty();
//       });

//     // Also, remove the values entered in the input and textarea for note entry
//     $("#titleinput").val("");
//     $("#bodyinput").val("");
//   });