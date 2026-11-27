/* ============================================================
   CLICK GLOW — Arena de Monstros
   ============================================================ */

const RARIDADES = [
  // curva de idle: cada raridade vale ~2,2–2,5× a anterior, com preço subindo junto
  { id: 'comum',   nome: 'Comum',   curto: 'C', cor: '#c9d1d9', mult: 1,    preco: 24,  peso: 40 },
  { id: 'incomum', nome: 'Incomum', curto: 'I', cor: '#79bf8b', mult: 2.2,  preco: 60,  peso: 32 },
  { id: 'raro',    nome: 'Raro',    curto: 'R', cor: '#6f9ec4', mult: 5,    preco: 145, peso: 20 },
  { id: 'epico',   nome: 'Épico',   curto: 'E', cor: '#a98bc9', mult: 11,   preco: 350, peso: 8  },
  { id: 'radiante', nome: 'Radiante', curto: 'R', cor: '#d9cde8', mult: 25, preco: 999, peso: 0 }
];

const TIPOS = [
  { slot: 'arma',    nome: 'Lâmina',  emoji: '🗡️', icone: 'plain-dagger.svg',   stat: 'crit',   base: 3 },
  { slot: 'mira',    nome: 'Mira',    emoji: '🎯', icone: 'archery-target.svg', stat: 'acerto', base: 3 },
  { slot: 'amuleto', nome: 'Amuleto', emoji: '📿', icone: 'gold-scarab.svg',    stat: 'crit',   base: 2 },
  { slot: 'luva',    nome: 'Luva',    emoji: '🧤', icone: 'gauntlet.svg', stat: 'acerto', base: 2 },
  { slot: 'talisma', nome: 'Talismã', emoji: '🍀', icone: 'clover.svg',  stat: 'sorte',  base: 3 }
];

const PODERES_LUVA = [
  { id: 'fogo',  nome: 'Fogo',  emoji: '🔥' },
  { id: 'gelo',  nome: 'Gelo',  emoji: '❄️' },
  { id: 'raio',  nome: 'Raio',  emoji: '⚡' }
];

const MONSTROS = [
  ['👾', 'Slime de Bolso'],     ['🦇', 'Morcego Noturno'],  ['🐺', 'Lobo Cinzento'],
  ['🦀', 'Caranguejo Feroz'],   ['🐍', 'Serpente Venenosa'],['🦅', 'Falcão Imperial'],
  ['🐲', 'Dragão Jovem'],      ['👻', 'Fantasma Errante'], ['🦄', 'Unicórnio Caótico'],
  ['🐉', 'Dragão Ancião'],     ['👹', 'Ogro Furioso'],     ['🧟', 'Zumbi Mutante'],
  ['🦖', 'Tiranossauro'],      ['👺', 'Demônio das Sombras'], ['🐙', 'Polvo Cósmico']
];

function identidadeMonstro(emoji, nome = '') {
  if (emoji === '🐲' || emoji === '🐉') return 'dragon';
  if (emoji === '👹' || emoji === '👺') return nome.includes('Ogro') ? 'ogre' : 'demon';
  if (emoji === '👾') return 'slime';
  if (emoji === '🦇') return 'bat';
  if (emoji === '🐺') return 'wolf';
  if (emoji === '🦀') return 'crab';
  if (emoji === '🐍') return 'snake';
  if (emoji === '🦅') return 'hawk';
  if (emoji === '👻') return 'ghost';
  if (emoji === '🐙') return 'cosmic';
  if (emoji === '🦄') return 'unicorn';
  if (emoji === '🧟') return 'zombie';
  if (emoji === '🦖') return 'dinosaur';
  return 'default';
}

const PALETAS = [
  ['#ff2e88', '#7a2ff7', '#00e5ff'],
  ['#ff6b2c', '#ff2e88', '#ffe600'],
  ['#00e5ff', '#0066ff', '#7a2ff7'],
  ['#39ff14', '#00e5a0', '#b6ff00'],
  ['#ffe600', '#ff9d00', '#ff2e88'],
  ['#ff2eff', '#7a2ff7', '#00e5ff'],
  ['#00ffc8', '#00b3ff', '#ff2e88'],
  ['#ff3b3b', '#ff7a00', '#ffe600'],
  ['#c77dff', '#ff2e88', '#00e5ff'],
  ['#ffffff', '#ff2e88', '#7a2ff7']
];
const NOMES_BRILHO = ['COMUM', 'INCOMUM', 'RARO', 'ÉPICO', 'LENDÁRIO'];

// preset ui_engine v2.0
const CONFIG = {
  particleLimit: 150,
  fpsAlvo: 60,
  fadeSlide: 350,
  glassBlur: 18,
  comboParaPoder: 5
};

const el = id => document.getElementById(id);
const pontosEl = el('pontos');
const moedasEl = el('moedas');
const saldoLojaEl = el('saldoLoja');
const rollsEl = el('rolls');
const rollsTopoEl = el('rollsTopo');
const rerolarBtn = el('rerolar');
const nivelEl = el('nivel');
const monstroEl = el('monstro');
const heroi = el('heroi');
const nomeMonstroEl = el('nomeMonstro');
const infoMonstroEl = el('infoMonstro');
const hpBar = el('hpBar');
const hpText = el('hpText');
const progressoEl = el('progresso');
const progressoText = el('progressoText');
const acertoEl = el('acerto');
const critEl = el('crit');
const danoEl = el('dano');
const sorteEl = el('sorte');
const magiaEl = el('magia');
const magiaElementoEl = el('magiaElemento');
const magiaNivelEl = el('magiaNivel');
const magiaDpsEl = el('magiaDps');
const magiaInfoEl = el('magiaInfo');
const magiaCustoEl = el('magiaCusto');
const magiaAtivarBtn = el('magiaAtivar');
const magiaUpgradeBtn = el('magiaUpgrade');
const magiaProgresso = el('magiaProgresso');
const botao = el('botao');
const painel = el('painel');
const arena = el('arena');
const flash = el('flash');
const mensagem = el('mensagem');
const canvas = el('confete');
const ctx = canvas.getContext('2d');
const floaters = el('floaters');

/* ---------- pixel art (desenhada em SVG, sem imagens externas) ---------- */
const PIXEL = {
  heroi: [
    '................',
    '......HHHH......',
    '.....HhhhhH.....',
    '....HhhhhhhH....',
    '...HhhhhhhhhH...',
    '.....ssssss.....',
    '.....seesse.....',
    '.....swwws......',
    '....RrrrrrrR....',
    '...RrrrrrrrrR...',
    '..RrrRggggRrrR..',
    '..RrrRggggRrrR..',
    '..RrrrrrrrrrrR..',
    '...RrrrrrrrrR...',
    '....rrrrrrrr....',
    '....ss....ss....'
  ],
  demonio: [
    '................',
    '..h..........h..',
    '..hh........hh..',
    '...hhD....Dhh...',
    '....DDDDDDDD....',
    '...DDDDDDDDDD...',
    '...DDeDDDDeDD...',
    '...DDbDDDDbDD...',
    '....DDDDDDDD....',
    '.....DmmmmD.....',
    '....DffffffD....',
    '...DDffffffDD...',
    '...DDDDDDDDDD...',
    '....DDDDDDDD....',
    '.....DD..DD.....',
    '.....dd..dd.....'
  ],
  adaga: [
    '.............S..',
    '............Sss.',
    '...........SssS.',
    '..........SssS..',
    '.........SssS...',
    '........SssS....',
    '.......SssS.....',
    '......SssS......',
    '.....SssS.......',
    '....SssS........',
    '...SssS.........',
    '...SggS.........',
    '....ghg.........',
    '....hh..........',
    '....hh..........',
    '................'
  ],
  boss: [
    '..g..g....g..g..',
    '.GGGGGGGGGGGGGG.',
    '..hhDDDDDDDDhh..',
    '..hhDDDDDDDDhh..',
    '...DDDDDDDDDD...',
    '...DDeDDDDeDD...',
    '...DDbDDDDbDD...',
    '....DDDDDDDD....',
    '.....DffffD.....',
    '....DDffffDD....',
    '...DDffffffDD...',
    '...DDDDDDDDDD...',
    '....DDDDDDDD....',
    '.....DD..DD.....',
    '....fDD..DDf....',
    '...ff......ff...'
  ]
};

const CORES_PIXEL = {
  heroi: { h: '#3a1a5c', H: '#6b3fa0', s: '#f4c09a', e: '#1a0b2e', w: '#f2f2f2', r: '#2e5bd6', R: '#5b8cff', g: '#ffd447' },
  demonio: { d: '#7a0b1a', D: '#e01b2e', h: '#f0d6b0', e: '#ffd447', b: '#1a0505', m: '#3a0008', f: '#ff7a00' },
  capetaHeroi: { d: '#1a0524', D: '#8b1bd1', h: '#d9b3ff', e: '#39ff14', b: '#05010a', m: '#2a0040', f: '#ff2eff' },
  adaga: { s: '#b9d4ff', S: '#ffffff', g: '#ffd447', h: '#7a3b1a' },
  boss: { D: '#b00020', d: '#4a0008', h: '#f0d6b0', e: '#ffe600', b: '#0a0000', f: '#ff6a00', g: '#ffd447', G: '#fff3a0' }
};

function pixelSvg(tipo, paleta) {
  const cores = paleta || CORES_PIXEL[tipo];
  let ret = '';
  PIXEL[tipo].forEach((linha, y) => {
    for (let x = 0; x < linha.length; x++) {
      const cor = cores[linha[x]];
      if (cor) ret += `<rect x="${x}" y="${y}" width="1" height="1" fill="${cor}"/>`;
    }
  });
  return `<svg class="pixel" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">${ret}</svg>`;
}

function bossSvg() { return pixelSvg('boss'); }

/* cada monstro da rota vira um sprite pixelado a partir do seu emoji */
const spritesMonstro = new Map();
function spriteMonstro(emoji) {
  if (spritesMonstro.has(emoji)) return spritesMonstro.get(emoji);
  let svg = '';
  try {
    const N = 40;
    const cv = document.createElement('canvas');
    cv.width = cv.height = N;
    const ctx = cv.getContext('2d', { willReadFrequently: true });
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '32px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
    ctx.fillText(emoji, N / 2, N / 2 + 2);
    const d = ctx.getImageData(0, 0, N, N).data;
    let px = '';
    let minX = N, minY = N, maxX = -1, maxY = -1;
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const i = (y * N + x) * 4;
        if (d[i + 3] < 60) continue;
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
        const r = d[i] & 0xF8, g = d[i + 1] & 0xF8, b = d[i + 2] & 0xF8;
        px += `<rect x="${x}" y="${y}" width="1" height="1" fill="rgb(${r},${g},${b})"/>`;
      }
    }
    if (px) {
      const vx = Math.max(0, minX - 1), vy = Math.max(0, minY - 1);
      const vw = maxX - minX + 3, vh = maxY - minY + 3;
      svg = `<svg class="pixel" viewBox="${vx} ${vy} ${vw} ${vh}" shape-rendering="crispEdges" aria-hidden="true">${px}</svg>`;
    }
  } catch (err) { svg = ''; }
  if (!svg) svg = `<span class="pixel-emoji" aria-hidden="true">${emoji}</span>`;
  spritesMonstro.set(emoji, svg);
  return svg;
}

function animarChegadaBoss() {
  monstroEl.classList.remove('chegando');
  void monstroEl.offsetWidth;
  monstroEl.classList.add('chegando');
  setTimeout(() => monstroEl.classList.remove('chegando'), 1450);

  const fala = el('bossFala');
  if (fala) {
    clearInterval(tipadorBoss);
    fala.textContent = '';
    fala.classList.remove('mostrar');
    void fala.offsetWidth;
    fala.classList.add('mostrar');
    const texto = 'SATAN IS MY LORD HAHAHAHA';
    let i = 0;
    tipadorBoss = setInterval(() => {
      fala.textContent = texto.slice(0, ++i);
      if (i >= texto.length) clearInterval(tipadorBoss);
    }, 45);
    setTimeout(() => fala.classList.remove('mostrar'), 4500);
  }
  piscar();
  estourarConfete(170);
  tocarSom('boss');
}

