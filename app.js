// app.js
document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const ticketNumber = document.getElementById('ticketNumber').value;
    const jiraDomain = 'https://your-jira-domain.atlassian.net';  // Your Jira domain
    const username = 'your-email@example.com';  // Your Jira email (API user)
    const apiToken = 'your-api-token';  // Jira API token
    const url = `${jiraDomain}/rest/api/3/issue/${ticketNumber}`;

    // Reset error and ticket info visibility
    document.getElementById('errorMessage').textContent = '';
    document.getElementById('ticketInfo').style.display = 'none';

    // Fetch ticket information from Jira
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Basic ${btoa(username + ':' + apiToken)}`,
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Ticket not found: ${ticketNumber}`);
        }
        return response.json();
    })
    .then(data => {
        // Display ticket information
        document.getElementById('summary').textContent = data.fields.summary || 'N/A';
        document.getElementById('description').textContent = data.fields.description || 'N/A';
        document.getElementById('status').textContent = data.fields.status.name || 'N/A';
        document.getElementById('assignee').textContent = data.fields.assignee ? data.fields.assignee.displayName : 'Unassigned';
        document.getElementById('reporter').textContent = data.fields.reporter.displayName || 'N/A';
        document.getElementById('resolution').textContent = data.fields.resolution ? data.fields.resolution.name : 'Unresolved';

        document.getElementById('ticketInfo').style.display = 'block';
    })
    .catch(error => {
        document.getElementById('errorMessage').textContent = error.message;
    });
});
