// Card Flip Animation for Auth Pages
let flipCard;
let isFlipped = false;

// Global function to flip card - accessible from onclick
window.flipToLogin = function(e) {
console.log('=== flipToLogin CALLED ===', e);
if (e) {
e.preventDefault();
e.stopPropagation();
}
// Make sure flipCard is available
if (!flipCard) {
flipCard = document.getElementById('flipCard');
console.log('flipCard re-initialized:', flipCard);
}
if (flipCard) {
isFlipped = false;
flipCard.classList.remove('flipped');
flipCard.style.transform = 'rotateY(0deg)';
flipCard.offsetHeight; // Force reflow
console.log('Card flipped to login successfully');
} else {
console.error('flipCard is still null!');
}
return false;
};

// Function to flip card
function flipCardTo(showSignup) {
if (!flipCard) return;
console.log('Flipping card to:', showSignup ? 'signup' : 'login');
  
if (showSignup) {
isFlipped = true;
flipCard.classList.add('flipped');
flipCard.style.transform = 'rotateY(180deg)';
// Force reflow to ensure CSS changes apply
flipCard.offsetHeight;
} else {
isFlipped = false;
flipCard.classList.remove('flipped');
flipCard.style.transform = 'rotateY(0deg)';
// Force reflow to ensure CSS changes apply
flipCard.offsetHeight;
}
}

// Initialize flipCard immediately (before DOMContentLoaded)
flipCard = document.getElementById('flipCard');

document.addEventListener('DOMContentLoaded', function() {
console.log('Auth flip script loaded');
  
// Re-initialize to be sure
if (!flipCard) {
flipCard = document.getElementById('flipCard');
}
const flipTriggers = document.querySelectorAll('.flip-trigger');
const flipToLogin = document.querySelector('.flip-to-login');
const flipToSignup = document.querySelector('.flip-to-signup');
isFlipped = false;
  
console.log('Flip card element:', flipCard);
console.log('Flip triggers found:', flipTriggers.length);
console.log('Flip to login:', flipToLogin);
console.log('Flip to signup:', flipToSignup);
  
if (!flipCard) {
console.error('Flip card element not found!');
return;
}
  
// Handle card flip from form links (bottom of forms) - simplified
flipTriggers.forEach((trigger) => {
if (trigger) {
trigger.addEventListener('click', function(e) {
e.preventDefault();
const buttonText = this.textContent.trim().toLowerCase();
const isSignup = buttonText.includes('sign up') || buttonText === 'sign up';
console.log('Flip trigger clicked:', buttonText, '->', isSignup ? 'signup' : 'login');
flipCardTo(isSignup);
return false;
});
}
});
  
// Handle card flip from header buttons
if (flipToLogin) {
console.log('Adding listener to login button');
flipToLogin.addEventListener('click', function(e) {
// Don't prevent if clicking the login link in signup card
const clickedLink = e.target.closest('#loginLinkFromSignup');
if (clickedLink) {
console.log('Ignoring header button click - it was the card link');
return;
}
e.preventDefault();
e.stopPropagation();
console.log('Login button clicked (header)');
flipCardTo(false);
});
} else {
console.warn('Flip to login button not found');
}
  
if (flipToSignup) {
console.log('Adding listener to signup button');
flipToSignup.addEventListener('click', function(e) {
e.preventDefault();
e.stopPropagation();
console.log('Signup button clicked');
flipCardTo(true);
});
} else {
console.warn('Flip to signup button not found');
}

// Direct listener for login link in signup card (simplified - pointer-events CSS handles the rest)
setTimeout(() => {
const loginLinkFromSignup = document.getElementById('loginLinkFromSignup');
if (loginLinkFromSignup) {
console.log('Found login link from signup, adding listener');
loginLinkFromSignup.addEventListener('click', function(e) {
e.preventDefault();
console.log('Login link from signup clicked - flipping to login');
flipCardTo(false);
return false;
});
}
}, 100);
  
// Handle form submissions
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
  
if (loginForm) {
loginForm.addEventListener('submit', function(e) {
e.preventDefault();
// Add your login logic here
console.log('Login submitted');
// Simulate successful login and redirect
setTimeout(() => {
window.location.href = 'index.html';
}, 500);
});
}
  
if (signupForm) {
signupForm.addEventListener('submit', function(e) {
e.preventDefault();
// Add your signup logic here
console.log('Signup submitted');
// Simulate successful signup and redirect
setTimeout(() => {
window.location.href = 'index.html';
}, 500);
});
}
  
// Check URL hash to determine initial state
if (window.location.hash === '#signup') {
isFlipped = true;
if (flipCard) {
// Small delay to ensure smooth initial flip
setTimeout(() => {
flipCard.style.transform = 'rotateY(180deg)';
}, 50);
}
} else {
// Ensure login is shown by default
isFlipped = false;
if (flipCard) {
flipCard.style.transform = 'rotateY(0deg)';
}
}
  
// Add parallax effect to auth pages
const body = document.body;
let mouseX = 0;
let mouseY = 0;
let targetX = 20;
let targetY = 20;
let targetX2 = 80;
let targetY2 = 60;
let targetX3 = 40;
let targetY3 = 80;
  
function updateParallax() {
const root = document.documentElement;
root.style.setProperty('--gradient-x', targetX + '%');
root.style.setProperty('--gradient-y', targetY + '%');
root.style.setProperty('--gradient-x2', targetX2 + '%');
root.style.setProperty('--gradient-y2', targetY2 + '%');
root.style.setProperty('--gradient-x3', targetX3 + '%');
root.style.setProperty('--gradient-y3', targetY3 + '%');
}
  
function handleMouseMove(e) {
mouseX = (e.clientX / window.innerWidth) * 100;
mouseY = (e.clientY / window.innerHeight) * 100;
  
// Move gradients opposite to mouse (subtle parallax effect)
targetX = 20 - (mouseX - 50) * 0.1;
targetY = 20 - (mouseY - 50) * 0.1;
targetX2 = 80 - (mouseX - 50) * 0.15;
targetY2 = 60 - (mouseY - 50) * 0.15;
targetX3 = 40 - (mouseX - 50) * 0.12;
targetY3 = 80 - (mouseY - 50) * 0.12;
  
updateParallax();
}
  
document.addEventListener('mousemove', handleMouseMove);
updateParallax();
});

