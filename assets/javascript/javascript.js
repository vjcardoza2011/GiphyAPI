$( document ).ready(function() {

    // required topics array
    var topics = ["Cowboys", "Saints", "Packers", "Patriots", "Seahawks", "Steelers", "Chiefs","Texans"];
    
    //function that displays the gif buttons
    
    function displayGifButtons() {
        $("#gifButton").empty();
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("team");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButton").append(gifButton);
        }
    }
    
    //function to add new button
    
    function addNewButton() {
        $("#addGif").on("click", function() {
            var team = $("#topicsInput").val().trim();
            if (team == ""){
                return false;
            }
            topics.push(team);
    
            displayGifButtons();
            return false;
            });
    }
    
    //function to remove last button
    function removeLastButton() {
        $("removeGif").on("click", function() {
            topics.pop(team);
            displayGifButtons();
            return false;
        });
    
    }
    
    // function that displays the gifs
    
    function displayGifs() {
        var team = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=wxYKy5ZxXnmShAsNytSPrZ5LMPGLiKUL&limit=10";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
        .done(function(response) {
            $("#gifView").empty();
            //show results of gifs
            var results = response.data;
            if (results == ""){
                alert("There is not a giphy for this!");	
            }
            for (var i = 0; i<results.length; i++){
                //adds gif into a div
                var gifDiv = $("<div1>");
                //pulls the rating of the gif
                var gifRating = $("<p>").text("Rating " + results[i].rating);
                gifDiv.append(gifRating);
    
                //pulls the gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                //pauses images
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                //animates images
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                //adds a new div into the exisiting divs
                $("#gifView").prepend(gifDiv);
            }
        });
    }
    
    
    displayGifButtons();
    addNewButton();
    removeLastButton();
    
    
    
    //event listeners
    $(document).on("click", ".team", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    
        });
    
    });