/* ---------- herói com equipamentos visíveis ---------- */
function renderHeroi() {
  const base = modoCapeta ? 'demonio' : 'heroi';
  const mapa = PIXEL[base].map(linha => linha.split(''));
  const cores = Object.assign({}, modoCapeta ? CORES_PIXEL.capetaHeroi : CORES_PIXEL.heroi);

  // Mira: olhos brilham na cor da raridade
  if (equipados.mira) {
    cores.M = equipados.mira.cor;
    for (let x = 0; x < mapa[6].length; x++) if (mapa[6][x] === 'e') mapa[6][x] = 'M';
  }

  // Amuleto: pedra no peito na cor da raridade
  if (equipados.amuleto) {
    cores.A = equipados.amuleto.cor;
    for (const y of [10, 11]) { mapa[y][8] = 'A'; mapa[y][9] = 'A'; }
  }

  // Luva: mãos na cor da raridade
  if (equipados.luva) {
    cores.L = equipados.luva.cor;
    const ultima = mapa.length - 1;
    for (let x = 0; x < mapa[ultima].length; x++) {
      if (mapa[ultima][x] !== '.') mapa[ultima][x] = 'L';
    }
    cores.P = ELEMENTOS[equipados.luva.poder || 'fogo'].cor;
    mapa[14][4] = 'P';
    mapa[14][11] = 'P';
  }

  let ret = '';
  mapa.forEach((linha, y) => {
    linha.forEach((chave, x) => {
      const cor = cores[chave];
      if (cor) ret += `<rect x="${x}" y="${y}" width="1" height="1" fill="${cor}"/>`;
    });
  });

  // Talismã: trevo na mão esquerda, na cor da raridade
  if (equipados.talisma) {
    const cor = equipados.talisma.cor;
    for (const [x, y] of [[1,10],[2,10],[3,10],[2,9],[0,11],[2,11],[4,11],[2,12]]) {
      ret += `<rect x="${x}" y="${y}" width="1" height="1" fill="${cor}"/>`;
    }
  }

  // Lâmina: adaga na mão direita, com guarda na cor da raridade
  if (equipados.arma) {
    const guarda = equipados.arma.cor;
    const pontosDaAdaga = [
      [14, 7, '#ffffff'], [13, 8, '#ffffff'], [14, 8, '#b9d4ff'],
      [13, 9, '#ffffff'], [14, 9, '#b9d4ff'], [12, 10, '#ffffff'],
      [13, 10, '#b9d4ff'], [12, 11, guarda], [13, 11, guarda],
      [13, 12, '#7a3b1a'], [13, 13, '#7a3b1a']
    ];
    for (const [x, y, cor] of pontosDaAdaga) {
      ret += `<rect x="${x}" y="${y}" width="1" height="1" fill="${cor}"/>`;
    }
  }

  heroi.innerHTML = `<svg class="pixel" viewBox="0 0 16 16" shape-rendering="crispEdges" aria-hidden="true">${ret}</svg>`;
}

/* ---------- ícones SVG (Game-icons.net · CC BY 3.0, locais) ---------- */
function ico(item) {
  return `<img class="ico" src="icones/${item.rar}-${item.icone}" alt="${item.emoji}">`;
}

/* ---------- sons sintetizados (sem arquivos externos) ---------- */
let audioCtx = null;
let somAtivo = true;
let volume = .6;
let musicaAtiva = false;
let musicTimer = null;
let masterGain = null;
let musicStep = 0;
const SONS = {
  lancar:  { f: 760,  tipo: 'triangle', d: .12, v: .030, slide: -420 },
  acerto:  { f: 190,  tipo: 'square',   d: .09, v: .045, slide: -90 },
  critico: { f: 900,  tipo: 'sine',     d: .22, v: .055, slide: 320 },
  miss:    { f: 150,  tipo: 'sawtooth', d: .18, v: .028, slide: -70 },
  moeda:   { f: 1200, tipo: 'sine',     d: .18, v: .045, slide: 480 },
  nivel:   { f: 540,  tipo: 'triangle', d: .40, v: .045, slide: 620 },
  reset:   { f: 230,  tipo: 'sawtooth', d: .70, v: .045, slide: -160 },
  fogo:    { f: 320,  tipo: 'sawtooth', d: .45, v: .035, slide: 260 },
  gelo:    { f: 1400, tipo: 'sine',     d: .50, v: .030, slide: -700 },
  raio:    { f: 180,  tipo: 'square',   d: .28, v: .045, slide: 1600 },
  upgrade: { f: 700,  tipo: 'triangle', d: .40, v: .050, slide: 900 },
  boss:    { f: 90,   tipo: 'sawtooth', d: .90, v: .060, slide: -40 },
  compra:  { f: 520,  tipo: 'square',   d: .18, v: .038, slide: 700 },
  frenesi: { f: 300,  tipo: 'sawtooth', d: .55, v: .050, slide: 1200 },
  achiev:  { f: 660,  tipo: 'triangle', d: .50, v: .050, slide: 880 }
};

function obterAudio() {
  audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  if (!masterGain) {
    masterGain = audioCtx.createGain();
    masterGain.gain.value = volume;
    masterGain.connect(audioCtx.destination);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function tocarSom(nome) {
  if (!somAtivo) return;
  try {
    const ctx = obterAudio();
    const s = SONS[nome];
    if (!s) return;
    const agora = ctx.currentTime;
    const osc = ctx.createOscillator();
    const ganho = ctx.createGain();
    osc.connect(ganho);
    ganho.connect(masterGain);
    osc.type = s.tipo;
    osc.frequency.setValueAtTime(s.f, agora);
    osc.frequency.exponentialRampToValueAtTime(Math.max(40, s.f + s.slide), agora + s.d);
    ganho.gain.setValueAtTime(s.v, agora);
    ganho.gain.exponentialRampToValueAtTime(.0001, agora + s.d);
    osc.start(agora);
    osc.stop(agora + s.d);
  } catch (e) { /* navegador sem áudio */ }
}

const NOTAS_MUSICA = [196, 247, 294, 370, 294, 247, 220, 277];
function notaMusica() {
  if (!somAtivo || !musicaAtiva || document.hidden) return;
  try {
    const ctx = obterAudio();
    const agora = ctx.currentTime;
    const osc = ctx.createOscillator();
    const ganho = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = NOTAS_MUSICA[musicStep++ % NOTAS_MUSICA.length];
    ganho.gain.setValueAtTime(.0001, agora);
    ganho.gain.linearRampToValueAtTime(.016, agora + .12);
    ganho.gain.exponentialRampToValueAtTime(.0001, agora + .55);
    osc.connect(ganho);
    ganho.connect(masterGain);
    osc.start(agora);
    osc.stop(agora + .6);
  } catch (e) { /* navegador sem áudio */ }
}
function sincronizarMusica() {
  clearInterval(musicTimer);
  musicTimer = null;
  if (musicaAtiva && !document.hidden) musicTimer = setInterval(notaMusica, 520);
}
function alternarMusica() {
  musicaAtiva = !musicaAtiva;
  sincronizarMusica();
  if (musicaAtiva) notaMusica();
}

let pontos = 0;
let rodada = 1;
let moedas = 0;
let rolls = 3;
let mobNivel = 1;
let hp = 10;
let hpMax = 10;
let bossAtivo = false;
let tipadorBoss = null;
let resetando = false;
let lutaPausada = false;
let jogoIniciado = false;
let provacaoAtiva = false;
let demonioProva = false;
let provaConcluida = false;
let bencaoConcedida = false;
let elementoEscolhido = 'fogo';
let falaTimer = 0;
let modoCapeta = false;
let sequencia = '';
let idItem = 1;
let inventario = [];
let equipados = {};
let loja = [];
// menor raridade que pode aparecer na loja por peça (comprar uma raridade aposenta as menores)
let raridadeMinima = Object.fromEntries(TIPOS.map(t => [t.slot, 0]));
let pedacos = [];

// HUD avançado / progresso
let combo = 0;
let comboMax = 0;
const estatisticas = {
  cliques: 0, acertos: 0, erros: 0, criticos: 0,
  mortes: 0, bosses: 0, moedasGanhas: 0, inicio: Date.now()
};
const CONQUISTAS = [
  { id: 'compra', icone: '🛒', nome: 'Primeira Compra', desc: 'Compre seu primeiro item', test: () => inventario.length >= 1 },
  { id: 'morte', icone: '⚔️', nome: 'Primeira Vitória', desc: 'Derrote um monstro', test: () => estatisticas.mortes >= 1 },
  { id: 'combo', icone: '🔥', nome: 'Combo 10', desc: 'Acerte 10 seguidos', test: () => comboMax >= 10 },
  { id: 'rico', icone: '🪙', nome: 'Cofre Cheio', desc: 'Ganhe 200 moedas', test: () => estatisticas.moedasGanhas >= 200 },
  { id: 'boss', icone: '👑', nome: 'Caçador de Boss', desc: 'Derrote um boss', test: () => estatisticas.bosses >= 1 },
  { id: 'luva', icone: '🧤', nome: 'Poder Desperto', desc: 'Compre uma luva elemental', test: () => !!equipados.luva },
  { id: 'build', icone: '🛡️', nome: 'Build Completa', desc: 'Preencha os 5 slots', test: () => Object.values(equipados).filter(Boolean).length >= 5 },
  { id: 'radiante', icone: '🌈', nome: 'Radiante', desc: 'Forje um item rainbow', test: () => Object.values(equipados).some(i => i?.rar === 'radiante') }
];
const conquistas = new Set();
let qualidade = 'auto';
let baixaQualidade = false;
let movimentoReduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
document.body.classList.toggle('movimento-reduzido', movimentoReduzido);

const ELEMENTOS = {
  fogo:  { nome: 'FOGO',  emoji: '🔥', cor: '#e2733a', cor2: '#e8c25a', mult: 1.25, descricao: 'Queimadura intensa' },
  gelo:  { nome: 'GELO',  emoji: '❄️', cor: '#7fb6cf', cor2: '#6f9ec4', mult: 1.00, descricao: '+5% de acerto' },
  raio:  { nome: 'RAIO',  emoji: '⚡', cor: '#e0c25a', cor2: '#f2f4f7', mult: 1.15, descricao: '+5% de crítico' }
};
let magia = { elemento: 'fogo', nivel: 1, ativada: false, ate: 0, acumulado: 0, ativaAgora: false };

/* ---------- efeitos visuais ---------- */

function ajustarCanvas() { canvas.width = innerWidth; canvas.height = innerHeight; }
ajustarCanvas();
addEventListener('resize', ajustarCanvas);

const estrelas = el('estrelas');
for (let i = 0; i < 36; i++) {
  const s = document.createElement('div');
  s.className = 'estrela';
  s.style.left = Math.random() * 100 + 'vw';
  s.style.bottom = '-10px';
  s.style.animationDuration = (6 + Math.random() * 9) + 's';
  s.style.animationDelay = (-Math.random() * 12) + 's';
  s.style.opacity = .25 + Math.random() * .65;
  estrelas.appendChild(s);
}

function estourarConfete(qtd) {
  const cores = ['#e9edf1', '#c9d1d9', '#dcb878', '#9fb4c7', '#8fbf9a', '#bda9d6'];
  const limite = Math.max(0, CONFIG.particleLimit - pedacos.length);
  for (let i = 0; i < Math.min(qtd, limite); i++) {
    pedacos.push({
      x: innerWidth / 2 + (Math.random() - .5) * 140,
      y: innerHeight / 2 + (Math.random() - .5) * 80,
      vx: (Math.random() - .5) * 19,
      vy: -Math.random() * 17 - 4,
      t: 9 + Math.random() * 9,
      cor: cores[Math.floor(Math.random() * cores.length)],
      tam: 4 + Math.random() * 7,
      rot: Math.random() * Math.PI
    });
  }
}

let framesFps = 0;
let marcaFps = performance.now();
function animarConfete(agora = performance.now()) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!document.hidden) {
    pedacos = pedacos.filter(p => p.t > 0);
    for (const p of pedacos) {
      p.vy += .44; p.x += p.vx; p.y += p.vy; p.rot += .2; p.t -= .4;
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.t / 10);
      ctx.shadowBlur = 0; ctx.fillStyle = p.cor;
      ctx.fillRect(-p.tam / 2, -p.tam / 2, p.tam, p.tam * 1.8);
      ctx.restore();
    }
  }
  // qualidade adaptativa: cai para "média" se o FPS ficar abaixo do alvo
  framesFps++;
  if (agora - marcaFps >= 2000) {
    const fps = framesFps * 1000 / (agora - marcaFps);
    framesFps = 0;
    marcaFps = agora;
    if (qualidade === 'auto' && !movimentoReduzido) {
      const baixo = fps < CONFIG.fpsAlvo * .75;
      if (baixo !== baixaQualidade) {
        baixaQualidade = baixo;
        document.body.classList.toggle('qualidade-baixa', baixo);
      }
    }
  }
  requestAnimationFrame(animarConfete);
}
requestAnimationFrame(animarConfete);

