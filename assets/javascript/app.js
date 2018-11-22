$(document).ready(function () {

    // Batman characters that will be pushed into this array
    var batman = ["Batman", "Nightwing", "Joker", "Harley Quinn", "Two-Face", "Riddler", "Poison Ivy", "Bane", "Batgirl", "Catwoman", "Robin", "Killer Croc", "Batmobile"];

    // function that will display the gif buttons
    function buttons() {
        $("#gif").empty();
        for (var i = 0; i < batman.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("batman");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", batman[i]);
            gifButton.text(batman[i]);
            $("#gif").append(gifButton);
        }
    }

    // function to display a new button of the users choice
    // add an on.(click) so that the user can click the button an it preforms the function
    function addButton() {
        $("#addGif").on("click", function () {
            var batman = $("#batman-input").val().trim();
            if (batman == "") {
                return false;
            }
            batman.push(batman);

            displayGifButtons();
            return false;
        });
    }
    // Function to remove last action button
    function removeButton() {
        $("removeGif").on("click", function () {
            batman.pop(batman);
            buttons();
            return false;
        });
    }

    // function that will display the chosen gif
    function displayGifs() {
        var batman = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + batman + "&api_key=XB5VBHWtRqVA8wwyA4CPR8IYmWqQw9ys&limit=10";
        console.log(queryURL);

        // ajax will display the URL
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
            .done(function (response) {
                console.log(response);
                var results = response.data;

                //shows gif results
                if (results == "") {
                    alert("There isn't a gif for this selected button");
                }
                for (var i = 0; i < results.length; i++) {

                    // div for the gif to go inside
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");

                    // gif rating
                    var rating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.prepend(rating);

                    // pulling gif
                    var image = $("<img>");
                    image.attr("src", results[i].images.fixed_height_small_still.url);

                    // still gif
                    image.attr("data-still", results[i].images.fixed_height_small_still.url);

                    // animated gif
                    image.attr("data-animate", results[i].images.fixed_height_small.url);

                    // gif state
                    image.attr("data-state", "still");

                    image.addClass("image");

                    // append the gif
                    gifDiv.append(image);

                    // prepend the gif
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }

    // buttons from html doc
    buttons();
    addButton();
    removeButton();

    // Event listener document on.(click) for switching 
    $(document).on("click", ".batman", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    });
});