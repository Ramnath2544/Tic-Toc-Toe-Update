# 🌌 NEBULA MATCH: Cosmic Tic-Tac-Toe

<div align="center">

![Version](https://img.shields.io/badge/version-2.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A stunning space-themed Tic-Tac-Toe game with glassmorphism UI, synthesized audio, and customizable cosmic avatars**

[Play Now](#-getting-started) • [Features](#-features) • [Screenshots](#-screenshots) • [Customization](#-customization)

</div>

---

## ✨ Features

### 🎮 **Gameplay**
- **Classic Tic-Tac-Toe** - Battle it out on a 3x3 cosmic grid
- **Animated Victory** - Winning cells pulse with neon glory
- **Smart Detection** - Instant win/draw detection
- **Quick Reset** - Start a new match instantly

### 🎨 **Visual Design**
- **Glassmorphism UI** - Modern frosted glass aesthetic
- **Animated Nebulae** - Dynamic floating background gradients
- **Starfield Layers** - Twinkling cosmic atmosphere
- **Neon Glow Effects** - Cyberpunk-inspired highlights
- **Smooth Animations** - Buttery transitions and hover effects

### 🚀 **Customization**
- **10 Cosmic Avatars** - Choose from rockets, aliens, UFOs, planets, and more
- 🚀 Rocket
- 🛸 UFO
- 👽 Alien
- 👾 Monster
- ☄️ Comet
- 🌟 Star
- 🪐 Planet
- ☀️ Sun
- ❌ Classic X
- ⭕ Classic O

### 🔊 **Audio System**
- **Web Audio API** - Pure synthesized sounds, no external files
- **Unique Sound Effects** - Different tones for X moves, O moves, wins, and draws
- **Volume Control** - Adjustable volume slider (0-100%)
- **Mute Toggle** - Instant on/off switch
- **Live Preview** - Hear the sound when adjusting volume

### 💾 **Persistence**
- **Local Storage** - All settings saved automatically
- **Score Tracking** - Keep track of X wins, O wins, and draws
- **Avatar Memory** - Your chosen symbols persist across sessions
- **Volume Settings** - Your preferred volume is remembered
- **Sound Preferences** - Mute state is preserved

---

## 🖼️ Screenshots

```
┌─────────────────────────────────────┐
│       🌌 NEBULA MATCH 🌌           │
│    Cosmic Tic-Tac-Toe              │
├─────────────────────────────────────┤
│  Avatar Selection                   │
│  [🚀 Rocket] VS [🛸 UFO]           │
├─────────────────────────────────────┤
│  Scoreboard                         │
│  🚀: 3  |  DRAWS: 1  |  🛸: 2      │
├─────────────────────────────────────┤
│         Game Board                  │
│    ┌───┬───┬───┐                   │
│    │ 🚀│ 🛸│ 🚀│                   │
│    ├───┼───┼───┤                   │
│    │ 🛸│ 🚀│   │                   │
│    ├───┼───┼───┤                   │
│    │   │ 🛸│   │                   │
│    └───┴───┴───┘                   │
├─────────────────────────────────────┤
│  [Restart Match] [Clear Scores]     │
└─────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled

### Installation

1. **Clone or Download**
   ```bash
   git clone https://github.com/yourusername/nebula-match.git
   cd nebula-match
   ```

2. **Open in Browser**
   - Simply open `Tic_Toc_Toe.html` in your browser
   - No build process or dependencies required!

3. **Start Playing**
   - Choose your avatars
   - Click any cell to start
   - First to get three in a row wins!

---

## 🎯 How to Play

1. **Select Avatars** 
   - Use the dropdown menus to choose your cosmic symbols
   - Player X goes first (defaults to 🚀)
   - Player O goes second (defaults to 🛸)

2. **Make Your Move**
   - Click any empty cell to place your symbol
   - Alternates between X and O automatically
   - Hear unique sound effects for each move

3. **Win the Game**
   - Get three of your symbols in a row (horizontal, vertical, or diagonal)
   - Winning cells light up with pulsing animation
   - Victory fanfare plays!

4. **Track Your Stats**
   - View wins and draws in the scoreboard
   - Clear scores anytime with the reset button
   - All stats persist between sessions

---

## 🎨 Customization

### Color Scheme
The game uses CSS custom properties for easy theming:

```css
:root {
  --bg-dark: #070913;           /* Deep space background */
  --neon-cyan: #00f3ff;         /* Player X color */
  --neon-magenta: #ff007f;      /* Player O color */
  --neon-purple: #9d4edd;       /* Accent highlights */
  --text-light: #e0e6ed;        /* Primary text */
  --glass-bg: rgba(15, 23, 42, 0.65);
  --glass-border: rgba(255, 255, 255, 0.12);
}
```

### Sound Customization
Modify sound frequencies in `Tic_Toc_Toe.js`:

```javascript
// Example: Change move sound
osc.frequency.setValueAtTime(520, now);  // Starting frequency
osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
```

---

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic structure
- **CSS3** - Glassmorphism, animations, gradients
- **Vanilla JavaScript** - No frameworks or libraries
- **Web Audio API** - Real-time sound synthesis
- **Local Storage API** - Persistent data

### Browser Compatibility
| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |

### Performance
- **Lightweight** - No external dependencies
- **Fast Load** - < 100KB total size
- **Smooth** - 60 FPS animations
- **Efficient** - Minimal CPU/memory usage

---

## 📁 File Structure

```
nebula-match/
│
├── Tic_Toc_Toe.html       # Main HTML structure
├── Tic_Toc_Toe.css        # Glassmorphism styles & animations
├── Tic_Toc_Toe.js         # Game logic & audio engine
└── README.md              # You are here! 📍
```

---

## 🎵 Audio Features

The game features a custom **synthesized audio engine** using the Web Audio API:

### Sound Types
- **Move X** - Rising sine wave (520Hz → 880Hz)
- **Move O** - Falling triangle wave (320Hz → 220Hz)  
- **Victory** - Four-note ascending arpeggio
- **Draw** - Three-note descending melody
- **Reset** - Swooping transition sound

### Volume Control
- Adjustable range: 0% to 100%
- Default: 70%
- Real-time preview when adjusting
- Persisted to localStorage

---

## 🌟 Advanced Features

### State Management
- Pure vanilla JavaScript state
- No external state libraries
- Immutable game board array
- Reactive UI updates

### Accessibility
- ARIA labels on interactive elements
- Keyboard navigable
- High contrast neon colors
- Clear visual feedback

### Responsive Design
- Adapts to all screen sizes
- Mobile-friendly touch targets
- Flexible glassmorphism layout

---

## 🐛 Known Issues

- None! 🎉 (If you find any, please report them)

---

## 🚀 Future Enhancements

- [ ] AI opponent mode
- [ ] Online multiplayer
- [ ] Tournament mode
- [ ] More avatar packs
- [ ] Theme customizer
- [ ] Keyboard shortcuts
- [ ] Game replay system
- [ ] Leaderboard integration

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - feel free to use it for personal or commercial projects!

```
MIT License

Copyright (c) 2024 Nebula Match

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 💖 Acknowledgments

- Inspired by classic Tic-Tac-Toe
- Glassmorphism design trend
- Web Audio API documentation
- The cosmic beauty of nebulae

---

## 📧 Contact

Have questions or suggestions? Feel free to reach out!

- **Email**: ramnath2544@gmail.com

---

<div align="center">

**Made with 💜 and ✨ by passionate developers**

**[⬆ Back to Top](#-nebula-match-cosmic-tic-tac-toe)**

</div>