function flutuante(texto, cor, deslocamento = 0) {
  const r = arena.getBoundingClientRect();
  const d = document.createElement('div');
  d.className = 'flutuante';
  d.textContent = texto;
  d.style.color = cor;
  const spread = movimentoReduzido ? 0 : (Math.random() - .5) * 64;
  const vertical = movimentoReduzido ? 0 : (Math.random() - .5) * 26;
  d.style.left = (r.left + r.width / 2 + deslocamento + spread) + 'px';
  d.style.top = (r.top + r.height * .46 + vertical) + 'px';
  floaters.appendChild(d);
  setTimeout(() => d.remove(), 1000);
}

function mostrarMensagem(texto) {
  mensagem.textContent = texto;
  mensagem.classList.remove('mostrar');
  void mensagem.offsetWidth;
  mensagem.classList.add('mostrar');
}

function piscar() {
  flash.classList.remove('ativo');
  void flash.offsetWidth;
  flash.classList.add('ativo');
  painel.classList.remove('explodindo');
  void painel.offsetWidth;
  painel.classList.add('explodindo');
}

function animarMonstro(tipo) {
  monstroEl.classList.remove('acerto', 'erro');
  void monstroEl.offsetWidth;
  monstroEl.classList.add(tipo);
}

/* ---------- preset v2.0: feedback visual, combos, conquistas e painéis ---------- */
function animarNumero(no, valor) {
  if (!no) return;
  const alvo = String(valor);
  if (no.dataset.alvo === alvo) return; // já está animando para este valor
  no.dataset.alvo = alvo;
  const atual = Number(no.dataset.atual ?? no.textContent.replace(/\D/g, '')) || 0;
  if (no.dataset.raf) cancelAnimationFrame(Number(no.dataset.raf));
  if (no.dataset.timer) clearTimeout(Number(no.dataset.timer));
  no.dataset.raf = '';
  no.dataset.timer = '';
  const finalizar = () => {
    if (no.dataset.raf) cancelAnimationFrame(Number(no.dataset.raf));
    no.dataset.raf = '';
    no.dataset.timer = '';
    no.dataset.atual = valor;
    no.textContent = valor;
  };
  if (atual === valor || movimentoReduzido || baixaQualidade) { finalizar(); return; }
  no.classList.remove('moeda-pulso');
  void no.offsetWidth;
  no.classList.add('moeda-pulso');
  const inicio = performance.now();
  const passo = agora => {
    const t = Math.min(1, (agora - inicio) / 350);
    const v = Math.round(atual + (valor - atual) * (1 - Math.pow(1 - t, 3)));
    no.textContent = v;
    no.dataset.atual = v;
    if (t < 1) no.dataset.raf = requestAnimationFrame(passo);
    else finalizar();
  };
  no.dataset.raf = requestAnimationFrame(passo);
  // fallback: rAF pode ser throttled em aba em segundo plano
  no.dataset.timer = setTimeout(finalizar, 420);
}

function atualizarCombo(acerto) {
  combo = acerto ? combo + 1 : 0;
  if (acerto) comboMax = Math.max(comboMax, combo);
  const badge = el('combo');
  if (!badge) return;
  badge.classList.toggle('visivel', combo >= 2);
  el('comboNum').textContent = combo;
  el('comboMult').textContent = 'x' + Math.min(9, 1 + Math.floor(combo / CONFIG.comboParaPoder));
  badge.classList.remove('pulo');
  void badge.offsetWidth;
  badge.classList.add('pulo');
}

function explosaoCompra(x, y) {
  if (movimentoReduzido) return;
  const e = document.createElement('div');
  e.className = 'explosao-compra';
  e.style.left = x + 'px';
  e.style.top = y + 'px';
  floaters.appendChild(e);
  setTimeout(() => e.remove(), 520);
}

let toastTimer = null;
function toastConquista(c) {
  const t = el('achievToast');
  if (!t) return;
  t.innerHTML = `<b>🏆 CONQUISTA DESBLOQUEADA</b><span>${c.icone} ${c.nome} — ${c.desc}</span>`;
  t.classList.add('mostrar');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('mostrar'), 3600);
}

function renderConquistas() {
  const resumo = el('achievResumo');
  if (resumo) {
    const proxima = CONQUISTAS.find(c => !conquistas.has(c.id));
    resumo.textContent = proxima
      ? `Próxima: ${proxima.icone} ${proxima.nome}`
      : 'Todas as conquistas desbloqueadas!';
  }
  const lista = el('achievList');
  if (!lista) return;
  lista.innerHTML = CONQUISTAS.map(c => `
    <div class="achiev${conquistas.has(c.id) ? ' desbloqueada' : ''}" data-achiev="${c.id}" title="${c.desc}">
      <i>${c.icone}</i><div><b>${c.nome}</b><small>${c.desc}</small></div>
    </div>`).join('');
  const total = CONQUISTAS.length;
  el('achievCount').textContent = `${conquistas.size}/${total}`;
  el('achievProgresso').style.width = (conquistas.size / total * 100) + '%';
  const boosts = el('boosts');
  if (boosts) {
    const slots = Object.values(equipados).filter(Boolean).length;
    boosts.innerHTML = [
      `<span class="${magiaAtiva() ? 'ativo' : ''}">🔥 PODER ${magiaAtiva() ? 'ON' : 'OFF'}</span>`,
      `<span class="${equipados.luva ? 'ativo' : ''}">🧤 ${equipados.luva ? ELEMENTOS[equipados.luva.poder].nome : 'SEM LUVA'}</span>`,
      `<span class="${rolls > 0 ? 'ativo' : ''}">🎲 ${rolls} ROLLS</span>`,
      `<span class="${slots >= 5 ? 'ativo' : ''}">🛡️ ${slots}/5 SLOTS</span>`
    ].join('');
  }
}

function verificarConquistas() {
  const novos = [];
  for (const c of CONQUISTAS) {
    if (conquistas.has(c.id)) continue;
    let ok = false;
    try { ok = c.test(); } catch (e) { ok = false; }
    if (!ok) continue;
    conquistas.add(c.id);
    novos.push(c.id);
    toastConquista(c);
    estourarConfete(70);
    tocarSom('achiev');
  }
  renderConquistas();
  for (const id of novos) {
    const no = el('achievList')?.querySelector(`[data-achiev="${id}"]`);
    if (no) no.classList.add('nova');
  }
}

function abrirOverlay(tipo) {
  const overlay = el('overlay');
  if (!overlay || provacaoAtiva) return;
  const titulo = el('overlayTitulo');
  const corpo = el('overlayConteudo');

  if (tipo === 'stats') {
    titulo.textContent = '📊 ESTATÍSTICAS';
    const tempo = Math.floor((Date.now() - estatisticas.inicio) / 1000);
    corpo.innerHTML = `
      <div class="grade-stats">
        <div><span>PONTOS</span><strong>${pontos}</strong></div>
        <div><span>RODADA</span><strong>${rodada}</strong></div>
        <div><span>CLIQUES</span><strong>${estatisticas.cliques}</strong></div>
        <div><span>ACERTOS</span><strong>${estatisticas.acertos}</strong></div>
        <div><span>ERROS</span><strong>${estatisticas.erros}</strong></div>
        <div><span>CRÍTICOS</span><strong>${estatisticas.criticos}</strong></div>
        <div><span>MONSTROS</span><strong>${estatisticas.mortes}</strong></div>
        <div><span>BOSSES</span><strong>${estatisticas.bosses}</strong></div>
        <div><span>COMBO MÁX.</span><strong>${comboMax}</strong></div>
        <div><span>MOEDAS GANHAS</span><strong>${estatisticas.moedasGanhas}</strong></div>
        <div><span>ACERTO / CRIT</span><strong>${taxaAcerto()}% / ${taxaCrit()}%</strong></div>
        <div><span>TEMPO</span><strong>${Math.floor(tempo / 60)}m ${tempo % 60}s</strong></div>
      </div>`;
  } else if (tipo === 'achievements') {
    titulo.textContent = '🏆 CONQUISTAS';
    corpo.innerHTML = CONQUISTAS.map(c => `
      <div class="achiev${conquistas.has(c.id) ? ' desbloqueada' : ''}">
        <i>${c.icone}</i><div><b>${c.nome}</b><small>${c.desc}</small></div>
      </div>`).join('');
  } else if (tipo === 'premium') {
    titulo.textContent = '💎 PREMIUM';
    corpo.innerHTML = `
      <div class="premium-lista">
        <div>✨ <b>Neon Elite</b> — paleta premium nos vidros e nas bordas (já aplicada nesta sessão).</div>
        <div>🎆 <b>Confete de conquista</b> — explosions de glow ao desbloquear troféus (já ativo).</div>
        <div>⚡ <b>Qualidade adaptativa</b> — ajusta partículas e blur conforme o FPS (já ativo).</div>
        <div>🔒 Compras reais não estão conectadas: o progresso é local e gratuito.</div>
      </div>`;
  } else {
    titulo.textContent = '⚙️ CONFIGURAÇÕES';
    corpo.innerHTML = `
      <div class="config-linha"><span>🔊 Volume</span><input type="range" id="volumeSlider" min="0" max="100" value="${Math.round(volume * 100)}"><b id="volumeValor">${Math.round(volume * 100)}%</b></div>
      <div class="config-linha"><span>🎵 Música ambiente</span><button id="musicaToggle">${musicaAtiva ? 'DESLIGAR' : 'LIGAR'}</button></div>
      <div class="config-linha"><span>⚡ Qualidade</span><select id="qualidadeSel">
        <option value="auto"${qualidade === 'auto' ? ' selected' : ''}>AUTO</option>
        <option value="alta"${qualidade === 'alta' ? ' selected' : ''}>ALTA</option>
        <option value="media"${qualidade === 'media' ? ' selected' : ''}>MÉDIA</option>
      </select></div>
      <div class="config-linha"><span>✨ Movimento reduzido</span><button id="movToggle">${movimentoReduzido ? 'DESATIVAR' : 'ATIVAR'}</button></div>`;

    const slider = el('volumeSlider');
    slider.addEventListener('input', e => {
      volume = Number(e.target.value) / 100;
      if (masterGain) masterGain.gain.value = volume;
      el('volumeValor').textContent = e.target.value + '%';
    });
    el('musicaToggle').addEventListener('click', e => {
      alternarMusica();
      e.target.textContent = musicaAtiva ? 'DESLIGAR' : 'LIGAR';
    });
    el('qualidadeSel').addEventListener('change', e => {
      qualidade = e.target.value;
      baixaQualidade = qualidade === 'media';
      document.body.classList.toggle('qualidade-baixa', baixaQualidade);
    });
    el('movToggle').addEventListener('click', e => {
      movimentoReduzido = !movimentoReduzido;
      document.body.classList.toggle('movimento-reduzido', movimentoReduzido);
      e.target.textContent = movimentoReduzido ? 'DESATIVAR' : 'ATIVAR';
    });
  }

  overlay.classList.toggle('sobre-menu', !el('inicio').hidden);
  overlay.hidden = false;
  requestAnimationFrame(() => overlay.classList.add('aberto'));
}

