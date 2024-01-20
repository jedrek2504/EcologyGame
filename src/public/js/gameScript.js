// gameScript.js
$(document).ready(function () {

    function getScoreAndUpdate() {
        $.ajax({
            url: '/getScore',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                const score = data.score;
                const username = data.username;

                $('#score').text('Score: ' + score);
                $('#username').text('Username: ' + username);
                $('#dailytask').css('display', 'block');
            },
            error: function (xhr, status, error) {
                console.error(`HTTP error! Status: ${status}, Error: ${error}`);
            }
        });
    }
    $('#close').on('click', function () {
        $('#dailytask').css('display', 'none');
        $("#display").empty();
    });

    $('.dailyTaskButton').on('click', function () {
        const dataToggleValue = $(this).data('toggle');

        // Send a POST request with the data-toggle value in the request body
        $.ajax({
            url: '/game',
            method: 'POST',
            contentType: 'application/json', // Set content type to JSON
            data: JSON.stringify({ toggleValue: dataToggleValue }), // Convert to JSON string
            dataType: 'json',
            success: function (response) {
                const array = response.desc;
                for (let i = 0; i < array.length; i++) {
                    const newText = array[i];

                    const newDiv = $('<div>', {
                        class: 'text-center',
                        text: newText
                    });
                    $("#display").append(newDiv);
                }
                getScoreAndUpdate();
                $('#dailytask').css('display', 'block');
            },
            error: function (xhr, status, error) {
                console.error('Error sending POST request:', error);
            }
        });
    });


    // Call the function when the DOM is ready
    getScoreAndUpdate();
    // You might want to call this function periodically or in response to some user action
    // For example, you can use setInterval to fetch the score every N seconds:
    // setInterval(getScoreAndUpdate, 5000); // Fetch score every 5 seconds
});