document.addEventListener('DOMContentLoaded', function() {
    fetch('commits.json')
        .then(response => response.json())
        .then(commits => {
            const flattenedCommits = commits.flat();
            const commitsContainer = document.getElementById('commits-container');
            flattenedCommits.forEach(commit => {
                const commitElement = document.createElement('div');
                commitElement.className = 'commit';
                commitElement.innerHTML = `
                    <p><strong>Repository:</strong> ${commit.repo}</p>
                    <p><strong>Message:</strong> ${commit.message}</p>
                    <p><strong>Author:</strong> ${commit.author}</p>
                    <p><strong>Date:</strong> ${commit.date}</p>
                `;
                commitsContainer.appendChild(commitElement);
            });
        });
});