function fecharOverlay() {
  const overlay = el('overlay');
  if (!overlay || overlay.hidden) return;
  overlay.classList.remove('aberto');
  setTimeout(() => {
    overlay.hidden = true;
    overlay.classList.remove('sobre-menu');
  }, CONFIG.fadeSlide);
}

/* ---------- itens ---------- */

function criarItem(tipo, rar, poder = null) {
  const p = PODERES_LUVA.find(x => x.id === poder) || PODERES_LUVA[0];
  return {
    id: idItem++,
    slot: tipo.slot,
    nome: tipo.slot === 'luva' ? `Luva de ${p.nome}` : tipo.nome,
    emoji: tipo.slot === 'luva' ? p.emoji : tipo.emoji,
    icone: tipo.icone,
    stat: tipo.stat,
    poder: tipo.slot === 'luva' ? p.id : null,
    bonus: Math.max(1, Math.round(tipo.base * rar.mult)),
    rar: rar.id,
    rarNome: rar.nome,
    cor: rar.cor,
    preco: rar.preco
  };
}

function sorteTotal() { return 6 + bonusStat('sorte'); }

function pesosRaridade(slot) {
  // a sorte extra (itens) puxa a loja para raridades melhores
  const extra = Math.min(60, Math.max(0, sorteTotal() - 6));
  const pesos = {
    comum:    Math.max(4, 52 - extra * 1.1),
    incomum:  Math.max(14, 30 - extra * .15),
    raro:     14 + extra * .5,
    epico:    4 + extra * .6,
    radiante: 0
  };
  // comprar uma raridade aposenta as inferiores para aquela peça
  const min = slot ? raridadeMinSlot(slot) : 0;
  RARIDADES.forEach((r, i) => { if (i < min) pesos[r.id] = 0; });
  return pesos;
}

function raridadeMinSlot(slot) {
  return raridadeMinima[slot] || 0;
}

// radiante não entra na loja: a fusão continua sendo o único caminho
function indiceRaridade(rar) {
  const n = RARIDADES.findIndex(r => r.id === rar);
  return n < 0 ? 0 : Math.min(n, RARIDADES.findIndex(r => r.id === 'epico'));
}

function registrarRaridade(item) {
  if (!item) return;
  const alvo = indiceRaridade(item.rar);
  if (alvo > raridadeMinSlot(item.slot)) raridadeMinima[item.slot] = alvo;
}

// tira da loja atual os itens daquela peça abaixo da nova raridade mínima
function limparLojaAbaixo(slot) {
  const min = raridadeMinSlot(slot);
  if (!min) return;
  loja = loja.map(i => (i && i.slot === slot && indiceRaridade(i.rar) < min) ? novoItem() : i);
}

function raridadePeso(slot) {
  const pesos = pesosRaridade(slot);
  const total = RARIDADES.reduce((soma, r) => soma + pesos[r.id], 0);
  if (total <= 0) return RARIDADES[raridadeMinSlot(slot)];
  const sorteio = Math.random() * total;
  let acc = 0;
  for (const r of RARIDADES) {
    acc += pesos[r.id];
    if (sorteio <= acc) return r;
  }
  return RARIDADES[raridadeMinSlot(slot)];
}

function tipoAleatorio() { return TIPOS[Math.floor(Math.random() * TIPOS.length)]; }

function novoItem() {
  const tipo = tipoAleatorio();
  const poder = tipo.slot === 'luva'
    ? PODERES_LUVA[Math.floor(Math.random() * PODERES_LUVA.length)].id
    : null;
  return criarItem(tipo, raridadePeso(tipo.slot), poder);
}

// primeira oferta da loja sempre comum (a primeira compra do jogador)
function novoItemComum() {
  const tipo = tipoAleatorio();
  return criarItem(tipo, RARIDADES[0], tipo.slot === 'luva' ? PODERES_LUVA[0].id : null);
}

function bonusStat(stat) {
  return Object.values(equipados)
    .filter(i => i && i.stat === stat)
    .reduce((total, i) => total + i.bonus, 0);
}

// quanto mais forte o jogador, mais forte é o boss
function poderJogador() {
  return Object.values(equipados).filter(Boolean).reduce((soma, i) => soma + i.bonus, 0)
    + (magia.nivel - 1) * 4;
}

function hpDoMonstro() {
  if (demonioProva) return 30;
  return bossAtivo ? Math.min(60, 10 + rodada * 4 + Math.floor(poderJogador() / 3)) : 10;
}

function magiaAtiva() { return Date.now() < magia.ate; }

function poderDaLuva() { return equipados.luva?.poder || 'fogo'; }

function sincronizarMagia() {
  if (magia.ativada) return; // poder travado enquanto o monstro está vivo
  if (!equipados.luva?.poder) return; // sem luva comprada, sem poder
  magia.elemento = poderDaLuva();
  ativarMagia(); // liga sozinho: sem clicar, só atacar
}

function taxaAcerto() {
  const gelo = !provacaoAtiva && magiaAtiva() && magia.elemento === 'gelo' ? 5 : 0;
  const chefe = bossAtivo ? Math.min(14, 4 + Math.floor(poderJogador() / 6)) : 0;
  return Math.min(98, Math.max(25, 92 - (mobNivel - 1) * 4 + bonusStat('acerto') - (modoCapeta ? 8 : 0) + gelo - chefe));
}
function taxaCrit() {
  const raio = !provacaoAtiva && magiaAtiva() && magia.elemento === 'raio' ? 5 : 0;
  return Math.min(85, 5 + bonusStat('crit') + (modoCapeta ? 10 : 0) + raio);
}

function buildRaridade() {
  const itens = Object.values(equipados).filter(Boolean);
  if (!itens.length) return { nome: 'VAZIA', cor: '#c9d1d9' };
  const ordem = RARIDADES.map(r => r.id);
  const pior = itens.reduce((min, i) => {
    const n = ordem.indexOf(i.rar);
    return n < min ? n : min;
  }, ordem.length - 1);
  return RARIDADES[pior];
}

/* ---------- magia escalável (fogo / gelo / raio) ---------- */

function dpsMagia() { return 2 + magia.nivel * 2; }
function custoMagia() { return 40 + magia.nivel * 35; }

function criarEfeitoMagia() {
  document.querySelectorAll('.magia-efeito').forEach(n => n.remove());
  if (!magiaAtiva()) return;
  const a = arena.getBoundingClientRect();
  const m = monstroEl.getBoundingClientRect();
  const e = ELEMENTOS[magia.elemento];
  const caixa = document.createElement('div');
  caixa.className = `magia-efeito ${magia.elemento}`;
  caixa.style.left = (m.left - a.left - 30) + 'px';
  caixa.style.top = (m.top - a.top - 34) + 'px';
  caixa.style.width = (m.width + 60) + 'px';
  caixa.style.height = (m.height + 68) + 'px';
  caixa.style.setProperty('--elem', e.cor);
  caixa.style.setProperty('--elem2', e.cor2);
  const qtd = magia.elemento === 'raio' ? 6 : 14;
  for (let i = 0; i < qtd; i++) {
    const p = document.createElement('span');
    p.className = 'particula';
    p.style.left = (6 + Math.random() * 88) + '%';
    p.style.top = (magia.elemento === 'fogo' ? 72 + Math.random() * 24 : Math.random() * 84) + '%';
    p.style.animationDelay = (Math.random() * .8).toFixed(2) + 's';
    p.style.animationDuration = (.7 + Math.random() * .9).toFixed(2) + 's';
    caixa.appendChild(p);
  }
  arena.appendChild(caixa);
}

function ativarMagia() {
  if (provacaoAtiva || resetando || magia.ativada || hp <= 0) return;
  magia.ativada = true;
  magia.ate = Infinity; // fica ativa até este monstro morrer
  magia.acumulado = 0;
  magia.ativaAgora = true;
  const e = ELEMENTOS[magia.elemento];
  criarEfeitoMagia();
  flutuante(`${e.emoji} ${e.nome} ATIVO!`, e.cor, -110);
  mostrarMensagem(`${e.emoji} ${e.nome} ATIVO!`);
  tocarSom(magia.elemento);
  renderMagia();
  renderHUD();
}

function upgradeMagia() {
  if (provacaoAtiva) return;
  const custo = custoMagia();
  if (moedas < custo) return;
  moedas -= custo;
  magia.nivel++;
  flutuante(`-${custo} 🪙`, '#d98a8a', 90);
  tocarSom('upgrade');
  mostrarMensagem(`MAGIA NÍVEL ${magia.nivel}!`);
  renderTudo();
}

function atualizarMagiaBarra() {
  if (!magiaProgresso) return;
  magiaProgresso.style.width = magia.ativada ? '100%' : '0%';
}

function danoMagicoTick() {
  if (provacaoAtiva) return;
  const agora = Date.now();
  const ativo = agora < magia.ate;
  atualizarMagiaBarra();
  if (!jogoIniciado || lutaPausada) return;

  if (magia.ativaAgora !== ativo) {
    magia.ativaAgora = ativo;
    if (!ativo) {
      document.querySelectorAll('.magia-efeito').forEach(n => n.remove());
      renderHUD();
    }
  }
  if (!ativo || resetando || hp <= 0) return;

  const e = ELEMENTOS[magia.elemento];
  magia.acumulado += dpsMagia() * e.mult * .1;
  const dano = Math.floor(magia.acumulado);
  if (dano < 1) return;
  magia.acumulado -= dano;

  hp = Math.max(0, hp - dano);
  pontos += dano;
  flutuante(`-${dano} ${e.emoji}`, e.cor, 60);
  hpBar.style.width = (hp / hpMax * 100) + '%';
  hpText.textContent = `${hp} / ${hpMax}`;
  pontosEl.classList.remove('pulo');
  void pontosEl.offsetWidth;
  pontosEl.classList.add('pulo');

  if (hp <= 0) matarMonstro(0);
  if (pontos >= 100) { resetarPontos(); return; }
  renderHUD();
  renderBuild();
}

/* ---------- renderização ---------- */

function aplicarTema() {
  const i = Math.min(Math.floor(pontos / 10), 9);
  const [c1, c2, c3] = PALETAS[i];
  const root = document.documentElement.style;
  root.setProperty('--c1', c1);
  root.setProperty('--c2', c2);
  root.setProperty('--c3', c3);
  root.setProperty('--glow', c1);
  root.setProperty('--brilho', (1 + i * .32).toFixed(2));
  nivelEl.textContent = `NÍVEL ${i + 1} · BRILHO ${NOMES_BRILHO[Math.floor(i / 2)]}`;
}

