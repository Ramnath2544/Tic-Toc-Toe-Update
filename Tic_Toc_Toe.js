// --- Selectors ---
const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.js-status');
const resetButton = document.querySelector('.js-reset-button');
const clearScoreButton = document.querySelector('.js-clear-score-button');
const soundToggleBtn = document.querySelector('.js-sound-toggle');
const soundLabel = document.querySelector('.js-sound-label');
const volumeSlider = document.querySelector('.js-volume-slider');
const volumeValue = document.querySelector('.js-volume-value');

const symbolXSelect = document.querySelector('.js-symbol-x');
const symbolOSelect = document.querySelector('.js-symbol-o');
const labelX = document.querySelector('.js-label-x');
const labelO = document.querySelector('.js-label-o');

// --- Custom Symbol List ---
const COSMIC_SYMBOLS = [
  { icon: '🚀', name: 'Rocket' },
  { icon: '🛸', name: 'UFO' },
  { icon: '👽', name: 'Alien' },
  { icon: '👾', name: 'Monster' },
  { icon: '☄️', name: 'Comet' },
  { icon: '🌟', name: 'Star' },
  { icon: '🪐', name: 'Planet' },
  { icon: '☀️', name: 'Sun' },
  { icon: '❌', name: 'Classic X' },
  { icon: '⭕', name: 'Classic O' }
];

// Persistent Custom Avatars State
let playerSymbols = JSON.parse(localStorage.getItem('nebulaPlayerSymbols')) || {
  X: '🚀',
  O: '🛸'
};

// --- Game State ---
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // 'X' or 'O'
let isGameActive = true;
let soundOn = localStorage.getItem('nebulaRpsSound') !== 'off';
let volume = parseInt(localStorage.getItem('nebulaVolume')) || 70; // Default 70%

let score = JSON.parse(localStorage.getItem('ticTacToeScore')) || {
  xWins: 0,
  oWins: 0,
  draws: 0
};

const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]              // Diagonals
];

// --- Audio Synthesizer Engine ---
let audioCtx = null;

function ensureAudio() {
  if (!soundOn) return;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioCtxClass();
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playSynthesizedSound(type) {
  if (!soundOn) return;
  ensureAudio();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;
  const volumeMultiplier = volume / 100; // Convert percentage to 0-1 range

  if (type === 'moveX') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
    gain.gain.setValueAtTime(0.25 * volumeMultiplier, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  } else if (type === 'moveO') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.1);
    gain.gain.setValueAtTime(0.3 * volumeMultiplier, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.11);
  } else if (type === 'win') {
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const startTime = now + idx * 0.08;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.28 * volumeMultiplier, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.22);
    });
  } else if (type === 'draw') {
    [350, 300, 250].forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const startTime = now + idx * 0.1;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.18 * volumeMultiplier, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  } else if (type === 'reset') {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.12);
    gain.gain.setValueAtTime(0.22 * volumeMultiplier, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.13);
  }
}

// --- Setup Avatar Selectors ---
function populateSymbolSelects() {
  symbolXSelect.innerHTML = '';
  symbolOSelect.innerHTML = '';

  COSMIC_SYMBOLS.forEach(sym => {
    const optX = document.createElement('option');
    optX.value = sym.icon;
    optX.textContent = `${sym.icon} ${sym.name}`;
    if (sym.icon === playerSymbols.X) optX.selected = true;
    symbolXSelect.appendChild(optX);

    const optO = document.createElement('option');
    optO.value = sym.icon;
    optO.textContent = `${sym.icon} ${sym.name}`;
    if (sym.icon === playerSymbols.O) optO.selected = true;
    symbolOSelect.appendChild(optO);
  });
}

function updateSymbolLabels() {
  labelX.textContent = `PLAYER ${playerSymbols.X}`;
  labelO.textContent = `PLAYER ${playerSymbols.O}`;
  
  if (isGameActive) {
    statusText.innerText = `Player ${playerSymbols[currentPlayer]}'s Turn`;
  }
}

function handleSymbolChange() {
  const newX = symbolXSelect.value;
  const newO = symbolOSelect.value;

  if (newX === newO) {
    // Avoid identical symbols by auto-shifting the other
    const fallback = COSMIC_SYMBOLS.find(s => s.icon !== newX).icon;
    if (this === symbolXSelect) {
      playerSymbols.O = fallback;
      symbolOSelect.value = fallback;
    } else {
      playerSymbols.X = fallback;
      symbolXSelect.value = fallback;
    }
  } else {
    playerSymbols.X = newX;
    playerSymbols.O = newO;
  }

  localStorage.setItem('nebulaPlayerSymbols', JSON.stringify(playerSymbols));
  updateSymbolLabels();
  refreshBoardIcons();
}

