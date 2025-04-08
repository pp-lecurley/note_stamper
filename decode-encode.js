// Add event listener for the "Encode" button
document.getElementById('encodeButton').addEventListener('click', function () {
    const inputText = document.getElementById('encodedText').value;
    if (inputText) {
        const encoded = base64Encode(inputText);
        document.getElementById('decodedText').innerText = `Encoded: ${encoded}`;
    } else {
        alert('Please enter text to encode.');
    }
});

// Add event listener for the "Decode" button
document.getElementById('decodeButton').addEventListener('click', function () {
    const inputText = document.getElementById('encodedText').value;
    if (inputText) {
        const decoded = base64Decode(inputText);
        const beautified = beautifyIfJson(decoded);
        const minified = minifyIfJson(decoded);
        document.getElementById('decodedText').innerHTML = `
            <strong>Minify: </strong><br> <pre>${minified}</pre><br><br>
            <strong>Beautify: </strong><pre>${beautified}</pre>
        `;
    } else {
        alert('Please enter text to decode.');
    }
});

// Function to Base64 encode a string
function base64Encode(input) {
    try {
        const encoded = input
            .split('.')
            .map(part => btoa(part)) // Use btoa for browser compatibility
            .join('.');
        return encoded;
    } catch (error) {
        console.error("Error encoding string:", error);
        return null;
    }
}

// Function to Base64 decode a string
function base64Decode(input) {
    try {
        const decoded = input
            .split('.')
            .map(part => atob(part)) // Use atob for browser compatibility
            .join('.');
        return decoded;
    } catch (error) {
        console.error("Error decoding string:", error);
        return "Invalid encoded text";
    }
}

// Function to beautify JSON if applicable
function beautifyIfJson(input) {
    try {
        const json = JSON.parse(input);
        return JSON.stringify(json, null, 2); // Beautify JSON with indentation
    } catch {
        return input; // Return as is if not JSON
    }
}

// Function to minify JSON if applicable
function minifyIfJson(input) {
    try {
        const json = JSON.parse(input);
        return JSON.stringify(json); // Minify JSON by removing spaces
    } catch {
        return input; // Return as is if not JSON
    }
}