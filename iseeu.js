// Array to store mouse tracking data
var mouseData = [];

// Track mouse movement
function trackMouseMovement(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    mouseData.push({ type: 'movement', x: mouseX, y: mouseY });
}

// Track mouse click
function trackMouseClick(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    var elementId = event.target.id;
    mouseData.push({ type: 'click', x: mouseX, y: mouseY, id: elementId });

    // Export data as CSV on every click
    exportToCSV();
}

// Attach event listeners
window.addEventListener('mousemove', trackMouseMovement);
window.addEventListener('click', trackMouseClick);

// Function to generate a random user ID
function generateRandomUserId() {
    // Generate a random number between 1000 and 9999
    var randomNumber = Math.floor(Math.random() * 90000) + 10000;

    // Generate a timestamp
    var timestamp = new Date().getTime();

    // Combine the random number and timestamp to create the user ID
    var userId = 'user_' + randomNumber + '_' + timestamp;

    return userId;
}

// Function to export data as CSV
function exportToCSV() {
    var csvContent = "Type,X,Y,ElementID\r\n";

    mouseData.forEach(function(data) {
        var row = [data.type, data.x, data.y, data.id].join(",");
        csvContent += row + "\r\n";
    });

    // Send the CSV data to the PHP script
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "write_file.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("csvData=" + encodeURIComponent(csvContent));
}