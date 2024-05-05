
        // Function to update time and date
        function updateTimeAndDate() {
            // Get current date and time
            let now = new Date();

            // Format date
            let dateString = now.toLocaleDateString('en-US');

            // Format time
            let timeString = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            // Update the input fields with the current date and time
            document.querySelector('.date').value = dateString;
            document.querySelector('.time').value = timeString;
        }

        // Update time and date every second
        setInterval(updateTimeAndDate, 1000);

        // Call updateTimeAndDate initially to display the current time and date
        updateTimeAndDate();
    