
    // Function to format the date as MM/DD/YYYY
    function getFormattedDate() {
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    const date = getFormattedDate(); // Get the formatted date

    // Save notes when the ENTER key is pressed
    document.getElementById('notes').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent a new line in the textarea
            const notes = document.getElementById('notes').value;
            if (notes) {
                const formattedNotes = `${date} [LC] --> ${notes}`;
                document.getElementById('formattedNotes').innerText = formattedNotes;
            } else {
                alert('Please enter some notes before saving.');
            }
        }
    });

    // Copy notes to clipboard
    document.getElementById('copyButton').addEventListener('click', function() {
        const formattedNotes = document.getElementById('formattedNotes').innerText;
        if (formattedNotes) {
            navigator.clipboard.writeText(formattedNotes).then(() => {
                alert('Notes copied to clipboard!');
            }).catch(err => {
                alert('Failed to copy notes: ' + err);
            });
        } else {
            alert('No notes to copy. Please save notes first.');
        }
    });

    // Reset the notes and formatted output
    document.getElementById('resetButton').addEventListener('click', function() {
        document.getElementById('notes').value = '';
        document.getElementById('formattedNotes').innerText = '';
    });
