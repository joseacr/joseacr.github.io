const GITHUB_USERNAME = "your GitHub username";

async function fetchGitHubData() {
    // Fetch profile data from the GitHub API
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
    const userData = await userResponse.json();

    // Fetch the 6 most recently updated repositories
    const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
    const reposData = await reposResponse.json();

    return { user: userData, repos: reposData };
}