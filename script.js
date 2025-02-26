document.addEventListener('DOMContentLoaded', function() {
    // Function to set a cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Apply the saved theme on page load
    const savedTheme = getCookie('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Add dark mode toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Dark Mode';
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        // Save the theme preference in a cookie
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        setCookie('theme', theme, 7); // Cookie expires in 7 days
    });
    document.body.insertBefore(toggleButton, document.body.firstChild);

    // Add refresh button
    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Refresh Commits';
    refreshButton.addEventListener('click', () => {
        location.reload(true); // Force reload from server
    });
    document.body.insertBefore(refreshButton, document.getElementById('commits-container'));

    // Add cache-busting to the fetch request
    fetch('commits.json', {
        cache: 'no-store'
    })
        .then(response => response.json())
        .then(commits => {
            const commitsContainer = document.getElementById('commits-container');
            commitsContainer.innerHTML = ''; // Clear any existing content

            if (!Array.isArray(commits) || commits.length === 0) {
                commitsContainer.innerHTML = '<p>No recent commits found.</p>';
                return;
            }

            commits.forEach(commit => {
                const commitElement = document.createElement('div');
                commitElement.className = 'commit';
                commitElement.innerHTML = `
                    <p><strong>Repository:</strong> ${commit.repo}</p>
                    <p><strong>Message:</strong> ${commit.message}</p>
                    <p><strong>Author:</strong> ${commit.author}</p>
                    <p><strong>Date:</strong> ${new Date(commit.date).toLocaleString()}</p>
                `;
                commitsContainer.appendChild(commitElement);
            });
        })
        .catch(error => {
            console.error('Error fetching commits:', error);
            const commitsContainer = document.getElementById('commits-container');
            commitsContainer.innerHTML = '<p>Error loading commits.</p>';
        });
});
