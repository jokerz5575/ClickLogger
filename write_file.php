<?php
// Get the CSV data from the request
$csvData = $_POST['csvData'];

// Generate a random user ID for the file name
$userId = 'user_' . uniqid() . '.csv';

// Specify the path to the data folder and the file location
$dataFolder = 'data/';
$filePath = $dataFolder . $userId;

// Write the CSV file
file_put_contents($filePath, $csvData);

// Return a response indicating success or failure
if (file_exists($filePath)) {
    echo "File successfully written.";
} else {
    echo "Failed to write file.";
}
?>