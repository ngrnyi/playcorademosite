document.addEventListener('DOMContentLoaded', () => {
    // API Endpoint - REPLACE WITH YOUR ACTUAL API ENDPOINT AFTER DEPLOYMENT
    const API_ENDPOINT = 'https://your-api-id.execute-api.eu-north-1.amazonaws.com/dev';
    
    // Game URLs
    const GAME_URLS = {
        aviator: 'https://ngrnyi.github.io/aviabomber',
        prince: 'http://prince-crash-game.s3-website.eu-north-1.amazonaws.com',
        unityslot: 'https://ngrnyi.github.io/egyptslot',
        verticalslot: 'https://ngrnyi.github.io/antiqueSlot/'
    };

    // Game titles
    const GAME_TITLES = {
        aviator: 'AVIATOR BOMBER',
        prince: 'PRINCE CRASH',
        unityslot: 'UNITY SLOT',
        verticalslot: 'VERTICAL SLOT'
    };

    // DOM elements
    const playButtons = document.querySelectorAll('.play-btn');
    const gameSelection = document.getElementById('gameSelection');
    const gameContainer = document.getElementById('gameContainer');
    const gameFrame = document.getElementById('gameFrame');
    const backButton = document.getElementById('backButton');
    const currentGameTitle = document.getElementById('currentGameTitle');
    const userIndicator = document.getElementById('userIndicator');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const contactButton = document.querySelector('.contact');

    // Current game selection
    let selectedGame = '';
    let currentUser = null;

    // Show game in iframe
    function showGame(game, user = null) {
        // Set the game title
        currentGameTitle.textContent = GAME_TITLES[game] || game.toUpperCase();
        
        // Set user indicator if a user is assigned
        if (user && game === 'aviator') {
            userIndicator.textContent = `Demo User: ${user}`;
            userIndicator.style.display = 'block';
        } else {
            userIndicator.style.display = 'none';
        }
        
        // Build the game URL
        let gameUrl = GAME_URLS[game];
        if (game === 'aviator' && user) {
            gameUrl = `${gameUrl}?userName=${user}`;
        }
        
        // Set the iframe src
        gameFrame.src = gameUrl;
        
        // Hide game selection and show game container
        gameSelection.style.display = 'none';
        gameContainer.style.display = 'flex';
        
        // Show back button
        backButton.style.display = 'block';
    }

    // Randomly assign a demo user
    function getRandomDemoUser() {
        const demoUsers = ['demo1', 'demo2', 'demo3', 'demo4', 'demo5'];
        const randomIndex = Math.floor(Math.random() * demoUsers.length);
        return demoUsers[randomIndex];
    }

    // Handle back button click
    function handleBackButton() {
        // Clear the iframe
        gameFrame.src = 'about:blank';
        
        // Show game selection and hide game container
        gameContainer.style.display = 'none';
        gameSelection.style.display = 'flex';
        
        // Hide back button
        backButton.style.display = 'none';
    }

    // Create contact form popup
    function createContactForm() {
        // Create elements
        const overlay = document.createElement('div');
        overlay.className = 'contact-overlay';
        
        const form = document.createElement('div');
        form.className = 'contact-form';
        
        // Form content
        form.innerHTML = `
            <div class="contact-header">
                <h2>Contact Us</h2>
                <span class="close-contact">&times;</span>
            </div>
            <div class="contact-body">
                <p>For any inquiries, please email us at:</p>
                <a href="mailto:ivan@playcora.com" class="email-link">ivan@playcora.com</a>
                <div class="telegram-contact">
                    <p style="margin-top:2rem; margin-bottom:0.5rem;">Or chat with us on Telegram:</p>
                    <a href="https://t.me/playcora" class="telegram-link" target="_blank" rel="noopener">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style="vertical-align:middle; margin-right:8px;"><path fill="#229ED9" d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.93 7.29l-1.89 8.94c-.14.62-.51.77-1.03.48l-2.86-2.11-1.38 1.33c-.15.15-.28.28-.57.28l.2-2.82 5.13-4.63c.22-.2-.05-.31-.34-.11l-6.34 4-2.73-.85c-.59-.18-.6-.59.12-.87l10.66-4.11c.5-.18.94.12.78.86z"/></svg>
                        <span style="vertical-align:middle; font-weight:bold; color:#229ED9;">@playcora</span>
                    </a>
                </div>
            </div>
        `;
        
        // Add to DOM
        overlay.appendChild(form);
        document.body.appendChild(overlay);
        
        // Add close functionality
        const closeBtn = form.querySelector('.close-contact');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
        
        // Close when clicking outside
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                document.body.removeChild(overlay);
            }
        });
    }

    // Add contact form styles
    function addContactStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .contact-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .contact-form {
                background-color: white;
                border-radius: 5px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                overflow: hidden;
            }
            
            .contact-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background-color: #0a0a3c;
                color: white;
            }
            
            .contact-header h2 {
                margin: 0;
            }
            
            .close-contact {
                font-size: 1.5rem;
                cursor: pointer;
            }
            
            .contact-body {
                padding: 2rem;
                text-align: center;
            }
            
            .email-link {
                display: block;
                margin-top: 1rem;
                font-size: 1.2rem;
                color: #3498db;
                text-decoration: none;
                font-weight: bold;
            }
            
            .email-link:hover {
                text-decoration: underline;
            }
            .telegram-contact {
                margin-top: 1.5rem;
            }
            .telegram-link {
                display: inline-flex;
                align-items: center;
                background:rgb(255, 255, 255);
                color: #fff !important;
                font-weight: bold;
                border-radius: 30px;
                padding: 0.5rem 1.2rem;
                text-decoration: none;
                font-size: 1.1rem;
                transition: background 0.2s;
                margin-top: 0.5rem;
            }
            .telegram-link:hover {
                background: #BFFF0C;
                color: #fff;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize
    function init() {
        // Add contact styles
        addContactStyles();
        
        // Hide back button initially
        backButton.style.display = 'none';
        
        // Add event listeners to play buttons
        playButtons.forEach(button => {
            button.addEventListener('click', () => {
                selectedGame = button.getAttribute('data-game');
                
                if (selectedGame === 'aviator') {
                    // For Aviator, assign a random demo user
                    loadingOverlay.style.display = 'flex';
                    
                    // Simulate a short delay then assign random user
                    setTimeout(() => {
                        const randomUser = getRandomDemoUser();
                        currentUser = randomUser;
                        loadingOverlay.style.display = 'none';
                        showGame(selectedGame, randomUser);
                    }, 1000);
                } else {
                    // For all other games, no user needed
                    showGame(selectedGame);
                }
            });
        });
        
        // Back button event listener
        backButton.addEventListener('click', handleBackButton);
        
        // Contact button event listener
        contactButton.addEventListener('click', createContactForm);
    }

    // Initialize the app
    init();
    
    /*
    // COMMENTED OUT ADVANCED USER MANAGEMENT CODE
    
    // API Functions
    async function fetchAvailableUser() {
        const response = await fetch(`${API_ENDPOINT}/users/available`);
        return await response.json();
    }

    async function assignUser(user) {
        const response = await fetch(`${API_ENDPOINT}/users/assign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        });
        return await response.json();
    }

    async function releaseUser(user) {
        if (!user) return;
        
        await fetch(`${API_ENDPOINT}/users/release`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        });
    }

    async function keepUserSessionAlive(user) {
        if (!user) return;
        
        await fetch(`${API_ENDPOINT}/users/keepAlive`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        });
    }

    // Assign a user
    async function getAndAssignUser() {
        return new Promise(async (resolve, reject) => {
            // Show loading overlay
            loadingOverlay.style.display = 'flex';
            
            try {
                // Get an available user
                const availableUserData = await fetchAvailableUser();
                
                if (availableUserData.availableUser) {
                    // Try to assign the user
                    const assignResult = await assignUser(availableUserData.availableUser);
                    
                    if (assignResult.success) {
                        setTimeout(() => {
                            loadingOverlay.style.display = 'none';
                            resolve(assignResult.user);
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            loadingOverlay.style.display = 'none';
                            reject(new Error('Failed to assign user. Please try again.'));
                        }, 1000);
                    }
                } else {
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                        reject(new Error('All demo users are currently in use. Please try again later.'));
                    }, 1000);
                }
            } catch (error) {
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                    reject(new Error('Error connecting to the server. Please try again.'));
                }, 1000);
            }
        });
    }
    
    let lastActivityTime = Date.now();
    let sessionCheckInterval = null;
    let visibilityPaused = false;
    
    // Record user activity
    function updateActivityTimestamp() {
        lastActivityTime = Date.now();
    }

    // Start session heartbeat to keep user active
    let heartbeatInterval;
    function startSessionHeartbeat(user) {
        // Clear any existing interval
        if (heartbeatInterval) {
            clearInterval(heartbeatInterval);
        }
        
        // Immediately send first keepalive
        keepUserSessionAlive(user).catch(error => {
            console.error('Error keeping session alive:', error);
        });
        
        // Set up new interval
        heartbeatInterval = setInterval(() => {
            // Only send keepalive if the page is visible and we haven't been inactive too long
            if (!visibilityPaused) {
                keepUserSessionAlive(user).catch(error => {
                    console.error('Error keeping session alive:', error);
                });
            }
        }, 60000); // Update every minute
    }

    // Check if user is still active, release if not
    function startSessionCheck() {
        if (sessionCheckInterval) {
            clearInterval(sessionCheckInterval);
        }
        
        sessionCheckInterval = setInterval(() => {
            // If page was hidden for more than 3 minutes or inactive for more than 5, release the user
            const timeSinceActivity = Date.now() - lastActivityTime;
            if (visibilityPaused && timeSinceActivity > 3 * 60 * 1000) {
                releaseCurrentUser();
                stopSessionMonitoring();
            } else if (timeSinceActivity > 5 * 60 * 1000) {
                releaseCurrentUser();
                stopSessionMonitoring();
            }
        }, 30000); // Check every 30 seconds
    }

    // Stop session heartbeat
    function stopSessionHeartbeat() {
        if (heartbeatInterval) {
            clearInterval(heartbeatInterval);
            heartbeatInterval = null;
        }
    }
    
    // Stop session check
    function stopSessionCheck() {
        if (sessionCheckInterval) {
            clearInterval(sessionCheckInterval);
            sessionCheckInterval = null;
        }
    }
    
    // Stop all monitoring
    function stopSessionMonitoring() {
        stopSessionHeartbeat();
        stopSessionCheck();
    }
    
    // Release current user
    function releaseCurrentUser() {
        if (currentUser) {
            releaseUser(currentUser).catch(error => {
                console.error('Error releasing user:', error);
            });
            currentUser = null;
        }
    }

    // Handle visibility change
    function handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden
            visibilityPaused = true;
        } else {
            // Page is visible again
            visibilityPaused = false;
            updateActivityTimestamp();
            
            // If we have a current user, check if they're still assigned
            if (currentUser) {
                // Send a keepalive to refresh the session
                keepUserSessionAlive(currentUser).catch(error => {
                    console.error('Error keeping session alive after visibility change:', error);
                });
            }
        }
    }
    
    // Register user activity events
    function registerActivityEvents() {
        // Track user activity events
        ['mousedown', 'keydown', 'touchstart', 'scroll'].forEach(eventName => {
            document.addEventListener(eventName, updateActivityTimestamp, true);
        });
    }
    */
}); 