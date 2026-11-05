const GITHUB_USERNAME = "joseacr";
const BOOT_MESSAGES = [
    "INITIALIZING JARVIS PROTOCOL...",
    "CONNECTING TO GITHUB NETWORK...",
    "DECRYPTING USER DATA...",
    "SYSTEMS ONLINE.",
    "",
    "WELCOME BACK, SIR."
];

function typeText(element, messages, messageIndex, charIndex) {
    // When all messages are typed, trigger the HUD reveal
    if (messageIndex >= messages.length) {
        setTimeout(endBootSequence, 800);
        return;
    }

    const currentMessage = messages[messageIndex];

    if (charIndex < currentMessage.length) {
        // Type the next character
        element.textContent += currentMessage[charIndex];
        setTimeout(function() {
            typeText(element, messages, messageIndex, charIndex + 1);
        }, 40);
    } else {
        // Move to the next message
        element.textContent += "\n";
        setTimeout(function() {
            typeText(element, messages, messageIndex + 1, 0);
        }, 400);
    }
}
function endBootSequence() {
    const bootOverlay = document.getElementById("boot-overlay");
    const hudContainer = document.getElementById("hud-container");

    // Fade out the boot screen
    bootOverlay.classList.add("fade-out");
    hudContainer.classList.remove("hidden");
    hudContainer.classList.add("visible");

    // Reveal each section with staggered timing
    setTimeout(function() {
        document.querySelector(".hud-header").classList.add("show");
    }, 300);

    setTimeout(function() {
        document.querySelector(".reactor-section").classList.add("show");
    }, 600);

    setTimeout(function() {
        document.getElementById("panel-profile").classList.add("show");
    }, 900);

    setTimeout(function() {
        document.getElementById("panel-stats").classList.add("show");
    }, 1200);

    setTimeout(function() {
        document.getElementById("panel-repos").classList.add("show");
    }, 1500);
}

async function fetchGitHubData() {   
     // Fetch profile data from the GitHub API    
     const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);    
     const userData = await userResponse.json();   
      // Fetch the 6 most recently updated repositories    
    const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);    
    const reposData = await reposResponse.json();    
    return { user: userData, repos: reposData };
     }

function displayProfile(user) {    
    // Set the avatar image source    
    document.getElementById("avatar").src = user.avatar_url;    
    // Set the name, falling back to login if name is null    
    document.getElementById("user-name").textContent = user.name || user.login;   
    document.getElementById("user-bio").textContent = user.bio || "No bio available.";   
    document.getElementById("user-link").href = user.html_url;    
     // Fill in the stats counters    
    document.getElementById("stat-repos").textContent = user.public_repos;
    document.getElementById("stat-followers").textContent = user.followers;    
    document.getElementById("stat-following").textContent = user.following;}
    
    function displayRepos(repos) {    
        const repoList = document.getElementById("repo-list");    
        repoList.innerHTML = "";    // Create a list item for each repository    
        repos.forEach(function(repo) {        
            const li = document.createElement("li");       
             li.innerHTML = `            
             <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name">${repo.name}</a>
            <span class="repo-meta">${repo.language || "N/A"} | ${repo.stargazers_count} stars</span>        
              `;        
             repoList.appendChild(li);   
             });
    }

async function init() {    
    const bootText = document.getElementById("boot-text");
    typeText(bootText, BOOT_MESSAGES, 0, 0);
    try {        // Fetch data then display it        
        const data = await fetchGitHubData();       
         displayProfile(data.user);        
         displayRepos(data.repos);    
    } catch (error) {        
        console.error("Failed to fetch GitHub data:", error);   
 }
}

// Start the application
init();