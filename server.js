// Stars Between Us – server (Step 1)
// Serves the pages, receives stars from the iPad, sends them to every screen,
// and saves them to data/stars.json so the sky survives a restart.

const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const { Server } = require('socket.io');
const { COLOURS } = require('./config/colours');

const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'stars.json');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// --- Valid colour keys, taken from the config so there is one source of truth ---
// Works whether COLOURS is an array of objects with a "key" or an object keyed by name.
const VALID_KEYS = Array.isArray(COLOURS)
  ? COLOURS.map((c) => c.key)
  : Object.keys(COLOURS);

// --- Stars live in memory and are saved to a JSON file ---
let stars = [];
try {
  stars = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
} catch (e) {
  stars = []; // no file yet = empty sky
}

function saveStars() {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(stars, null, 2));
}

const clamp01 = (n) => Math.min(1, Math.max(0, Number(n)));

// Check incoming data so bad input can never enter the sky.
function cleanStar(input) {
  if (!input || !Array.isArray(input.colours)) return null;
  const colours = input.colours
    .filter((c) => VALID_KEYS.includes(c))
    .slice(0, 4); // a star has at most four colours
  if (colours.length < 1) return null;
  if (isNaN(Number(input.x)) || isNaN(Number(input.y))) return null;
  return {
    id: crypto.randomUUID(),
    colours,
    x: clamp01(input.x),
    y: clamp01(input.y),
    timestamp: Date.now(),
  };
}

// --- Routes ---
app.get('/api/colours', (req, res) => res.json(COLOURS));
app.get('/api/stars', (req, res) => res.json(stars));

// The mouse prototype, kept as a reference. Not the workshop app.
app.use('/reference', express.static(path.join(__dirname, 'reference')));
// The real app (iPad and screen modes will live here).
app.use(express.static(path.join(__dirname, 'public')));

// --- Realtime ---
io.on('connection', (socket) => {
  console.log('client connected', socket.id);
  socket.emit('stars:init', stars); // a new client receives the whole sky

  socket.on('star:add', (data) => {
    const star = cleanStar(data);
    if (!star) return;
    stars.push(star);
    saveStars();
    io.emit('star:added', star); // to everyone, including the sender
  });

  socket.on('disconnect', () => console.log('client disconnected', socket.id));
});

// --- Start, and print the address to open on the iPad ---
server.listen(PORT, '0.0.0.0', () => {
  console.log('Stars Between Us listening on http://localhost:' + PORT);
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const n of nets[name]) {
      if (n.family === 'IPv4' && !n.internal) {
        console.log('On the iPad (same Wi-Fi): http://' + n.address + ':' + PORT);
      }
    }
  }
  console.log('Prototype: http://localhost:' + PORT + '/reference/stars-between-us-portable.html');
});