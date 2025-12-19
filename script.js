
// Dynamic Background Parallax
document.addEventListener('DOMContentLoaded', function() {
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

// Selection Script
document.addEventListener('DOMContentLoaded', function() {
const moodOrb = document.querySelector('.mood-orb');
const moodOptions = document.querySelectorAll('.mood-option');
const pathButtons = document.querySelectorAll('.path-button');
const destinyButton = document.getElementById('destinyButton');
const resultCard = document.getElementById('resultCard');
const selectionSection = document.getElementById('selection');

let selectedMood = 'melancholy';
let selectedPath = 'cinema';

const recommendations = {
'melancholy-cinema': {
title: 'Her',
description: 'A haunting masterpiece exploring love and loneliness in the digital age.',
action: 'Watch Now'
},
'melancholy-literature': {
title: 'Norwegian Wood',
description: 'Murakami\'s tender exploration of memory, loss, and growing up.',
action: 'Read Now'
},
'melancholy-culinary': {
title: 'Comfort Ramen Bowl',
description: 'A soul-warming bowl that brings comfort to rainy afternoons.',
action: 'Cook Now'
},
'high-energy-cinema': {
title: 'Mad Max: Fury Road',
description: 'Pure adrenaline wrapped in stunning cinematography and relentless action.',
action: 'Watch Now'
},
'high-energy-literature': {
title: 'Ready Player One',
description: 'A high-octane adventure through virtual worlds and 80s nostalgia.',
action: 'Read Now'
},
'high-energy-culinary': {
title: 'Spicy Korean Tacos',
description: 'Fusion flavors that pack heat and excitement in every bite.',
action: 'Cook Now'
},
'zen-cinema': {
title: 'Lost in Translation',
description: 'A meditative journey through isolation and unexpected connection.',
action: 'Watch Now'
},
'zen-literature': {
title: 'The Tao of Pooh',
description: 'Ancient wisdom delivered through beloved childhood characters.',
action: 'Read Now'
},
'zen-culinary': {
title: 'Green Tea Ceremony Set',
description: 'Mindful preparation brings peace to your afternoon ritual.',
action: 'Prepare Now'
},
'curious-cinema': {
title: 'Arrival',
description: 'Mind-bending linguistics meets first contact in this cerebral thriller.',
action: 'Watch Now'
},
'curious-literature': {
title: 'Sapiens',
description: 'A fascinating journey through the history of humankind.',
action: 'Read Now'
},
'curious-culinary': {
title: 'Molecular Gastronomy Kit',
description: 'Transform ordinary ingredients into extraordinary culinary experiments.',
action: 'Experiment Now'
},
'thrill-seeker-cinema': {
title: 'Mission: Impossible - Fallout',
description: 'Death-defying stunts and non-stop action that redefines impossible.',
action: 'Watch Now'
},
'thrill-seeker-literature': {
title: 'Gone Girl',
description: 'A psychological thriller that keeps you guessing until the final page.',
action: 'Read Now'
},
'thrill-seeker-culinary': {
title: 'Ghost Pepper Challenge',
description: 'For those brave enough to test their limits with extreme heat.',
action: 'Dare Now'
}
};

// Mood Orb Interaction
if (moodOptions.length > 0 && moodOrb) {
moodOptions.forEach(option => {
option.addEventListener('click', function() {
moodOptions.forEach(opt => opt.classList.remove('active'));
this.classList.add('active');
const mood = this.getAttribute('data-mood');
selectedMood = mood;
  
// Update orb
moodOrb.className = 'mood-orb active ' + mood;
  
// Shift background gradient toward this button
const rect = this.getBoundingClientRect();
const sectionRect = selectionSection.getBoundingClientRect();
const relativeX = ((rect.left + rect.width / 2 - sectionRect.left) / sectionRect.width) * 100;
const relativeY = ((rect.top + rect.height / 2 - sectionRect.top) / sectionRect.height) * 100;
  
// Smoothly shift the gradient
const root = document.documentElement;
root.style.setProperty('--gradient-x', relativeX + '%');
root.style.setProperty('--gradient-y', relativeY + '%');
});
  
option.addEventListener('mouseenter', function() {
if (!this.classList.contains('active')) {
const rect = this.getBoundingClientRect();
const sectionRect = selectionSection.getBoundingClientRect();
const relativeX = ((rect.left + rect.width / 2 - sectionRect.left) / sectionRect.width) * 100;
const relativeY = ((rect.top + rect.height / 2 - sectionRect.top) / sectionRect.height) * 100;
  
const root = document.documentElement;
root.style.setProperty('--gradient-x', relativeX + '%');
root.style.setProperty('--gradient-y', relativeY + '%');
}
});
});
}

pathButtons.forEach(button => {
button.addEventListener('click', function() {
pathButtons.forEach(btn => btn.classList.remove('active'));
this.classList.add('active');
selectedPath = this.querySelector('span').textContent.toLowerCase();
});
});

if (destinyButton && resultCard) {
destinyButton.addEventListener('click', function() {
// Prevent multiple clicks
if (this.classList.contains('calculating')) return;
  
// 1. Enter calculating state
this.classList.add('calculating');
const buttonText = this.querySelector('.button-text');
const calculatingText = this.querySelector('.calculating-text');
const spinner = this.querySelector('.spinner');
  
buttonText.style.display = 'none';
spinner.style.display = 'inline-block';
calculatingText.style.display = 'inline';
  
// 2. Blur other panels
selectionSection.classList.add('calculating-state');
  
// 3. Create light beam
const beam = document.createElement('div');
beam.className = 'light-beam';
document.body.appendChild(beam);
  
// 4. Counter animation
let counter = 0;
const counterInterval = setInterval(() => {
counter += Math.random() * 15;
if (counter > 100) counter = 100;
calculatingText.textContent = `Calculating... ${Math.floor(counter)}%`;
}, 50);
  
// 5. After 1.5 seconds, reveal result
setTimeout(() => {
clearInterval(counterInterval);
  
const key = `${selectedMood}-${selectedPath}`;
const recommendation = recommendations[key] || recommendations['melancholy-cinema'];

resultCard.querySelector('h3').textContent = recommendation.title;
resultCard.querySelector('p').textContent = recommendation.description;
resultCard.querySelector('a').textContent = recommendation.action;

// Remove calculating state
this.classList.remove('calculating');
buttonText.style.display = 'inline';
spinner.style.display = 'none';
calculatingText.style.display = 'none';
calculatingText.textContent = 'Calculating...';
selectionSection.classList.remove('calculating-state');

// Remove beam
setTimeout(() => {
beam.remove();
}, 500);

// Spring animation for result card
resultCard.classList.add('spring-in');
resultCard.style.opacity = '1';
resultCard.style.transform = 'translateY(0)';

resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}, 1500);
}
}

window.resetSelection = function() {
if (resultCard) {
resultCard.style.opacity = '0';
resultCard.style.transform = 'translateY(32px)';
document.getElementById('selection').scrollIntoView({ behavior: 'smooth' });
}
};

const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenuButton && mobileMenu) {
mobileMenuButton.addEventListener('click', function() {
mobileMenu.classList.toggle('hidden');
});
}
});