function atualizarMonstro(comAnimacao = false) {
  magia.ativada = false;
  magia.ate = 0;
  magia.acumulado = 0;
  magia.ativaAgora = false;
  hpMax = hpDoMonstro();
  hp = hpMax;

  const fala = el('bossFala');
  if (fala) fala.classList.remove('mostrar');
  clearInterval(tipadorBoss);
  nomeMonstroEl.classList.toggle('chefe', bossAtivo);
  hpBar.parentElement.classList.toggle('chefe', bossAtivo);
  arena.classList.toggle('chefe', bossAtivo);

  if (demonioProva) {
    monstroEl.dataset.monster = 'demon';
    monstroEl.innerHTML = spriteMonstro('😈');
    monstroEl.classList.add('chefe');
    monstroEl.classList.remove('acerto', 'erro');
    nomeMonstroEl.textContent = '😈 BOSS DEMÔNIO — LÚCIFER';
    if (comAnimacao) animarChegadaBoss();
  } else if (bossAtivo) {
    monstroEl.dataset.monster = 'boss';
    monstroEl.innerHTML = bossSvg();
    monstroEl.classList.add('chefe');
    monstroEl.classList.remove('acerto', 'erro');
    nomeMonstroEl.textContent = modoCapeta
      ? `Lúcifer, o Senhor ${rodada}`
      : `👑 BOSS: Senhor das Trevas ${rodada}`;
    if (comAnimacao) animarChegadaBoss();
  } else {
    monstroEl.classList.remove('chefe', 'chegando');
    const indice = (mobNivel - 1) % MONSTROS.length;
    const ciclo = Math.floor((mobNivel - 1) / MONSTROS.length);
    const [emoji, nome] = MONSTROS[indice];
    const sprite = modoCapeta ? '😈' : emoji;
    monstroEl.dataset.monster = modoCapeta ? 'demon' : identidadeMonstro(emoji, nome);
    monstroEl.innerHTML = spriteMonstro(sprite);
    nomeMonstroEl.textContent = modoCapeta
      ? `Lúcifer ${mobNivel}`
      : (ciclo > 0 ? `${nome} +${ciclo}` : nome);
  }

  infoMonstroEl.textContent = demonioProva
    ? `PROVAÇÃO · Boss Demônio · ${hpMax} de vida`
    : `${bossAtivo ? 'BOSS' : 'Monstro'} nível ${mobNivel} · ${hpMax} de vida · ${Math.round(100 - taxaAcerto())}% de erro`;
  hpBar.style.width = '100%';
  hpText.textContent = `${hp} / ${hpMax}`;
  renderRota();
  sincronizarMagia();
}

function nomeDoNivel(n) {
  const [emoji, nome] = MONSTROS[(n - 1) % MONSTROS.length];
  const ciclo = Math.floor((n - 1) / MONSTROS.length);
  if (modoCapeta) return { emoji: '😈', nome: `Lúcifer ${n}` };
  return { emoji, nome: ciclo > 0 ? `${nome} +${ciclo}` : nome };
}

function renderRota() {
  const trilha = el('rotaTrilha');
  if (!trilha) return;
  const nos = [];
  if (demonioProva) {
    nos.push({ emoji: '😈', nome: 'Boss Demônio', rotulo: 'PROVAÇÃO', atual: true, boss: true });
    for (let k = 0; k < 3; k++) {
      const alvo = nomeDoNivel(mobNivel + k);
      nos.push({ emoji: alvo.emoji, nome: alvo.nome, rotulo: 'APÓS A BÊNÇÃO', atual: false, boss: false });
    }
  } else if (bossAtivo) {
    nos.push({ emoji: '👑', nome: modoCapeta ? 'Lúcifer' : 'BOSS', rotulo: 'EM COMBATE', atual: true, boss: true });
    for (let k = 0; k < 3; k++) {
      const n = mobNivel + k;
      const alvo = nomeDoNivel(n);
      nos.push({ emoji: alvo.emoji, nome: alvo.nome, rotulo: `NÍVEL ${n}`, atual: false, boss: false });
    }
  } else {
    for (let k = 0; k < 4; k++) {
      const n = mobNivel + k;
      const alvo = nomeDoNivel(n);
      nos.push({ emoji: alvo.emoji, nome: alvo.nome, rotulo: `NÍVEL ${n}`, atual: k === 0, boss: false });
    }
    nos.push({
      emoji: provacaoAtiva ? '😈' : '👑',
      nome: provacaoAtiva ? 'Boss Demônio' : 'BOSS',
      rotulo: provacaoAtiva ? '100 PTS · PROVAÇÃO' : '100 PTS',
      atual: false, boss: true
    });
  }
  trilha.innerHTML = nos.map(no => `
    <div class="rota-no${no.atual ? ' atual' : ''}${no.boss ? ' chefe-futuro' : ''}">
      <span class="rota-ico">${no.emoji}</span>
      <b>${no.nome}</b>
      <small>${no.rotulo}</small>
    </div>`).join('');
  const info = el('rotaInfo');
  if (info) {
    info.textContent = demonioProva
      ? `PROVAÇÃO — FALTAM ${Math.max(0, hp)} DE DANO PARA VENCER O DEMÔNIO`
      : provacaoAtiva
        ? `PROVAÇÃO — FALTAM ${Math.max(0, 100 - pontos)} PTS PARA O DEMÔNIO`
        : bossAtivo
          ? 'O BOSS ESTÁ NA ARENA'
          : `FALTAM ${Math.max(0, 100 - pontos)} PTS PARA O BOSS`;
  }
}

function atualizarCompras() {
  // mantém os botões sincronizados mesmo quando as moedas mudam sem re-render da loja
  document.querySelectorAll('[data-comprar]').forEach(btn => {
    const item = loja.find(i => i && i.id === Number(btn.dataset.comprar));
    btn.disabled = !item || moedas < item.preco;
    btn.title = item && moedas < item.preco ? `Faltam ${item.preco - moedas} moedas` : '';
    btn.closest('.item')?.classList.toggle('pode-comprar', !btn.disabled);
  });
  if (magiaUpgradeBtn) magiaUpgradeBtn.disabled = provacaoAtiva || moedas < custoMagia();
}

function renderHUD() {
  pontosEl.textContent = pontos;
  animarNumero(moedasEl, moedas);
  animarNumero(saldoLojaEl, moedas);
  animarNumero(el('topMoedas'), moedas);
  const topoNivel = el('topNivel');
  if (topoNivel) topoNivel.textContent = Math.min(Math.floor(pontos / 10) + 1, 10);
  const topoPoder = el('topPoder');
  if (topoPoder) topoPoder.textContent = '1 (+1)';
  if (rollsEl) rollsEl.textContent = rolls;
  if (rollsTopoEl) rollsTopoEl.textContent = rolls;
  if (rerolarBtn) rerolarBtn.disabled = rolls < 1;
  progressoEl.style.width = pontos + '%';
  progressoText.textContent = `${pontos} / 100`;
  const acerto = taxaAcerto();
  acertoEl.textContent = acerto + '%';
  critEl.textContent = taxaCrit() + '%';
  danoEl.textContent = '1 (+1)';
  if (sorteEl) sorteEl.textContent = sorteTotal() + '%';
  if (el('monstrosMortos')) el('monstrosMortos').textContent = estatisticas.mortes;
  if (el('bossesMortos')) el('bossesMortos').textContent = estatisticas.bosses;
  if (el('recordeCombo')) el('recordeCombo').textContent = comboMax;
  renderRota();
  infoMonstroEl.textContent = demonioProva
    ? `PROVAÇÃO · Boss Demônio · ${hpMax} de vida`
    : `${bossAtivo ? 'BOSS' : 'Monstro'} nível ${mobNivel} · ${hpMax} de vida · ${Math.round(100 - acerto)}% de erro`;
  atualizarCompras();
}

function itemHtml(item, acao, extra = '') {
  return `
    <div class="item${item.rar === 'radiante' ? ' radiante' : ''}" style="--raridade:${item.cor}" data-item-id="${item.id}">
      ${ico(item)}
      <div class="info">
        <div class="nome">${item.nome} · ${item.rarNome}</div>
        <div class="detalhe">${item.stat === 'crit' ? 'Crítico' : item.stat === 'sorte' ? 'Sorte' : 'Acerto'} +${item.bonus}%${item.poder ? ' · ' + ELEMENTOS[item.poder].emoji + ' ' + ELEMENTOS[item.poder].nome : ''} ${extra}</div>
      </div>
      <button class="comprar" data-${acao}="${item.id}" ${moedas < item.preco && acao === 'comprar' ? 'disabled' : ''}>
        ${acao === 'comprar' ? `🪙 ${item.preco}` : 'Equipar'}
      </button>
    </div>`;
}

function renderLoja() {
  el('itensLoja').innerHTML = loja.map(i => {
    if (!i) return `
      <div class="item comprado">
        <span class="moeda-grande">🪙</span>
        <div class="info">
          <div class="nome">COMPRADO</div>
          <div class="detalhe">Role a loja para ver outro item</div>
        </div>
        <button class="comprar" disabled>✓</button>
      </div>`;
    return itemHtml(i, 'comprar');
  }).join('');
  atualizarCompras();
}

function renderBuild() {
  el('slots').innerHTML = TIPOS.map(t => {
    const i = equipados[t.slot];
    if (!i) return `
      <div class="slot vazio-slot">
        <div class="slot-topo">${t.slot.toUpperCase()}</div>
        <div class="slot-nome">— vazio —</div>
        <div class="slot-bonus">Compre na loja</div>
      </div>`;
    return `
      <div class="slot${i.rar === 'radiante' ? ' radiante' : ''}" style="--raridade:${i.cor}">
        <div class="slot-topo">${t.slot.toUpperCase()}</div>
        <div class="slot-nome">${ico(i)} ${i.nome}</div>
        <div class="slot-bonus">${i.rarNome} · ${i.stat === 'crit' ? 'Crítico' : i.stat === 'sorte' ? 'Sorte' : 'Acerto'} +${i.bonus}%${i.poder ? ' · ' + ELEMENTOS[i.poder].emoji : ''}</div>
      </div>`;
  }).join('');

  el('raridadeBuild').textContent = 'BUILD ' + buildRaridade().nome.toUpperCase();

  el('inventario').innerHTML = inventario.length
    ? inventario.map(i => {
        const ativo = equipados[i.slot]?.id === i.id ? ' equipado' : '';
        return `<button class="inv-item${ativo}${i.rar === 'radiante' ? ' radiante' : ''}" style="--raridade:${i.cor}" data-equipar="${i.id}"
          title="${i.nome} ${i.rarNome}">${ico(i)} ${i.rarNome[0]} +${i.bonus}${ativo ? ' ✓' : ''}</button>`;
      }).join('')
    : '<span class="vazio">Nenhum item</span>';
}

function renderMagia() {
  if (!magiaEl) return;
  const e = ELEMENTOS[magia.elemento];
  const luva = equipados.luva;
  magiaEl.style.setProperty('--elem', e.cor);
  magiaEl.style.setProperty('--elem2', e.cor2);
  magiaElementoEl.innerHTML = `${e.emoji} ${e.nome}`;
  magiaNivelEl.textContent = 'NÍVEL ' + magia.nivel;
  magiaDpsEl.textContent = luva ? Math.round(dpsMagia() * e.mult) + '/s' : '—/s';
  magiaInfoEl.textContent = luva
    ? `${e.emoji} ${e.nome} · ${e.descricao} · ${luva.nome}${magia.ativada ? ' · ATIVO AUTOMÁTICO' : ''}`
    : 'Compre uma luva na loja para ligar o poder automaticamente';
  magiaCustoEl.textContent = custoMagia();
  magiaAtivarBtn.textContent = magia.ativada
    ? '⚡ ATIVO AUTOMÁTICO'
    : luva ? '⏳ AGUARDANDO MONSTRO' : '⏳ SEM LUVA';
  magiaUpgradeBtn.disabled = provacaoAtiva || moedas < custoMagia();
  magiaUpgradeBtn.title = provacaoAtiva ? 'Disponível após a provação' : '';
  document.querySelectorAll('.elem-btn').forEach(b => {
    b.classList.toggle('ativo', !!luva && b.dataset.poder === magia.elemento);
    b.setAttribute('aria-disabled', String(provacaoAtiva));
  });
  atualizarMagiaBarra();
}

