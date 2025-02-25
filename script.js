document.addEventListener('DOMContentLoaded', function() {
    // Add dark mode toggle button
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Dark Mode';
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
    document.body.insertBefore(toggleButton, document.body.firstChild);

    fetch('commits.json')
        .then(response => response.json())
        .then(commits => {
            const flattenedCommits = commits.flat();
            flattenedCommits.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date
            const commitsContainer = document.getElementById('commits-container');
            commitsContainer.className = 'commits-grid'; // Add this line
            flattenedCommits.forEach(commit => {
                const commitElement = document.createElement('div');
                commitElement.className = 'commit';
                const commitUrl = `https://github.com/${commit.repo}/commit/${commit.sha}`;
                commitElement.innerHTML = `
                    <p><strong>Repository:</strong> ${commit.repo}</p>
                    <p><strong>Message:</strong> <a href="${commitUrl}" target="_blank">${commit.message}</a></p>
                    <p><strong>Author:</strong> ${commit.author}</p>
                    <p><strong>Date:</strong> ${commit.date}</p>
                `;
                commitsContainer.appendChild(commitElement);
            });
        });
});