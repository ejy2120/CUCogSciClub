$(document).ready(function() {
    let currentElementText = ""; // Variable to store the text of the currently hovered element

    $(".hoverable, img").hover(
        function(ev) {
            // Executed when mouse enters an element
            // We want to highlight this element when hovering over it
            $(this).addClass("highlight");

            // If the element is an image, either read the alt text if it's availble, or the source of the image
            if ($(this).is("img")) {
                var alttext = $(this).attr("alt"); // Alt text
                var srcofimg = $(this).attr("src"); // Source of image

                if ($(this).attr("alt")) {
                    currentElementText = alttext;
                } else {
                    currentElementText = srcofimg;
                }
            } else { // The element is not an image --> is text
                currentElementText = $(this).text(); // Store the text of the current element
            }
            ev.stopPropagation();
        },

        function(ev) {
            // Executed when mouse exits an element 
            $(this).removeClass("highlight");
            speechSynthesis.cancel();
            currentElementText = "";
        }
    );

    // Add keydown event listener to document to handle key presses
    document.addEventListener("keydown", function(e) {
        if (e.code === 'Space' || e.code === '' || e.code === 'Unidentified') {
            e.preventDefault(); // Prevent default behavior of scrolling down
            speechSynthesis.speak(new SpeechSynthesisUtterance(currentElementText));

        } else {
            // If any key other than space is pressed, remove highlight
            e.preventDefault(); // Prevent default behavior of scrolling down
            speechSynthesis.cancel();
            currentElementText = ""; // Clear the stored text
        }
    });



    // When the "play" button is clicked, start speech synthesis for specific paragraph
    $(".playButton").click(function(){
        var textToPlay;

        if ($(this).next().is("img")) {
            textToPlay = $(this).next("img").attr("alt");
        } else { // The element is not an image --> is text
            textToPlay = $(this).next().text(); // Store the text of the current element
        }

        // Cancel any current speech and speak this text
        speechSynthesis.cancel();
        speechSynthesis.speak(new SpeechSynthesisUtterance(textToPlay));
    });


});