function renderTudo() {
  aplicarTema();
  renderHUD();
  renderLoja();
  renderBuild();
  renderHeroi();
  renderMagia();
  renderConquistas();
}

/* ---------- ações ---------- */

function rerolarLoja() {
  if (provacaoAtiva) return false;
  if (rolls < 1) {
    mostrarMensagem('SEM ROLLS! MATE UM MONSTRO 🎲');
    return false;
  }
  rolls--;
  loja = [novoItem(), novoItem(), novoItem()];
  renderHUD();
  renderLoja();
  return true;
}

function comprar(id) {
  if (provacaoAtiva) return;
  const btn = document.querySelector(`[data-comprar="${id}"]`);
  const r = btn?.getBoundingClientRect();
  const indice = loja.findIndex(i => i && i.id === id);
  if (indice < 0) return;
  const item = loja[indice];
  if (!item || moedas < item.preco) return;

  moedas -= item.preco;
  inventario.push(item);
  const atual = equipados[item.slot];
  if (!atual || item.bonus > atual.bonus) equipados[item.slot] = item;
  loja[indice] = null;
  registrarRaridade(item);
  limparLojaAbaixo(item.slot);
  sincronizarMagia();
  if (r) explosaoCompra(r.left + r.width / 2, r.top + r.height / 2);
  flutuante(`-${item.preco} 🪙`, '#d98a8a', 90);
  tocarSom('compra');
  mostrarMensagem(`${item.rarNome.toUpperCase()} EQUIPADO!`);
  verificarFusao();
  verificarConquistas();
  renderTudo();
}

function equipar(id) {
  if (provacaoAtiva) return;
  const item = inventario.find(i => i.id === id);
  if (!item) return;
  equipados[item.slot] = item;
  flutuante('EQUIPADO!', item.cor, -90);
  sincronizarMagia();
  verificarFusao();
  verificarConquistas();
  renderTudo();
}

/* ---------- fusão: 5 épicos → item radiante rainbow ---------- */
function verificarFusao() {
  const reservas = inventario.filter(i => i.rar === 'epico' && equipados[i.slot]?.id !== i.id);
  if (reservas.length < 5) return;
  const base = reservas.reduce((m, i) => (i.bonus > m.bonus ? i : m), reservas[0]);
  const consumidos = reservas.slice(0, 5);
  inventario = inventario.filter(i => !consumidos.includes(i));

  const tipo = TIPOS.find(t => t.slot === base.slot);
  const novo = criarItem(tipo, RARIDADES.find(r => r.id === 'radiante'), base.poder);
  novo.bonus = Math.round(base.bonus * 2.5);
  novo.preco = 0;
  inventario.push(novo);
  equipados[base.slot] = novo;
  registrarRaridade(novo);
  limparLojaAbaixo(novo.slot);
  sincronizarMagia();

  flutuante('🌈 RADIANTE!', '#d9cde8', -70);
  estourarConfete(240);
  piscar();
  mostrarMensagem('🌈 5 ÉPICOS → RADIANTE!');
  tocarSom('upgrade');
  renderTudo();
}

function lancarAdaga(resultado) {
  const a = arena.getBoundingClientRect();
  const h = heroi.getBoundingClientRect();
  const m = monstroEl.getBoundingClientRect();

  const x0 = h.left - a.left + h.width * .68;
  const y0 = h.top - a.top + h.height * .38;
  const alvoX = m.left - a.left + m.width * .45;
  const alvoY = m.top - a.top + m.height * .48;
  const dx = alvoX - x0;
  const dy = alvoY - y0;
  const erro = !resultado.acerto;

  const adaga = document.createElement('div');
  adaga.className = 'adaga';
  adaga.innerHTML = pixelSvg('adaga');
  adaga.style.left = x0 + 'px';
  adaga.style.top = y0 + 'px';
  arena.appendChild(adaga);

  const voo = adaga.animate([
    { transform: 'translate(0px,0px) rotate(-50deg) scale(.8)', opacity: 0 },
    { transform: `translate(${dx * .5}px, ${dy * .5 - 44}px) rotate(-95deg) scale(1.1)`, opacity: 1, offset: .55 },
    { transform: `translate(${erro ? dx + 80 : dx}px, ${erro ? dy - 100 : dy}px) rotate(-155deg) scale(${erro ? .8 : 1})`, opacity: erro ? 0 : 1 }
  ], { duration: 300, easing: 'ease-in', fill: 'forwards' });

  let resolvido = false;
  const finalizar = () => {
    if (resolvido) return;
    resolvido = true;
    adaga.remove();
    if (!resetando) aplicarImpacto(resultado, alvoX, alvoY);
  };
  voo.onfinish = finalizar;
  setTimeout(finalizar, 340); // garante o impacto mesmo se o navegador atrasar os frames
}

function aplicarImpacto(resultado, x, y) {
  if (lutaPausada) return;
  if (!resultado.acerto) {
    animarMonstro('erro');
    flutuante('MISS!', '#d98a8a');
    tocarSom('miss');
    estatisticas.erros++;
    atualizarCombo(false);
    renderConquistas();
    return;
  }
  estatisticas.acertos++;
  if (resultado.crit) estatisticas.criticos++;
  atualizarCombo(true);
  if (combo % 10 === 0) verificarConquistas();
  tocarSom(resultado.crit ? 'critico' : 'acerto');

  const impacto = document.createElement('div');
  impacto.className = 'impacto';
  impacto.style.left = x + 'px';
  impacto.style.top = y + 'px';
  arena.appendChild(impacto);
  setTimeout(() => impacto.remove(), 500);

  const { crit, ganho } = resultado;
  const antes = Math.floor(pontos / 10);
  pontos += ganho;
  hp = Math.max(0, hp - 1);
  const depois = Math.floor(pontos / 10);

  animarMonstro('acerto');
  flutuante(crit ? `CRÍTICO +${ganho}!` : `+${ganho}`, crit ? '#e0bb74' : '#ffffff');
  estourarConfete(crit ? 16 : 5);
  pontosEl.classList.remove('pulo');
  void pontosEl.offsetWidth;
  pontosEl.classList.add('pulo');

  hpBar.style.width = (hp / hpMax * 100) + '%';
  hpText.textContent = `${hp} / ${hpMax}`;
  aplicarTema();

  if (depois > antes && pontos < 100) {
    piscar();
    estourarConfete(70);
    mostrarMensagem(`NÍVEL ${depois + 1}! MAIS BRILHO ✨`);
    tocarSom('nivel');
  }

  if (hp <= 0) matarMonstro(crit ? 2 : 0);

  if (pontos >= 100) {
    if (provacaoAtiva) {
      pontos = 100;
      if (!demonioProva) { resetarPontos(); return; }
      renderHUD();
      renderBuild();
      return;
    }
    resetarPontos();
    return;
  }
  renderHUD();
  renderBuild();
}

function atacar() {
  if (!jogoIniciado || resetando || lutaPausada) return;
  estatisticas.cliques++;

  botao.classList.remove('clicando');
  void botao.offsetWidth;
  botao.classList.add('clicando');
  setTimeout(() => botao.classList.remove('clicando'), 240);

  const acerto = Math.random() * 100 < taxaAcerto();
  const crit = acerto && Math.random() * 100 < taxaCrit();

  heroi.classList.remove('atirando');
  void heroi.offsetWidth;
  heroi.classList.add('atirando');
  setTimeout(() => heroi.classList.remove('atirando'), 330);

  lancarAdaga({ acerto, crit, ganho: crit ? 2 : 1 });
  tocarSom('lancar');
}

function matarMonstro(bonusMoedas) {
  const eraBoss = bossAtivo;
  const eraProva = provacaoAtiva && demonioProva;
  if (eraProva) {
    resetando = true;
    botao.disabled = true;
    hp = 0;
    hpBar.style.width = '0%';
    hpText.textContent = `0 / ${hpMax}`;
    nomeMonstroEl.textContent = '😈 BOSS DEMÔNIO DERROTADO';
    mostrarMensagem('⚔ PROVAÇÃO SUPERADA — LÚCIFER FOI DERROTADO');
    tocarSom('moeda');
    el('provaAviso').hidden = true;
    document.body.classList.remove('provacao-ativa');
    renderHUD();
    renderRota();
    setTimeout(() => {
      resetando = false;
      botao.disabled = false;
      provacaoAtiva = false;
      demonioProva = false;
      bossAtivo = false;
      provaConcluida = true;
      bencaoConcedida = false;
      el('btnPause').style.display = '';
      mostrarDeus(); // bênção divina só depois da provação
    }, 1500);
    return;
  }
  const recompensa = modoCapeta
    ? 666
    : eraBoss
      ? 40 + rodada * 20 + Math.floor(poderJogador()) + bonusMoedas
      : 8 + mobNivel * 6 + bonusMoedas;
  const ganhoRolls = eraBoss ? 2 : 1;
  moedas += recompensa;
  estatisticas.moedasGanhas += recompensa;
  estatisticas.mortes++;
  if (eraBoss) estatisticas.bosses++;
  rolls += ganhoRolls;
  flutuante(`+${recompensa} 🪙`, '#e0bb74', 100);
  flutuante(`+${ganhoRolls} 🎲`, '#9fb4c7', -100);
  piscar();
  estourarConfete(eraBoss ? 240 : 110);
  mostrarMensagem(eraBoss
    ? `👑 BOSS DERROTADO! +${recompensa} 🪙 +${ganhoRolls} 🎲`
    : `MONSTRO DERROTADO! +${recompensa} 🪙 +1 🎲`);
  tocarSom('moeda');
  if (eraBoss) bossAtivo = false;
  mobNivel++;
  atualizarMonstro();
  verificarConquistas();
  renderHUD();
}

function resetarPontos() {
  resetando = true;
  botao.disabled = true;
  magia.ativada = false;
  magia.ate = 0;
  magia.acumulado = 0;
  magia.ativaAgora = false;
  document.querySelectorAll('.magia-efeito').forEach(n => n.remove());
  renderMagia();
  rolls += 3;
  if (rollsEl) rollsEl.textContent = rolls;
  if (rerolarBtn) rerolarBtn.disabled = false;
  flutuante('+3 🎲', '#cbb7e8', -120);
  piscar();
  estourarConfete(260);
  mostrarMensagem(provacaoAtiva
    ? '100! O BOSS DEMÔNIO DESPERTOU 😈'
    : '100! +3 ROLLS — BOSS CHEGANDO! 👑');
  tocarSom('reset');
  pontosEl.textContent = '100';
  progressoEl.style.width = '100%';
  progressoText.textContent = '100 / 100';
  setTimeout(() => {
    pontos = 0;
    rodada++;
    resetando = false;
    botao.disabled = lutaPausada;
    if (provacaoAtiva) {
      demonioProva = true;
      bossAtivo = true;
      atualizarMonstro(true);
      mostrarMensagem('😈 PROVAÇÃO FINAL — DERROTE O BOSS DEMÔNIO!');
    } else if (!bossAtivo) {
      bossAtivo = true;
      atualizarMonstro(true); // chegada do boss com fala e animação
      mostrarMensagem(`👑 BOSS DA RODADA ${rodada}!`);
    } else {
      sincronizarMagia();
      mostrarMensagem('BOSS AINDA VIVO!');
    }
    renderTudo();
    renderRota();
    estourarConfete(60);
  }, 1500);
}

/* ---------- fase secreta ---------- */

