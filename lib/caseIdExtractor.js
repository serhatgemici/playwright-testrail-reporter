const fs = require('fs');
const path = require('path');

// Define the pattern to match test case IDs ending with either a colon or a space
const pattern = /C(\d+)(:|\s)/g;

// Function to extract test case IDs from files in a directory
function extractCaseIds(directoryPath) {
    return new Promise((resolve, reject) => {
        // List to hold all test case IDs
        let testCaseIds = [];

        // Read files from the directory
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return reject('Error reading the directory: ' + err);
            }

            files.forEach(file => {
                const filePath = path.join(directoryPath, file);
                // Read the content of the file
                const content = fs.readFileSync(filePath, 'utf8');
                // Find all matches of the pattern
                let matches;
                while ((matches = pattern.exec(content)) !== null) {
                    // Convert matches to integers and add to the list
                    testCaseIds.push(parseInt(matches[1], 10));
                }
            });

            // Remove duplicates and sort the list
            testCaseIds = [...new Set(testCaseIds)].sort((a, b) => a - b);

            resolve(testCaseIds);
        });
    });
}

module.exports = extractCaseIds;