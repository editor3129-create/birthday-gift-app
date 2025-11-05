// Personalized interactive script
const surpriseBtn = document.getElementById('surpriseBtn');
const surprise = document.getElementById('surprise');
const playHearts = document.getElementById('playHearts');
const heartsRoot = document.getElementById('hearts');

surpriseBtn.addEventListener('click', ()=>{
  surprise.classList.toggle('hidden');
  // small pulse effect
  surprise.animate([{transform:'scale(0.98)'},{transform:'scale(1)'}],{duration:260,easing:'ease-out'});
});

playHearts.addEventListener('click', ()=>{
  launchHearts(24);
});

function launchHearts(count){
  for(let i=0;i<count;i++){
    createHeart(i);
  }
}

function createHeart(index){
  const el = document.createElement('div');
  el.className = 'heart';
  // alternate heart styles
  const hearts = ['💜','❤️','🖤'];
  el.textContent = hearts[Math.floor(Math.random()*hearts.length)];

  const size = 14 + Math.floor(Math.random()*40);
  el.style.fontSize = size + 'px';
  el.style.left = (Math.random()*100) + '%';
  el.style.top = (60 + Math.random()*40) + '%';
  el.style.opacity = Math.random()*0.9 + 0.2;
  el.style.transform = `translateY(0) rotate(${Math.random()*60-30}deg)`;
  const duration = 5000 + Math.random()*6000;
  el.style.animationDuration = duration + 'ms';
  // allow clicks on the heart itself but not let the whole container block other UI
  el.style.pointerEvents = 'auto';
  
  heartsRoot.appendChild(el);

  // remove after animation
  setTimeout(()=>{
    el.remove();
  }, duration+200);
}

// Handle missing image by replacing it with an inline SVG placeholder
function handleImageError(img) {
  const svg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 400'><rect width='600' height='400' fill='%232b0030'/><text x='50%' y='50%' fill='%23b287ff' font-size='24' text-anchor='middle' dominant-baseline='middle' font-family='Arial, sans-serif'>Image%20not%20found%20—%20click%20Magic%20Flip</text></svg>";
  img.classList.add('placeholder');
  img.src = svg;
  img.style.opacity = 1;
}

// small ambient auto-launch after page load (gentle)
// Sound elements
const flipSound = document.getElementById('flipSound');
const sparkleSound = document.getElementById('sparkleSound');
const heartSound = document.getElementById('heartSound');
const successSound = document.getElementById('successSound');
const clickSound = document.getElementById('clickSound');
const magicSound = document.getElementById('magicSound');
const loveSound = document.getElementById('loveSound');

// Sound control
let isSoundEnabled = false;
let heartSoundIndex = 0;

function playSound(audio, volume = 1) {
    if (isSoundEnabled) {
        audio.currentTime = 0;
        audio.volume = volume;
        audio.play();
    }
}

function playRandomHeartSound() {
    const sounds = [heartSound, clickSound, loveSound];
    heartSoundIndex = (heartSoundIndex + 1) % sounds.length;
    playSound(sounds[heartSoundIndex], 0.6);
}

// Note: love meter feature removed. Heart clicks now trigger sparkles/sounds only.

// Sparkle effect
function createSparkles(count) {
  const sparklesContainer = document.querySelector('.sparkles');
  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.transform = `scale(${Math.random() * 2})`;
    sparklesContainer.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 800);
  }
}

// Card flip functionality
const cardFlip = document.querySelector('.card-flip');
const toggleFlip = document.getElementById('toggleFlip');

toggleFlip.addEventListener('click', () => {
  cardFlip.classList.toggle('flipped');
  createSparkles(15);
  playSound(flipSound);
});

// Click anywhere on the card to flip
cardFlip.addEventListener('click', (e) => {
  if (e.target.closest('.card-flip')) {
    cardFlip.classList.toggle('flipped');
    createSparkles(15);
    playSound(flipSound);
  }
});

// First interaction enables sound
document.body.addEventListener('click', function firstClick() {
    isSoundEnabled = true;
    document.body.removeEventListener('click', firstClick);
    playSound(sparkleSound);
}, { once: true });

// Initialize
window.addEventListener('load', ()=>{
  setTimeout(()=>launchHearts(6), 1500);
  
  // Heart click interactions: create sparkles and play a sound when a heart is clicked
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('heart')) {
      createSparkles(4);
      playRandomHeartSound();
      // remove the clicked heart immediately for a snappy feel
      e.target.remove();
    }
  });
  
  // Make heart elements clickable but keep the container non-blocking so buttons remain clickable
  const heartsContainer = document.getElementById('hearts');
  heartsContainer.style.pointerEvents = 'none';
  
  // Reset image animation on button click
  document.getElementById('playHearts').addEventListener('dblclick', ()=>{
    const image = document.querySelector('.cake-image');
    image.style.animation = 'none';
    image.offsetHeight;
    image.style.animation = 'slideIn 1.2s ease-out forwards';
    createSparkles(10);
  });
});