function alternarCapeta() {
  if (provacaoAtiva) return;
  modoCapeta = !modoCapeta;
  document.body.classList.toggle('modo-capeta', modoCapeta);
  atualizarMonstro();
  renderTudo();
  piscar();
  estourarConfete(180);
  mostrarMensagem(modoCapeta ? '😈 FASE SECRETA DO CAPETA 😈' : '⛪ FASE NORMAL RESTAURADA');
  tocarSom('nivel');
}

/* ---------- seringa de frenesi (evento surpresa) ---------- */

const FRENESI_DURACAO = 60000;
const FRENESI_INTERVALO = 650;
const SERINGA_JANELA = 9000;        // rola a chance a cada ~9 s
const SERINGA_CHANCE_BASE = 8;      // % antes da sorte (baixo de propósito)
const SERINGA_CHANCE_MAX = 75;
let frenesi = { ate: 0, autoTimer: 0, tickTimer: 0, restante: 0 };
let seringaTimer = 0;

function frenesiAtivo() { return Date.now() < frenesi.ate; }

/* a sorte dos itens aumenta a chance de a seringa aparecer */
function chanceSeringa() {
  const extra = Math.max(0, sorteTotal() - 6);
  return Math.min(SERINGA_CHANCE_MAX, SERINGA_CHANCE_BASE + extra * 1.2);
}

function svgSeringa() {
  return `<svg viewBox="0 0 64 64" aria-hidden="true">
    <g transform="rotate(-34 32 32)">
      <rect x="50" y="30" width="13" height="4" rx="2" fill="#cfd6df"/>
      <rect x="46" y="26" width="5" height="12" rx="2" fill="#9aa3ad"/>
      <rect x="13" y="22" width="34" height="20" rx="4" fill="#eef1f5" stroke="#8d96a1" stroke-width="2"/>
      <rect x="17" y="26" width="17" height="12" rx="2" fill="var(--c1, #7fd6c2)"/>
      <path d="M25 22v6M30 22v4M35 22v6M40 22v4" stroke="#8d96a1" stroke-width="1.6" stroke-linecap="round"/>
      <rect x="6" y="26" width="8" height="12" rx="2" fill="#9aa3ad"/>
      <rect x="1" y="29" width="6" height="6" rx="2" fill="#b6bec8"/>
    </g>
  </svg>`;
}

function agendarSeringa() {
  clearTimeout(seringaTimer);
  seringaTimer = setTimeout(rolarSeringa, SERINGA_JANELA + Math.random() * 2000);
}

function rolarSeringa() {
  if (!jogoIniciado || provacaoAtiva || document.hidden || lutaPausada || frenesiAtivo() || document.querySelector('.seringa')) {
    agendarSeringa();
    return;
  }
  if (Math.random() * 100 < chanceSeringa()) criarSeringa();
  else agendarSeringa();
}

/* voo rápido com trajetória sorteada a cada seringa */
function voarSeringa(btn) {
  const W = innerWidth, H = innerHeight;
  const dir = Math.random() < .5 ? 1 : -1;
  const x0 = dir > 0 ? -0.14 : 1.14;
  const x1 = dir > 0 ? 1.14 : -0.14;
  const y0 = .13 + Math.random() * .62;
  const y1 = .13 + Math.random() * .62;
  const amp = (.05 + Math.random() * .13) * H * (Math.random() < .5 ? -1 : 1);
  const dur = 3000 + Math.random() * 2200;
  const r0 = -30 + Math.random() * 60;
  const r1 = -30 + Math.random() * 60;
  const px = t => `${((x0 + (x1 - x0) * t) * W).toFixed(1)}px`;
  const frames = [
    { transform: `translate(${px(0)}, ${(y0 * H).toFixed(1)}px) rotate(${r0.toFixed(1)}deg)`, offset: 0 },
    { transform: `translate(${px(.33)}, ${((y0 + (y1 - y0) * .33) * H + amp).toFixed(1)}px) rotate(${(r0 + 18).toFixed(1)}deg)`, offset: .33 },
    { transform: `translate(${px(.67)}, ${((y0 + (y1 - y0) * .67) * H - amp * .75).toFixed(1)}px) rotate(${(r1 - 14).toFixed(1)}deg)`, offset: .67 },
    { transform: `translate(${px(1)}, ${(y1 * H).toFixed(1)}px) rotate(${r1.toFixed(1)}deg)`, offset: 1 }
  ];
  btn._voo = btn.animate(frames, { duration: dur, easing: 'linear', fill: 'forwards' });
  btn.dataset.dur = Math.round(dur);
  return dur;
}

function criarSeringa() {
  const caixa = el('eventos');
  if (!caixa || !jogoIniciado || provacaoAtiva || document.hidden || lutaPausada || frenesiAtivo() || document.querySelector('.seringa')) return false;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'seringa';
  btn.title = 'Pegue a seringa!';
  btn.setAttribute('aria-label', 'Seringa de frenesi — clique para capturar');
  btn.innerHTML = `<span class="seringa-corpo">${svgSeringa()}</span><span class="seringa-dica">💉 FRENESI</span>`;

  let dur = 0;
  if (movimentoReduzido) {
    btn.classList.add('parada');
    btn.style.left = '50%';
    btn.style.top = '42%';
    btn.style.transform = 'translate(-50%,-50%)';
  } else {
    dur = voarSeringa(btn);
  }

  caixa.appendChild(btn);
  btn.addEventListener('click', e => {
    e.stopPropagation();
    capturarSeringa(btn);
  });

  const saiu = () => {
    if (!btn.isConnected) return;
    btn.remove();
    agendarSeringa();
  };
  if (movimentoReduzido) setTimeout(saiu, 9000);
  else setTimeout(saiu, Math.round(dur) + 200);
  return true;
}

function capturarSeringa(btn) {
  if (!btn || btn.dataset.pega) return;
  btn.dataset.pega = '1';
  btn.classList.add('capturada');
  btn.disabled = true;
  const r = btn.getBoundingClientRect();
  explosaoCompra(r.left + r.width / 2, r.top + r.height / 2);
  estourarConfete(80);
  flutuante('💉 FRENESI!', '#7fd6c2', 120);
  tocarSom('frenesi');
  ativarFrenesi();
  setTimeout(() => btn.remove(), 280);
}

function iniciarTimersFrenesi() {
  clearInterval(frenesi.tickTimer);
  frenesi.tickTimer = setInterval(atualizarFrenesiUI, 200);
  clearInterval(frenesi.autoTimer);
  frenesi.autoTimer = setInterval(() => {
    if (!frenesiAtivo()) { encerrarFrenesi(); return; }
    if (document.hidden || lutaPausada || resetando || !el('overlay').hidden) return;
    atacar();
  }, FRENESI_INTERVALO);
}

function ativarFrenesi() {
  frenesi.ate = Date.now() + FRENESI_DURACAO;
  frenesi.restante = 0;
  document.body.classList.add('frenesi');
  atualizarFrenesiUI();
  iniciarTimersFrenesi();
  mostrarMensagem('💉 FRENESI! ATAQUES AUTOMÁTICOS POR 60s');
  tocarSom('nivel');
}

/* a pausa congela a contagem do frenesi em vez de gastá-la */
function pausarFrenesi() {
  if (!frenesiAtivo()) return;
  frenesi.restante = Math.max(0, frenesi.ate - Date.now());
  frenesi.ate = 0;
  clearInterval(frenesi.autoTimer); frenesi.autoTimer = 0;
  clearInterval(frenesi.tickTimer); frenesi.tickTimer = 0;
  document.body.classList.remove('frenesi');
  const badge = el('frenesiBadge');
  if (badge) badge.hidden = true;
}

function retomarFrenesi() {
  if (!frenesi.restante) return;
  const resta = frenesi.restante;
  frenesi.restante = 0;
  frenesi.ate = Date.now() + resta;
  document.body.classList.add('frenesi');
  atualizarFrenesiUI();
  iniciarTimersFrenesi();
}

function atualizarFrenesiUI() {
  if (lutaPausada) return;
  const badge = el('frenesiBadge');
  const tempo = el('frenesiTempo');
  const resta = frenesi.ate - Date.now();
  if (resta <= 0) { encerrarFrenesi(); return; }
  if (badge) badge.hidden = false;
  if (tempo) tempo.textContent = Math.ceil(resta / 1000);
}

function encerrarFrenesi() {
  const estava = frenesi.ate > 0;
  frenesi.ate = 0;
  frenesi.restante = 0;
  clearInterval(frenesi.autoTimer); frenesi.autoTimer = 0;
  clearInterval(frenesi.tickTimer); frenesi.tickTimer = 0;
  document.body.classList.remove('frenesi');
  const badge = el('frenesiBadge');
  if (badge) badge.hidden = true;
  if (estava) mostrarMensagem('FRENESI ACABOU — A SERINGA VOLTA POR AÍ');
  agendarSeringa();
}

/* ---------- pausa da luta (a loja continua funcionando) ---------- */

function alternarPausa(forcar) {
  if (provacaoAtiva) return;
  const alvo = typeof forcar === 'boolean' ? forcar : !lutaPausada;
  if (alvo === lutaPausada) return;
  lutaPausada = alvo;

  const btn = el('btnPause');
  if (btn) {
    btn.classList.toggle('ativo', lutaPausada);
    btn.textContent = lutaPausada ? '▶' : '⏸';
    btn.title = lutaPausada ? 'Retomar a luta (P)' : 'Pausar a luta — a loja continua (P)';
    btn.setAttribute('aria-pressed', String(lutaPausada));
  }
  const badge = el('pausaBadge');
  if (badge) badge.hidden = !lutaPausada;
  document.body.classList.toggle('luta-pausada', lutaPausada);
  botao.disabled = lutaPausada || resetando;

  if (lutaPausada) {
    pausarFrenesi();
    clearTimeout(seringaTimer); seringaTimer = 0;
    document.querySelectorAll('.seringa, .adaga').forEach(n => n.remove());
    mostrarMensagem('⏸ LUTA PAUSADA — A LOJA CONTINUA ABERTA');
  } else {
    retomarFrenesi();
    if (!frenesiAtivo()) agendarSeringa();
    mostrarMensagem('▶ LUTA RETOMADA!');
  }
  tocarSom('nivel');
}

/* ---------- início: menu e escolha divina ---------- */

const FALAS_DEUS = {
  fogo: 'Que o fogo queime seus inimigos e ilumine sua lâmina.',
  gelo: 'Que o gelo acalme sua mira e endureça seu golpe.',
  raio: 'Que o raio acelere seu braço e chame o crítico.'
};

function passoInicio(passo) {
  const menu = el('inicioMenu');
  const deus = el('deusPasso');
  const bencao = el('deusBencao');
  const pausa = el('menuPausa');
  const tela = el('inicio');
  const falandoComDeus = passo === 'deus' || passo === 'bencao';
  if (menu) menu.hidden = passo !== 'menu';
  if (deus) deus.hidden = passo !== 'deus';
  if (bencao) bencao.hidden = passo !== 'bencao';
  if (pausa) pausa.hidden = passo !== 'pausa';
  if (tela) tela.classList.toggle('divino', falandoComDeus);
  document.body.classList.toggle('falando-com-deus', falandoComDeus);
  document.body.classList.toggle('provacao-ativa', !!provacaoAtiva);
}

function abrirInicio() {
  clearInterval(falaTimer);
  falaTimer = 0;
  document.body.classList.add('pre-jogo');
  const tela = el('inicio');
  if (!tela) return;
  tela.hidden = false;
  passoInicio('menu');
  [el('deusFala'), el('bencaoFala')].forEach(f => {
    if (!f) return;
    f.textContent = '';
    f.classList.remove('digitando');
  });
}

/* menu da partida: pausa a luta, guarda o progresso e mostra as conquistas */
let menuPausouLuta = false;

