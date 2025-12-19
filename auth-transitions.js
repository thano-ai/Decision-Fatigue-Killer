// Smooth Page Transitions for Auth Pages
document.addEventListener('DOMContentLoaded', function() {
const overlay = document.querySelector('.page-transition-overlay');
const switchLinks = document.querySelectorAll('.switch-page');
  
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
  
// Handle page transitions with optimized animation
switchLinks.forEach(link => {
link.addEventListener('click', function(e) {
const href = this.getAttribute('href');
if (href && (href.includes('login.html') || href.includes('signup.html'))) {
e.preventDefault();
      
// Use requestAnimationFrame for smoother animation start
requestAnimationFrame(() => {
if (overlay) {
overlay.classList.add('active');
}
});
      
// Navigate after animation completes
setTimeout(() => {
window.location.href = href;
}, 450);
}
});
});
  
// Remove overlay on page load (if coming from another page)
if (overlay) {
setTimeout(() => {
overlay.classList.remove('active');
}, 100);
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

