 // gameScript.js
 $(document).ready(function () {
    function getScoreAndUpdate() {
      $.ajax({
        url: '/getScore',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          const score = data.roundedScore;
          const username = data.username;
          updateProgressBar(score);

          if (score >= 100) {
            console.log("WIN");
            // Send a POST request to /checkout
            $.ajax({
              url: '/checkout',
              method: 'POST',
              contentType: 'application/json', // Set content type to JSON
              dataType: 'json',
              success: function (response) {
                console.log('POST request successful:', response);
              },
              error: function (xhr, status, error) {
                // Handle error
                console.error('Error sending POST request:', error);
              }
            });
          }


          $('#score').text('Score: ' + score);
          $('#username').text('Username: ' + username);
        },
        error: function (xhr, status, error) {
          console.error(`HTTP error! Status: ${status}, Error: ${error}`);
        }
      });
    }

    $('.dailyTaskButton').on('click', function () {
      const dataToggleValue = $(this).data('number');

      // Send a POST request with the data-toggle value in the request body
      $.ajax({
        url: '/game',
        method: 'POST',
        contentType: 'application/json', // Set content type to JSON
        data: JSON.stringify({ toggleValue: dataToggleValue }), // Convert to JSON string
        dataType: 'json',
        success: function (response) {
          const array = response.desc;
          const isCompleted = response.isCompleted;
          $("#display").empty();
          for (let i = 0; i < array.length; i++) {
            const newText = array[i];
            if (isCompleted) {
              var checkbox = $('<input>', {
                class: 'form-check-input',
                type: 'checkbox',
                value: i,
                id: 'check' + i,
                checked: true,
                disabled: true
              });
            } else {
              var checkbox = $('<input>', {
                class: 'form-check-input',
                type: 'checkbox',
                value: i,
                id: 'check' + i
              });
            }

            var label = $('<label>', {
              class: 'form-check-label',
              for: 'check' + i,
              text: newText
            });

            var checkboxContainer = $('<div>', {
              class: 'form-check'
            });

            // Append the checkbox and label to the container
            checkboxContainer.append(checkbox, label);
            $("#display").append(checkboxContainer);
            $("#display").attr('data-number', dataToggleValue);
          }
          getScoreAndUpdate();
        },
        error: function (xhr, status, error) {
          console.error('Error sending POST request:', error);
        }
      });
    });

    function updateProgressBar(value) {
      const progressBar = document.getElementById('myProgressBar');
      progressBar.style.width = value + '%';
      progressBar.innerHTML = value + '%';
    }

    $('#save').on('click', function () {
      const dayNumber = $('#display').attr('data-number');

      var checkedCheckboxes = true;
      var alreadyDone = true;
      for (let i = 0; i < 3; i++) {
        const checkbox = $('#check' + i);
        if (!checkbox.prop('checked')) {
          checkedCheckboxes = false;
        } else if (!checkbox.prop('disabled')) {
          alreadyDone = false;
        }
      }
      if (!checkedCheckboxes) {
        alert("You have to complete all tasks to save");
        return;
      }


      const requestData = {
        dayNumber: dayNumber,
      };
      if (!alreadyDone) {
        $.ajax({
          url: '/game',
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify(requestData),
          dataType: 'json',
          success: function (response) {
            var score = 0;
            if (response.roundedScore > 100) {
              score = 100;
            } else {
              score = response.roundedScore;
            }
            updateProgressBar(score);
            $('#score').text("Score: " + score);
            console.log('PUT request successful:', response);
          },
          error: function (xhr, status, error) {
            // Handle error
            console.error('Error sending PUT request:', error);
          }
        });
      }

    });

    $('#reset').on('click', function () {
      $.ajax({
        url: '/reset',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          const score = data.roundedScore;
          const username = data.username;
          updateProgressBar(score);
          $('#score').text('Score: ' + score);
          $('#username').text('Username: ' + username);
        },
        error: function (xhr, status, error) {
          console.error(`HTTP error! Status: ${status}, Error: ${error}`);
        }
      });
    });



    // Call the function when the DOM is ready
    getScoreAndUpdate();
    // You might want to call this function periodically or in response to some user action
    // For example, you can use setInterval to fetch the score every N seconds:
    // setInterval(getScoreAndUpdate, 5000); // Fetch score every 5 seconds
  });