function abrirMenuPausa() {
  if (!jogoIniciado || provacaoAtiva || resetando) return;
  const tela = el('inicio');
  if (!tela || !tela.hidden) return;
  if (!el('overlay').hidden) fecharOverlay();
  menuPausouLuta = !lutaPausada;
  alternarPausa(true);
  renderMenuPausa();
  tela.hidden = false;
  document.body.classList.add('pre-jogo');
  passoInicio('pausa');
  tocarSom('nivel');
}

function fecharMenuPausa() {
  const tela = el('inicio');
  if (!tela || tela.hidden) return;
  tela.hidden = true;
  document.body.classList.remove('pre-jogo', 'falando-com-deus');
  passoInicio('menu');
  if (menuPausouLuta && lutaPausada) alternarPausa(false);
  menuPausouLuta = false;
}

function renderMenuPausa() {
  const total = CONQUISTAS.length || 1;
  if (el('menuRodada')) el('menuRodada').textContent = rodada;
  if (el('menuMoedas')) el('menuMoedas').textContent = moedas;
  if (el('menuConquistas')) el('menuConquistas').textContent = `${conquistas.size}/${CONQUISTAS.length}`;
  const barra = el('menuAchievProgresso');
  if (barra) barra.style.width = (conquistas.size / total * 100) + '%';
  const lista = el('menuAchievList');
  if (lista) {
    lista.innerHTML = CONQUISTAS.map(c => `
      <div class="achiev${conquistas.has(c.id) ? ' desbloqueada' : ''}">
        <i>${c.icone}</i><div><b>${c.nome}</b><small>${c.desc}</small></div>
      </div>`).join('');
  }
}

function escreverFala(alvo, texto, aoTerminar) {
  if (!alvo) { if (aoTerminar) aoTerminar(); return; }
  clearInterval(falaTimer);
  alvo.textContent = '';
  alvo.classList.add('digitando');
  let i = 0;
  falaTimer = setInterval(() => {
    i++;
    alvo.textContent = texto.slice(0, i);
    if (i >= texto.length) {
      clearInterval(falaTimer);
      falaTimer = 0;
      alvo.classList.remove('digitando');
      if (aoTerminar) aoTerminar();
    }
  }, 24);
}

function mostrarDeus() {
  // A bênção só existe depois da provação: derrotar o Boss Demônio.
  if (!provaConcluida || bencaoConcedida) return;
  const tela = el('inicio');
  if (!tela) return;

  tela.hidden = false;
  document.body.classList.add('pre-jogo');
  passoInicio('deus');
  tocarSom('nivel');
  escreverFala(
    el('deusFala'),
    'Você enfrentou a escuridão e venceu. Agora, escolha o elemento que guiará sua mão.'
  );
  document.querySelectorAll('#deusPasso .deus-opt').forEach(b => {
    b.disabled = false;
    b.classList.remove('escolhido');
  });
}

function concederLuva(id) {
  const tipo = TIPOS.find(t => t.slot === 'luva');
  const luva = criarItem(tipo, RARIDADES[0], id);
  luva.preco = 0;
  inventario.push(luva);
  equipados.luva = luva;
  registrarRaridade(luva);
  elementoEscolhido = id;
}

function escolherElemento(id) {
  if (!provaConcluida || bencaoConcedida) return;
  const passo = el('deusPasso');
  if (!ELEMENTOS[id] || !passo || passo.hidden) return;
  document.querySelectorAll('#deusPasso .deus-opt').forEach(b => {
    b.disabled = true;
    b.classList.toggle('escolhido', b.dataset.elemento === id);
  });
  concederLuva(id);
  const e = ELEMENTOS[id];
  const simbolo = el('bencaoSimbolo');
  if (simbolo) simbolo.textContent = e.emoji;
  passoInicio('bencao');
  escreverFala(el('bencaoFala'), FALAS_DEUS[id], () => setTimeout(concluirBencao, 700));
  tocarSom('upgrade');
}

function iniciarJogo() {
  if (jogoIniciado) return;
  jogoIniciado = true;
  provacaoAtiva = true;
  demonioProva = false;
  provaConcluida = false;
  bencaoConcedida = false;
  bossAtivo = false;
  pontos = 0;
  mobNivel = 1;
  clearInterval(falaTimer);
  falaTimer = 0;
  const tela = el('inicio');
  if (tela) tela.hidden = true;
  document.body.classList.remove('pre-jogo');
  document.body.classList.add('provacao-ativa');

  // durante a provação só o clique funciona
  el('provaAviso').hidden = false;
  el('btnPause').style.display = 'none';

  atualizarMonstro(true);
  renderTudo();
  renderRota();
  mostrarMensagem('⚔ PROVAÇÃO INICIADA! SÓ O CLIQUE PODE LHE AJUDAR.');
  tocarSom('nivel');
}

// chamado quando a bênção termina de ser digitada
function concluirBencao() {
  clearInterval(falaTimer);
  falaTimer = 0;
  const tela = el('inicio');
  if (tela) tela.hidden = true;
  document.body.classList.remove('pre-jogo', 'falando-com-deus', 'provacao-ativa');

  provacaoAtiva = false;
  demonioProva = false;
  provaConcluida = true;
  bencaoConcedida = true;
  bossAtivo = false;
  pontos = 0;
  rodada = 1;
  mobNivel = 1;

  el('provaAviso').hidden = true;
  el('btnPause').style.display = '';

  atualizarMonstro(true);
  sincronizarMagia();
  renderTudo();
  renderRota();
  verificarConquistas();

  const e = ELEMENTOS[elementoEscolhido];
  mostrarMensagem(`🧤 LUVA DE ${e.nome} — ${e.emoji} ${e.descricao.toUpperCase()}`);
  tocarSom('nivel');
  agendarSeringa();
}

/* ---------- eventos e início ---------- */

botao.addEventListener('click', atacar);
el('btnComecar').addEventListener('click', iniciarJogo);
el('btnInicioConquistas').addEventListener('click', () => abrirOverlay('achievements'));
document.querySelectorAll('#deusPasso .deus-opt').forEach(b => {
  b.addEventListener('click', () => escolherElemento(b.dataset.elemento));
});
addEventListener('keydown', e => {
  if (!jogoIniciado) {
    if (e.key === 'Enter') { e.preventDefault(); iniciarJogo(); }
    return;
  }
  const menuPausaAberto = !el('menuPausa').hidden;
  if (menuPausaAberto) {
    if (e.key === 'Escape' || e.key === 'Enter') { e.preventDefault(); fecharMenuPausa(); }
    return;
  }
  if (e.key === 'Escape') {
    if (!el('overlay').hidden) { fecharOverlay(); return; }
    if (!provacaoAtiva && !resetando) abrirMenuPausa();
    return;
  }
  if (provacaoAtiva) {
    if (e.code === 'Space') e.preventDefault();
    return;
  }
  if (!el('overlay').hidden) return;
  if (e.key === 'p' || e.key === 'P') { e.preventDefault(); alternarPausa(); return; }
  if (/^[0-9]$/.test(e.key)) {
    sequencia = (sequencia + e.key).slice(-3);
    if (sequencia === '666') {
      sequencia = '';
      alternarCapeta();
      return;
    }
  }
  if (e.code === 'Space') { e.preventDefault(); atacar(); }
});
el('sairCapeta').addEventListener('click', alternarCapeta);
el('somBtn').addEventListener('click', () => {
  somAtivo = !somAtivo;
  el('somBtn').classList.toggle('desligado', !somAtivo);
  el('somBtn').textContent = somAtivo ? '🔊' : '🔇';
  if (somAtivo) tocarSom('moeda');
});
el('rerolar').addEventListener('click', () => {
  if (provacaoAtiva) return;
  if (rerolarLoja()) flutuante('LOJA ROLADA!', '#9fb4c7', 90);
});
el('itensLoja').addEventListener('click', e => {
  if (provacaoAtiva) return; // Bloqueia cliques na loja durante a provação
  const comprado = e.target.closest('.item.comprado');
  if (comprado) { flutuante('COMPRADO — ROLE A LOJA 🎲', '#9fb4c7', 90); return; }
  const row = e.target.closest('.item[data-item-id]');
  const b = e.target.closest('[data-comprar]');
  if (!row) { if (b) comprar(Number(b.dataset.comprar)); return; }
  const item = loja.find(i => i && i.id === Number(row.dataset.itemId));
  if (!item) return;
  // preço é o único pré-requisito: item de qualquer raridade compra com saldo suficiente
  if (moedas < item.preco) {
    flutuante(`FALTAM ${item.preco - moedas} 🪙`, '#dcb878', 90);
    row.classList.remove('sem-dinheiro');
    void row.offsetWidth;
    row.classList.add('sem-dinheiro');
    return;
  }
  comprar(item.id);
});
el('inventario').addEventListener('click', e => {
  if (provacaoAtiva) return; // Bloqueia cliques no inventário durante a provação
  const b = e.target.closest('[data-equipar]');
  if (b) equipar(Number(b.dataset.equipar));
});
magiaUpgradeBtn.addEventListener('click', upgradeMagia);

/* ---------- eventos do preset v2.0 ---------- */
el('btnStats').addEventListener('click', () => abrirOverlay('stats'));
el('btnPause').addEventListener('click', () => alternarPausa());
el('btnMenu').addEventListener('click', abrirMenuPausa);
el('btnContinuar').addEventListener('click', fecharMenuPausa);
el('btnMenuConfig').addEventListener('click', () => abrirOverlay('settings'));
el('btnVerTrofus').addEventListener('click', () => abrirOverlay('achievements'));
el('btnSettings').addEventListener('click', () => abrirOverlay('settings'));
el('btnFullscreen').addEventListener('click', () => {
  if (document.fullscreenElement) document.exitFullscreen?.();
  else document.documentElement.requestFullscreen?.().catch(() => {});
});
el('fecharOverlay').addEventListener('click', fecharOverlay);
el('overlay').addEventListener('click', e => {
  if (e.target === el('overlay')) fecharOverlay();
});
el('navInferior').addEventListener('click', e => {
  if (provacaoAtiva) return; // Bloqueia cliques na nav inferior durante a provação
  const b = e.target.closest('[data-nav]');
  if (!b) return;
  el('navInferior').querySelectorAll('button').forEach(n => n.classList.toggle('ativo', n === b));
  const alvo = b.dataset.nav;
  if (alvo === 'home') scrollTo({ top: 0, behavior: movimentoReduzido ? 'auto' : 'smooth' });
  else if (alvo === 'shop') el('itensLoja').scrollIntoView({ behavior: movimentoReduzido ? 'auto' : 'smooth', block: 'center' });
  else abrirOverlay(alvo);
});

let ultimoRastro = 0;
const orbs = el('orbs');
addEventListener('pointermove', e => {
  if (document.hidden) return;
  if (orbs && !movimentoReduzido && !baixaQualidade) {
    orbs.style.transform = `translate(${(e.clientX / innerWidth - .5) * 18}px, ${(e.clientY / innerHeight - .5) * 12}px)`;
  }
  const trilha = el('cursorTrail');
  const agora = performance.now();
  if (!trilha || movimentoReduzido || baixaQualidade || agora - ultimoRastro < 28) return;
  ultimoRastro = agora;
  const p = document.createElement('i');
  p.style.left = e.clientX + 'px';
  p.style.top = e.clientY + 'px';
  trilha.appendChild(p);
  if (trilha.childElementCount > 40) trilha.firstElementChild.remove();
  setTimeout(() => p.remove(), 520);
}, { passive: true });

document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('pausado', document.hidden);
  sincronizarMusica();
});

// começa do zero: sem inventário e sem itens equipados
loja = [novoItemComum(), novoItem(), novoItem()];
atualizarMonstro();
renderTudo();
setInterval(danoMagicoTick, 100);
abrirInicio();