function refreshBoardIcons() {
  cells.forEach((cell, idx) => {
    if (board[idx] !== '') {
      cell.innerText = playerSymbols[board[idx]];
    }
  });
}

// --- Sound Controls ---
function updateSoundUI() {
  soundLabel.textContent = soundOn ? '🔊' : '🔇';
  soundToggleBtn.setAttribute('aria-label', soundOn ? 'Sound On' : 'Sound Off');
}

function updateVolumeUI() {
  volumeSlider.value = volume;
  volumeValue.textContent = `${volume}%`;
}

function handleVolumeChange(event) {
  volume = parseInt(event.target.value);
  localStorage.setItem('nebulaVolume', volume);
  updateVolumeUI();
  
  // Play a preview sound when adjusting volume
  if (soundOn) {
    playSynthesizedSound('moveX');
  }
}

function toggleSound() {
  soundOn = !soundOn;
  localStorage.setItem('nebulaRpsSound', soundOn ? 'on' : 'off');
  updateSoundUI();
  if (soundOn) {
    ensureAudio();
    playSynthesizedSound('moveX');
  }
}

// --- Gameplay Mechanics ---
function updateScoreDisplay() {
  document.querySelector('.js-score-x').innerText = score.xWins;
  document.querySelector('.js-score-o').innerText = score.oWins;
  document.querySelector('.js-score-draws').innerText = score.draws;
}

function handleCellClick(event) {
  const clickedCell = event.currentTarget;
  const cellIndex = parseInt(clickedCell.getAttribute('data-index'), 10);

  if (board[cellIndex] !== '' || !isGameActive) return;

  updateCell(clickedCell, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.innerText = playerSymbols[currentPlayer];
  cell.classList.add(currentPlayer.toLowerCase());
  
  playSynthesizedSound(currentPlayer === 'X' ? 'moveX' : 'moveO');
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.innerText = `Player ${playerSymbols[currentPlayer]}'s Turn`;
  statusText.style.color = currentPlayer === 'X' ? 'var(--neon-cyan)' : 'var(--neon-magenta)';
}

function checkWinner() {
  let winningPattern = null;

  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winningPattern = winningConditions[i];
      break;
    }
  }

  if (winningPattern) {
    statusText.innerText = `🎉 Player ${playerSymbols[currentPlayer]} Wins!`;
    statusText.style.color = currentPlayer === 'X' ? 'var(--neon-cyan)' : 'var(--neon-magenta)';
    isGameActive = false;

    winningPattern.forEach(idx => cells[idx].classList.add('winner'));
    playSynthesizedSound('win');

    if (currentPlayer === 'X') score.xWins++;
    else score.oWins++;

    localStorage.setItem('ticTacToeScore', JSON.stringify(score));
    updateScoreDisplay();
    return;
  }

  const isDraw = !board.includes('');
  if (isDraw) {
    statusText.innerText = 'Cosmic Starlight Draw!';
    statusText.style.color = '#ffd166';
    isGameActive = false;

    playSynthesizedSound('draw');

    score.draws++;
    localStorage.setItem('ticTacToeScore', JSON.stringify(score));
    updateScoreDisplay();
    return;
  }

  changePlayer();
}

function resetGame() {
  playSynthesizedSound('reset');
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameActive = true;
  statusText.innerText = `Player ${playerSymbols.X}'s Turn`;
  statusText.style.color = 'var(--neon-cyan)';

  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('x', 'o', 'winner');
  });
}

function clearScore() {
  playSynthesizedSound('reset');
  score = { xWins: 0, oWins: 0, draws: 0 };
  localStorage.removeItem('ticTacToeScore');
  updateScoreDisplay();
}

// --- Initialize Everything ---
populateSymbolSelects();
updateSymbolLabels();
updateScoreDisplay();
updateSoundUI();
updateVolumeUI();

// --- Listeners ---
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
clearScoreButton.addEventListener('click', clearScore);
soundToggleBtn.addEventListener('click', toggleSound);
volumeSlider.addEventListener('input', handleVolumeChange);

symbolXSelect.addEventListener('change', handleSymbolChange);
symbolOSelect.addEventListener('change', handleSymbolChange);
