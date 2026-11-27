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
  ['🕯️', 'Cultista'],          ['⛪', 'Freira Corrompida'], ['😈', 'Imp'],
  ['👁️', 'Olho do Abismo'],    ['💀', 'Esqueleto Sagrado'], ['🎭', 'Inquisidor'],
  ['🐺', 'Cão do Inferno'],    ['👻', 'Alma Atormentada'],  ['🦇', 'Gárgula'],
  ['🧙', 'Zelota do Oculto'],  ['⚔️', 'Cavaleiro Possuído'], ['🪽', 'Anjo Caído'],
  ['💋', 'Succubus'],          ['✨', 'Espectro Sacro'],    ['🐙', 'Demônio Abissal'],
  ['😈', 'Lúcifer'],           ['🌙', 'Lilith'],            ['🐐', 'Baphomet']
];

const SPRITES_ARQUIVO = {
  'Cultista': 'cultista.webp',
  'Freira Corrompida': 'freira-corrompida.webp',
  'Imp': 'imp.webp',
  'Olho do Abismo': 'olho-do-abismo.webp',
  'Esqueleto Sagrado': 'esqueleto-sagrado.webp',
  'Inquisidor': 'inquisidor.webp',
  'Cão do Inferno': 'cao-do-inferno.webp',
  'Alma Atormentada': 'alma-atormentada.webp',
  'Gárgula': 'gargula.webp',
  'Zelota do Oculto': 'zelota-do-oculto.webp',
  'Cavaleiro Possuído': 'cavaleiro-possuido.webp',
  'Anjo Caído': 'anjo-caido.webp',
  'Succubus': 'succubus.webp',
  'Espectro Sacro': 'espectro-sacro.webp',
  'Demônio Abissal': 'demonio-abissal.webp',
  'Lúcifer': 'lucifer.webp',
  'Lilith': 'lilith.webp',
  'Baphomet': 'baphomet.webp'
};

function identidadeMonstro(emoji, nome = '') {
  if (nome.includes('Baphomet') || nome.includes('Lilith') || nome.includes('Lúcifer')) return 'boss';
  if (nome.includes('Papa') || nome.includes('Inquisidor') || nome.includes('Cultista') || nome.includes('Freira') || nome.includes('Zelota')) return 'demon';
  if (nome.includes('Cão')) return 'wolf';
  if (nome.includes('Alma') || nome.includes('Espectro')) return 'ghost';
  if (nome.includes('Gárgula') || nome.includes('Anjo')) return 'bat';
  if (nome.includes('Aberração') || nome.includes('Olho') || nome.includes('Abissal')) return 'cosmic';
  if (nome.includes('Cadáver') || nome.includes('Esqueleto') || nome.includes('Cavaleiro')) return 'zombie';
  if (nome.includes('Imp') || nome.includes('Succubus')) return 'demon';
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

/* ---------- modelos SVG animados (herói, adaga, monstros e boss) ---------- */
function adagaSvg(corGuarda = '#ffd447', corElem = '') {
  const brilho = corElem || '#9ad8ff';
  return `<svg class="modelo-svg modelo-adaga" viewBox="0 0 64 64" aria-hidden="true">
    <defs>
      <linearGradient id="dag-blade" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stop-color="#8ab4f8"/>
        <stop offset="55%" stop-color="#e8f3ff"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
      <linearGradient id="dag-edge" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stop-color="${brilho}"/>
        <stop offset="100%" stop-color="#ffffff"/>
      </linearGradient>
    </defs>
    <path d="M12 52 L24 40" stroke="#5a2d16" stroke-width="5" stroke-linecap="round"/>
    <circle cx="11" cy="53" r="3.6" fill="${corGuarda}" stroke="#241108" stroke-width="1.2"/>
    <path d="M18 34 L30 46" stroke="${corGuarda}" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M23 41 L54 10 L48 24 L27 41 Z" fill="url(#dag-blade)"/>
    <path d="M23 41 L54 10 L41 16 L23 37 Z" fill="url(#dag-edge)" opacity="0.9"/>
    <path d="M25 39 L52 12" stroke="#ffffff" stroke-width="1.2" opacity="0.85"/>
  </svg>`;
}

const MODELOS_MONSTRO = {
  slime: () => `<svg class="modelo-svg mob-slime" viewBox="0 0 80 80" aria-hidden="true">
    <defs>
      <radialGradient id="mob-slime-g" cx="38%" cy="30%" r="65%">
        <stop offset="0%" stop-color="#b9ff9e"/>
        <stop offset="55%" stop-color="#45c47b"/>
        <stop offset="100%" stop-color="#175943"/>
      </radialGradient>
    </defs>
    <ellipse cx="40" cy="69" rx="26" ry="5" fill="rgba(0,0,0,0.4)"/>
    <g class="anim-wobble">
      <path d="M14 58 C12 34, 24 18, 40 18 C56 18, 68 34, 66 58 C65 66, 54 68, 40 68 C26 68, 15 66, 14 58 Z" fill="url(#mob-slime-g)" stroke="#c7ffba" stroke-width="1.6"/>
      <ellipse cx="30" cy="30" rx="8" ry="4.5" transform="rotate(-20 30 30)" fill="rgba(255,255,255,0.55)"/>
      <circle cx="52" cy="35" r="2.5" fill="rgba(255,255,255,0.45)" class="anim-bubble"/>
      <circle cx="24" cy="48" r="2" fill="rgba(255,255,255,0.35)" class="anim-bubble-2"/>
      <circle cx="31" cy="44" r="4.8" fill="#101815"/>
      <circle cx="49" cy="44" r="4.8" fill="#101815"/>
      <circle cx="32.5" cy="42.5" r="1.8" fill="#e8ffea"/>
      <circle cx="50.5" cy="42.5" r="1.8" fill="#e8ffea"/>
      <path d="M35 53 Q40 57 45 53" fill="none" stroke="#102b1e" stroke-width="2.2" stroke-linecap="round"/>
    </g>
  </svg>`,

  bat: () => `<svg class="modelo-svg mob-bat" viewBox="0 0 80 80" aria-hidden="true">
    <defs>
      <linearGradient id="mob-bat-w" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#6b528c"/>
        <stop offset="100%" stop-color="#221933"/>
      </linearGradient>
    </defs>
    <g class="anim-flap-l">
      <path d="M36 42 C24 22, 10 22, 6 38 C14 38, 18 44, 16 50 C22 46, 28 48, 34 50 Z" fill="url(#mob-bat-w)" stroke="#9e82c4" stroke-width="1.2"/>
    </g>
    <g class="anim-flap-r">
      <path d="M44 42 C56 22, 70 22, 74 38 C66 38, 62 44, 64 50 C58 46, 52 48, 46 50 Z" fill="url(#mob-bat-w)" stroke="#9e82c4" stroke-width="1.2"/>
    </g>
    <g class="anim-bob">
      <polygon points="31,28 27,14 37,24" fill="#3b2b54" stroke="#9e82c4" stroke-width="1.2"/>
      <polygon points="49,28 53,14 43,24" fill="#3b2b54" stroke="#9e82c4" stroke-width="1.2"/>
      <ellipse cx="40" cy="41" rx="13" ry="15" fill="#33244a" stroke="#8a70ad" stroke-width="1.4"/>
      <circle cx="35" cy="38" r="3.2" fill="#ff3b6b"/>
      <circle cx="45" cy="38" r="3.2" fill="#ff3b6b"/>
      <circle cx="35.8" cy="37.2" r="1" fill="#fff"/>
      <circle cx="45.8" cy="37.2" r="1" fill="#fff"/>
      <path d="M35 46 L37 49 L39 46 M41 46 L43 49 L45 46" fill="#fff"/>
    </g>
  </svg>`,

  wolf: () => `<svg class="modelo-svg mob-wolf" viewBox="0 0 80 80" aria-hidden="true">
    <defs>
      <linearGradient id="mob-wolf-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#9cb0bf"/>
        <stop offset="100%" stop-color="#36424d"/>
      </linearGradient>
    </defs>
    <ellipse cx="40" cy="70" rx="22" ry="4.5" fill="rgba(0,0,0,0.4)"/>
    <g class="anim-bob">
      <path d="M22 65 L28 40 L52 40 L58 65 Z" fill="#465461"/>
      <path d="M26 42 L40 52 L54 42 L48 34 L32 34 Z" fill="#cbd7e0"/>
      <polygon points="24,28 20,10 34,21" fill="#526270" stroke="#b6c7d4" stroke-width="1.2"/>
      <polygon points="56,28 60,10 46,21" fill="#526270" stroke="#b6c7d4" stroke-width="1.2"/>
      <path d="M23 30 C23 20, 57 20, 57 30 L52 46 L40 52 L28 46 Z" fill="url(#mob-wolf-g)" stroke="#c7d6e2" stroke-width="1.3"/>
      <polygon points="32,33 37,35 32,37" fill="#ffe047"/>
      <polygon points="48,33 43,35 48,37" fill="#ffe047"/>
      <polygon points="37,43 43,43 40,47" fill="#182026"/>
      <path d="M33 49 L35 53 L37 49 M43 49 L45 53 L47 49" fill="#fff"/>
    </g>
  </svg>`,

  crab: () => `<svg class="modelo-svg mob-crab" viewBox="0 0 80 80" aria-hidden="true">
    <defs>
      <radialGradient id="mob-crab-g" cx="45%" cy="35%" r="60%">
        <stop offset="0%" stop-color="#ff8a6b"/>
        <stop offset="65%" stop-color="#c94032"/>
        <stop offset="100%" stop-color="#6b1a18"/>
      </radialGradient>
    </defs>
    <ellipse cx="40" cy="69" rx="25" ry="4.5" fill="rgba(0,0,0,0.4)"/>
    <g class="anim-claw-l">
      <path d="M22 44 C10 38, 8 24, 18 18 L20 26 L26 20 C28 28, 26 36, 24 44 Z" fill="#e0533f" stroke="#ffb299" stroke-width="1.2"/>
    </g>
    <g class="anim-claw-r">
      <path d="M58 44 C70 38, 72 24, 62 18 L60 26 L54 20 C52 28, 54 36, 56 44 Z" fill="#e0533f" stroke="#ffb299" stroke-width="1.2"/>
    </g>
    <g class="anim-bob">
      <path d="M20 55 L12 64 M24 58 L18 67 M60 55 L68 64 M56 58 L62 67" stroke="#b03326" stroke-width="3.5" stroke-linecap="round"/>
      <ellipse cx="40" cy="48" rx="21" ry="15" fill="url(#mob-crab-g)" stroke="#ffb499" stroke-width="1.5"/>
      <line x1="33" y1="35" x2="31" y2="27" stroke="#d94a38" stroke-width="3"/>
      <line x1="47" y1="35" x2="49" y2="27" stroke="#d94a38" stroke-width="3"/>
      <circle cx="31" cy="26" r="4" fill="#181214" stroke="#ffd2b8" stroke-width="1"/>
      <circle cx="49" cy="26" r="4" fill="#181214" stroke="#ffd2b8" stroke-width="1"/>
      <circle cx="32" cy="25" r="1.4" fill="#fff"/>
      <circle cx="50" cy="25" r="1.4" fill="#fff"/>
      <path d="M33 52 Q40 56 47 52" fill="none" stroke="#420d0b" stroke-width="2.2" stroke-linecap="round"/>
    </g>
  </svg>`,

  snake: () => `<svg class="modelo-svg mob-snake" viewBox="0 0 80 80" aria-hidden="true">
    <defs>
      <linearGradient id="mob-snake-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#a8e063"/>
        <stop offset="100%" stop-color="#2c5e3b"/>
      </linearGradient>
    </defs>
    <ellipse cx="40" cy="70" rx="24" ry="4.5" fill="rgba(0,0,0,0.4)"/>
    <g class="anim-wobble">
      <path d="M22 62 C16 54, 24 48, 40 48 C56 48, 64 56, 56 64 C46 68, 28 68, 22 62 Z" fill="#295937" stroke="#8fd46a" stroke-width="1.3"/>
      <path d="M28 54 C24 44, 34 40, 42 36 C48 32, 46 24, 40 20" fill="none" stroke="url(#mob-snake-g)" stroke-width="10" stroke-linecap="round"/>
      <ellipse cx="40" cy="22" rx="12" ry="9" fill="url(#mob-snake-g)" stroke="#c2f291" stroke-width="1.3"/>
      <circle cx="35" cy="20" r="2.6" fill="#ffe600"/>
      <circle cx="45" cy="20" r="2.6" fill="#ffe600"/>
      <rect x="34.5" y="18.2" width="1" height="3.6" fill="#111"/>
      <rect x="44.5" y="18.2" width="1" height="3.6" fill="#111"/>
      <path d="M40 30 L40 38 L37 41 M40 38 L43 41" fill="none" stroke="#ff3b5c" stroke-width="1.6" stroke-linecap="round" class="anim-tongue"/>
    </g>
  </svg>`,

  hawk: () => `<svg class="modelo-svg mob-hawk" viewBox="0 0 80 80" aria-hidden="true">
    <defs>
      <linearGradient id="mob-hawk-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#d4a66a"/>
        <stop offset="100%" stop-color="#5c3d24"/>
      </linearGradient>
    </defs>
    <g class="anim-flap-l">
      <path d="M35 38 C20 18, 6 20, 4 34 C12 36, 18 42, 24 46 L36 44 Z" fill="url(#mob-hawk-g)" stroke="#f0d29c" stroke-width="1.2"/>
    </g>
    <g class="anim-flap-r">
      <path d="M45 38 C60 18, 74 20, 76 34 C68 36, 62 42, 56 46 L44 44 Z" fill="url(#mob-hawk-g)" stroke="#f0d29c" stroke-width="1.2"/>
    </g>
    <g class="anim-bob">
      <ellipse cx="40" cy="45" rx="11" ry="16" fill="#6e4b2e" stroke="#e0bc84" stroke-width="1.3"/>
      <circle cx="40" cy="26" r="10" fill="#f5efe4" stroke="#d9c8ae" stroke-width="1.2"/>
      <polygon points="36,29 44,29 40,37" fill="#ffb703" stroke="#7a4e00" stroke-width="1"/>
      <circle cx="35.5" cy="24" r="2.2" fill="#1a120b"/>
      <circle cx="44.5" cy="24" r="2.2" fill="#1a120b"/>
      <path d="M34 61 L31 67 M36 61 L36 68 M44 61 L44 68 M46 61 L49 67" stroke="#ffb703" stroke-width="2.2" stroke-linecap="round"/>
    </g>
  </svg>`,

  dragon: () => `<svg class="modelo-svg mob-dragon" viewBox="0 0 80 80" aria-hidden="true">
    <defs>
      <linearGradient id="mob-drag-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ff6b4a"/>
        <stop offset="60%" stop-color="#b81d24"/>
        <stop offset="100%" stop-color="#4d0812"/>
      </linearGradient>
    </defs>
    <g class="anim-flap-l">
      <path d="M34 40 L8 18 L12 36 L6 46 L28 48 Z" fill="#8f1622" stroke="#ff9a62" stroke-width="1.2"/>
    </g>
    <g class="anim-flap-r">
      <path d="M46 40 L72 18 L68 36 L74 46 L52 48 Z" fill="#8f1622" stroke="#ff9a62" stroke-width="1.2"/>
    </g>
    <g class="anim-bob">
      <path d="M27 65 L31 40 L49 40 L53 65 Z" fill="url(#mob-drag-g)"/>
      <path d="M34 44 L46 44 L44 64 L36 64 Z" fill="#ffcf70"/>
      <polygon points="30,22 23,8 35,17" fill="#ffd477"/>
      <polygon points="50,22 57,8 45,17" fill="#ffd477"/>
      <rect x="27" y="18" width="26" height="22" rx="7" fill="url(#mob-drag-g)" stroke="#ff9e6d" stroke-width="1.4"/>
      <polygon points="32,27 37,29 32,31" fill="#ffe600"/>
      <polygon points="48,27 43,29 48,31" fill="#ffe600"/>
      <path d="M34 36 L36 39 L38 36 M42 36 L44 39 L46 36" fill="#fff"/>
    </g>
  </svg>`,

  ghost: () => `<svg class="modelo-svg mob-ghost" viewBox="0 0 80 80" aria-hidden="true">
    <defs>
      <linearGradient id="mob-ghost-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e8fbff"/>
        <stop offset="65%" stop-color="#7cd4f5"/>
        <stop offset="100%" stop-color="rgba(68,94,204,0.25)"/>
      </linearGradient>
    </defs>
    <g class="anim-float-ghost">
      <path d="M20 42 C20 20, 60 20, 60 42 L62 66 L52 59 L45 68 L40 59 L35 68 L28 59 L18 66 Z" fill="url(#mob-ghost-g)" stroke="#ffffff" stroke-width="1.4"/>
      <ellipse cx="32" cy="37" rx="4.2" ry="5.5" fill="#16214d"/>
      <ellipse cx="48" cy="37" rx="4.2" ry="5.5" fill="#16214d"/>
      <circle cx="33" cy="35" r="1.6" fill="#8cf6ff"/>
      <circle cx="49" cy="35" r="1.6" fill="#8cf6ff"/>
      <ellipse cx="40" cy="48" rx="4.5" ry="5.5" fill="#16214d"/>
    </g>
  </svg>`,

  unicorn: () => `<svg class="modelo-svg mob-unicorn" viewBox="0 0 80 80" aria-hidden="true">
    <defs>
      <linearGradient id="mob-uni-horn" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="#ff6ec7"/>
        <stop offset="50%" stop-color="#ffe66d"/>
        <stop offset="100%" stop-color="#7afcff"/>
      </linearGradient>
    </defs>
    <ellipse cx="40" cy="70" rx="21" ry="4.5" fill="rgba(0,0,0,0.4)"/>
    <g class="anim-bob">
      <path d="M28 65 L32 42 L48 42 L52 65 Z" fill="#d9cde8"/>
      <path d="M24 34 C20 26, 26 20, 32 24" fill="#c77dff"/>
      <polygon points="37,22 40,4 43,22" fill="url(#mob-uni-horn)" stroke="#fff" stroke-width="1"/>
      <ellipse cx="40" cy="35" rx="14" ry="13" fill="#f2ecfa" stroke="#c7b2de" stroke-width="1.4"/>
      <circle cx="34" cy="33" r="3" fill="#ff2e88"/>
      <circle cx="46" cy="33" r="3" fill="#ff2e88"/>
      <circle cx="34.8" cy="32.2" r="1" fill="#fff"/>
      <circle cx="46.8" cy="32.2" r="1" fill="#fff"/>
      <path d="M35 42 Q40 45 45 42" fill="none" stroke="#6c4b8c" stroke-width="2" stroke-linecap="round"/>
    </g>
  </svg>`,

  ogre: () => `<svg class="modelo-svg mob-ogre" viewBox="0 0 80 80" aria-hidden="true">
    <ellipse cx="40" cy="70" rx="25" ry="5" fill="rgba(0,0,0,0.45)"/>
    <g class="anim-bob">
      <rect x="21" y="38" width="38" height="28" rx="8" fill="#a82828" stroke="#ff9a76" stroke-width="1.4"/>
      <rect x="26" y="18" width="28" height="24" rx="7" fill="#c93636" stroke="#ff9a76" stroke-width="1.4"/>
      <path d="M29 25 L37 28 M51 25 L43 28" stroke="#2e0606" stroke-width="2.8" stroke-linecap="round"/>
      <circle cx="33" cy="29" r="2.6" fill="#ffe600"/>
      <circle cx="47" cy="29" r="2.6" fill="#ffe600"/>
      <polygon points="30,38 33,31 36,38" fill="#fff3d1"/>
      <polygon points="44,38 47,31 50,38" fill="#fff3d1"/>
      <path d="M33 38 L47 38" stroke="#3b0808" stroke-width="2.5"/>
    </g>
  </svg>`,

  zombie: () => `<svg class="modelo-svg mob-zombie" viewBox="0 0 80 80" aria-hidden="true">
    <ellipse cx="40" cy="70" rx="21" ry="4.5" fill="rgba(0,0,0,0.4)"/>
    <g class="anim-wobble">
      <rect x="27" y="40" width="26" height="26" rx="5" fill="#465249" stroke="#7d9178" stroke-width="1.2"/>
      <rect x="14" y="42" width="15" height="7" rx="3" fill="#7d9e6b"/>
      <rect x="51" y="42" width="15" height="7" rx="3" fill="#7d9e6b"/>
      <rect x="26" y="18" width="28" height="24" rx="6" fill="#84a870" stroke="#b9d69c" stroke-width="1.4"/>
      <circle cx="34" cy="29" r="3.4" fill="#1a1f1a"/>
      <circle cx="46" cy="29" r="3.4" fill="#1a1f1a"/>
      <circle cx="34" cy="29" r="1.3" fill="#b7ff4a"/>
      <circle cx="46" cy="29" r="1.3" fill="#b7ff4a"/>
      <path d="M33 37 L47 37" stroke="#243022" stroke-width="2.5"/>
      <rect x="36" y="36" width="3" height="3" fill="#e8e2c5"/>
      <rect x="42" y="36" width="3" height="3" fill="#e8e2c5"/>
    </g>
  </svg>`,

  dinosaur: () => `<svg class="modelo-svg mob-dino" viewBox="0 0 80 80" aria-hidden="true">
    <ellipse cx="40" cy="70" rx="24" ry="4.5" fill="rgba(0,0,0,0.4)"/>
    <g class="anim-bob">
      <path d="M18 58 L30 42 L50 42 L56 66 L26 66 Z" fill="#9c3228" stroke="#ff9675" stroke-width="1.3"/>
      <rect x="26" y="16" width="32" height="22" rx="6" fill="#bd3f32" stroke="#ff9675" stroke-width="1.4"/>
      <circle cx="37" cy="24" r="2.8" fill="#ffe600"/>
      <circle cx="37.5" cy="24" r="1.1" fill="#111"/>
      <path d="M36 33 L56 33" stroke="#300909" stroke-width="3"/>
      <path d="M39 33 L41 37 L43 33 M46 33 L48 37 L50 33 M52 33 L54 37 L56 33" fill="#fff"/>
    </g>
  </svg>`,

  cosmic: () => `<svg class="modelo-svg mob-cosmic" viewBox="0 0 80 80" aria-hidden="true">
    <defs>
      <radialGradient id="mob-cos-g" cx="40%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#c4f5ff"/>
        <stop offset="55%" stop-color="#6b4cff"/>
        <stop offset="100%" stop-color="#221459"/>
      </radialGradient>
    </defs>
    <g class="anim-float-ghost">
      <path d="M22 50 Q16 64 22 70 M32 52 Q30 66 34 72 M48 52 Q50 66 46 72 M58 50 Q64 64 58 70" fill="none" stroke="#80d4ff" stroke-width="4.5" stroke-linecap="round" class="anim-wobble"/>
      <ellipse cx="40" cy="35" rx="20" ry="18" fill="url(#mob-cos-g)" stroke="#b8f2ff" stroke-width="1.5"/>
      <circle cx="33" cy="35" r="3.6" fill="#ffe600"/>
      <circle cx="47" cy="35" r="3.6" fill="#ffe600"/>
      <circle cx="33" cy="35" r="1.4" fill="#140933"/>
      <circle cx="47" cy="35" r="1.4" fill="#140933"/>
      <circle cx="40" cy="23" r="2.2" fill="#00ffc8"/>
    </g>
  </svg>`,

  demon: () => `<svg class="modelo-svg mob-demon" viewBox="0 0 80 80" aria-hidden="true">
    <defs>
      <linearGradient id="mob-dem-g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#ff3b4e"/>
        <stop offset="100%" stop-color="#590012"/>
      </linearGradient>
    </defs>
    <ellipse cx="40" cy="70" rx="24" ry="5" fill="rgba(255,0,40,0.3)"/>
    <g class="anim-bob">
      <path d="M26 24 C16 18, 16 8, 24 6 C22 14, 26 18, 32 20 Z" fill="#ffe0a3"/>
      <path d="M54 24 C64 18, 64 8, 56 6 C58 14, 54 18, 48 20 Z" fill="#ffe0a3"/>
      <path d="M24 66 L28 42 L52 42 L56 66 Z" fill="#6b0014"/>
      <ellipse cx="40" cy="32" rx="16" ry="15" fill="url(#mob-dem-g)" stroke="#ff8fa0" stroke-width="1.4"/>
      <polygon points="31,29 37,32 31,34" fill="#ffe600"/>
      <polygon points="49,29 43,32 49,34" fill="#ffe600"/>
      <path d="M33 40 Q40 36 47 40" fill="none" stroke="#240006" stroke-width="2.4" stroke-linecap="round"/>
    </g>
  </svg>`,

  boss: () => `<svg class="modelo-svg mob-boss" viewBox="0 0 96 96" aria-hidden="true">
    <defs>
      <radialGradient id="mob-boss-aura" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="rgba(255,40,40,0.45)"/>
        <stop offset="100%" stop-color="rgba(255,40,40,0)"/>
      </radialGradient>
      <linearGradient id="mob-boss-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#e01b2e"/>
        <stop offset="60%" stop-color="#7a0016"/>
        <stop offset="100%" stop-color="#240008"/>
      </linearGradient>
    </defs>
    <circle cx="48" cy="48" r="44" fill="url(#mob-boss-aura)" class="anim-aura"/>
    <g class="anim-flap-l">
      <path d="M38 48 L8 22 L14 44 L8 58 L34 56 Z" fill="#4a0010" stroke="#ff5c5c" stroke-width="1.3"/>
    </g>
    <g class="anim-flap-r">
      <path d="M58 48 L88 22 L82 44 L88 58 L62 56 Z" fill="#4a0010" stroke="#ff5c5c" stroke-width="1.3"/>
    </g>
    <g class="anim-bob">
      <path d="M28 82 L32 46 L64 46 L68 82 Z" fill="url(#mob-boss-body)" stroke="#ff7a7a" stroke-width="1.4"/>
      <polygon points="48,54 54,62 48,70 42,62" fill="#ff7a00" stroke="#ffe66d" stroke-width="1.2"/>
      <path d="M31 28 C18 20, 18 6, 28 4 C26 14, 30 18, 37 22 Z" fill="#ffe6b3"/>
      <path d="M65 28 C78 20, 78 6, 68 4 C70 14, 66 18, 59 22 Z" fill="#ffe6b3"/>
      <polygon points="34,20 39,10 44,18 48,8 52,18 57,10 62,20" fill="#ffd447" stroke="#fff3a0" stroke-width="1"/>
      <rect x="31" y="20" width="34" height="28" rx="9" fill="url(#mob-boss-body)" stroke="#ff9191" stroke-width="1.5"/>
      <polygon points="37,31 44,34 37,36" fill="#ffe600"/>
      <polygon points="59,31 52,34 59,36" fill="#ffe600"/>
      <path d="M39 42 L42 45 L45 42 L48 45 L51 42 L54 45 L57 42" fill="none" stroke="#ffcf70" stroke-width="2" stroke-linecap="round"/>
    </g>
  </svg>`
};

MODELOS_MONSTRO.default = MODELOS_MONSTRO.slime;

function modeloMonstro(tipo) {
  const fn = MODELOS_MONSTRO[tipo] || MODELOS_MONSTRO.default;
  return fn();
}

// muda junto com o ?v= do index.html: sprites presos no cache antigo chegavam vazios
const ASSETS_V = '32';
const _spritesProntos = new Set();
const _spritesFalhos = new Set();

function srcSprite(arq) {
  return `monstros/anim/${arq}?v=${ASSETS_V}`;
}

function marcarSpriteFalho(arq) {
  _spritesFalhos.add(arq);
  document.querySelectorAll(`.modelo-anim[data-sprite="${arq}"]`)
    .forEach(n => n.classList.add('sprite-falhou'));
}

function preCarregarSprite(arq) {
  if (!arq || _spritesProntos.has(arq)) return;
  _spritesProntos.add(arq);
  const img = new Image();
  // sprite que falha não deixa a arena vazia: cai no emoji do inimigo
  img.onerror = () => marcarSpriteFalho(arq);
  img.src = srcSprite(arq);
}

function spriteHtml(arq, rotulo, emoji = '👾') {
  preCarregarSprite(arq);
  const falhou = _spritesFalhos.has(arq) ? ' sprite-falhou' : '';
  return `<div class="modelo-anim${falhou}" data-sprite="${arq}" data-emoji="${emoji}" role="img" aria-label="${rotulo}" style="background-image:url('${srcSprite(arq)}')"></div>`;
}

function bossSvg(nome = 'Baphomet') {
  const arq = nome.includes('Lúcifer') ? 'lucifer.webp' : (rodada % 2 === 0 ? 'lilith.webp' : 'baphomet.webp');
  return spriteHtml(arq, nome, nome.includes('Lúcifer') ? '😈' : '👑');
}

function spriteMonstro(emoji, nome = '') {
  const base = nome.replace(/\s*\+\d+$/, '');
  const arq = SPRITES_ARQUIVO[base] || (emoji === '😈' ? 'lucifer.webp' : 'cultista.webp');
  const html = spriteHtml(arq, base || 'Inimigo', emoji);
  // deixa o proximo inimigo pronto antes de aparecer
  const proximo = MONSTROS[mobNivel % MONSTROS.length];
  if (proximo) preCarregarSprite(SPRITES_ARQUIVO[proximo[1]]);
  return html;
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

const BUILDS_HEROI = {
  heroi: Object.freeze(Object.fromEntries(Array.from({ length: 9 }, (_, i) => [i + 1, `hero_builds/build_${i + 1}.webp`]))),
  antimodelo: Object.freeze(Object.fromEntries(Array.from({ length: 9 }, (_, i) => [i + 1, `anti_builds/build_${i + 1}.webp`])))
};

function buildVisualAtual() {
  const itens = Object.values(equipados).filter(Boolean);
  if (!itens.length) return 1;
  const forcas = { comum: 0, incomum: 1, raro: 2, epico: 3, radiante: 4 };
  const soma = itens.reduce((total, item) => total + (forcas[item.rar] ?? 0) + (item.poder ? ({ fogo: 0, gelo: 1, raio: 2 }[item.poder] || 0) : 0), 0);
  const perfil = Math.round(soma / itens.length);
  const mascara = itens.reduce((mask, item) => mask ^ ((item.slot.length * 13 + (forcas[item.rar] || 0) * 7 + (item.poder ? ({ fogo: 1, gelo: 3, raio: 5 }[item.poder] || 0) : 0)) & 255), 0);
  return 1 + ((perfil * 2 + (mascara % 7) + itens.length * 2) % 9);
}

function renderHeroi() {
  const antimodelo = modoCapeta;
  const familia = antimodelo ? 'antimodelo' : 'heroi';
  const build = buildVisualAtual();
  const pasta = BUILDS_HEROI[familia];
  const arq = pasta[build];
  heroi.dataset.heroi = familia;
  heroi.dataset.build = String(build);
  heroi.innerHTML = `<img class="modelo-img heroi-img" src="personagens/${arq}?v=${ASSETS_V}" alt="${antimodelo ? 'Antimodelo 666' : 'Herói cruzado'}" draggable="false">`;
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

let _arenaRectCache = null;
let _arenaRectExp = 0;
function getArenaRect() {
  const agora = performance.now();
  if (!_arenaRectCache || agora > _arenaRectExp) {
    _arenaRectCache = arena.getBoundingClientRect();
    _arenaRectExp = agora + 220;
  }
  return _arenaRectCache;
}
addEventListener('resize', () => { _arenaRectCache = null; });

function flutuante(texto, cor, deslocamento = 0) {
  while (floaters.childElementCount >= 8) floaters.firstElementChild.remove();
  const r = getArenaRect();
  const d = document.createElement('div');
  d.className = 'flutuante';
  d.textContent = texto;
  d.style.color = cor;
  const spread = movimentoReduzido ? 0 : (Math.random() - .5) * 64;
  const vertical = movimentoReduzido ? 0 : (Math.random() - .5) * 26;
  d.style.left = (r.left + r.width / 2 + deslocamento + spread) + 'px';
  d.style.top = (r.top + r.height * .46 + vertical) + 'px';
  floaters.appendChild(d);
  setTimeout(() => d.remove(), 900);
}

// aviso único para o que está travado durante a jornada
function avisarProvacao() {
  flutuante('🔒 LIBERA APÓS VENCER O BOSS', '#dcb878', 80);
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
  const sprite = monstroEl.querySelector('.modelo-anim');
  if (tipo === 'acerto') {
    if (sprite) {
      sprite.classList.remove('levando');
      void sprite.offsetWidth;
      sprite.classList.add('levando');
      clearTimeout(sprite._levandoTimer);
      sprite._levandoTimer = setTimeout(() => sprite.classList.remove('levando'), 540);
    }
    monstroEl.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.16, .88) translateX(8px) rotate(5deg)', offset: 0.35 },
      { transform: 'scale(.95, 1.06) translateX(-3px) rotate(-2deg)', offset: 0.7 },
      { transform: 'scale(1)' }
    ], { duration: 240, easing: 'ease-out' });
  } else {
    monstroEl.animate([
      { transform: 'translateX(0)', opacity: 1 },
      { transform: 'translateX(16px) skewX(-5deg)', opacity: 0.72, offset: 0.3 },
      { transform: 'translateX(-8px) skewX(3deg)', opacity: 0.88, offset: 0.65 },
      { transform: 'translateX(0)', opacity: 1 }
    ], { duration: 260, easing: 'ease-out' });
  }
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
  if (!overlay) return;
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
      <div class="config-linha"><span>✨ Movimento reduzido</span><button id="movToggle">${movimentoReduzido ? 'DESATIVAR' : 'ATIVAR'}</button></div>
      <div class="config-linha"><span>💾 Salvar progresso</span><button id="btnSalvarAgora">SALVAR AGORA</button></div>
      <div class="config-linha"><span>🗑️ Resetar jogo</span><button id="btnResetarSave">APAGAR SAVE</button></div>`;

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
    el('btnSalvarAgora').addEventListener('click', () => {
      salvarJogo();
      mostrarMensagem('💾 PROGRESSO SALVO!');
    });
    el('btnResetarSave').addEventListener('click', () => {
      if (confirm('Tem certeza que deseja apagar todo o seu progresso salvo?')) {
        resetarSave();
      }
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
  if (provacaoAtiva) { avisarProvacao(); return; }
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

let _ultimoTickMagia = Date.now();
function danoMagicoTick() {
  const agora = Date.now();
  const dt = Math.min(Math.max((agora - _ultimoTickMagia) / 1000, 0), 60);
  _ultimoTickMagia = agora;
  if (provacaoAtiva) return;
  const ativo = agora < magia.ate;
  atualizarMagiaBarra();
  if (!jogoIniciado || lutaPausada) return;

  if (magia.ativaAgora !== ativo) {
    magia.ativaAgora = ativo;
    if (!ativo) {
      document.querySelectorAll('.magia-efeito').forEach(n => n.remove());
      renderHUD(false);
    }
  }
  if (!ativo || resetando || hp <= 0) return;

  const e = ELEMENTOS[magia.elemento];
  magia.acumulado += dpsMagia() * e.mult * dt;
  const dano = Math.floor(magia.acumulado);
  if (dano < 1) return;
  magia.acumulado -= dano;

  hp = Math.max(0, hp - dano);
  pontos += dano;
  flutuante(`-${dano} ${e.emoji}`, e.cor, 60);
  hpBar.style.width = (hp / hpMax * 100) + '%';
  hpText.textContent = `${hp} / ${hpMax}`;
  pontosEl.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.16)', offset: 0.45 },
    { transform: 'scale(1)' }
  ], { duration: 160, easing: 'ease-out' });

  if (hp <= 0) matarMonstro(0);
  if (pontos >= 100) { resetarPontos(); return; }
  renderHUD(false);
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
    monstroEl.innerHTML = bossSvg('Lúcifer');
    monstroEl.classList.add('chefe');
    monstroEl.classList.remove('acerto', 'erro');
    nomeMonstroEl.textContent = '😈 BOSS DEMÔNIO — LÚCIFER';
    if (comAnimacao) animarChegadaBoss();
  } else if (bossAtivo) {
    monstroEl.dataset.monster = 'boss';
    const nomeChefe = modoCapeta
      ? `Lúcifer, o Senhor ${rodada}`
      : `👑 BOSS: ${rodada % 2 === 0 ? 'Lilith' : 'Baphomet'} ${rodada}`;
    monstroEl.innerHTML = bossSvg(modoCapeta ? 'Lúcifer' : nomeChefe);
    monstroEl.classList.add('chefe');
    monstroEl.classList.remove('acerto', 'erro');
    nomeMonstroEl.textContent = nomeChefe;
    if (comAnimacao) animarChegadaBoss();
  } else {
    monstroEl.classList.remove('chefe', 'chegando');
    const indice = (mobNivel - 1) % MONSTROS.length;
    const ciclo = Math.floor((mobNivel - 1) / MONSTROS.length);
    const [emoji, nome] = MONSTROS[indice];
    const sprite = modoCapeta ? '😈' : emoji;
    const nomeExibido = modoCapeta ? `Lúcifer ${mobNivel}` : (ciclo > 0 ? `${nome} +${ciclo}` : nome);
    monstroEl.dataset.monster = modoCapeta ? 'demon' : identidadeMonstro(emoji, nome);
    monstroEl.innerHTML = spriteMonstro(sprite, nomeExibido);
    nomeMonstroEl.textContent = nomeExibido;
  }

  infoMonstroEl.textContent = demonioProva
    ? `DESAFIO · Boss Demônio · ${hpMax} de vida`
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
    nos.push({ emoji: '😈', nome: 'Boss Demônio', rotulo: 'DESAFIO', atual: true, boss: true });
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
      rotulo: provacaoAtiva ? '100 PTS · DESAFIO' : '100 PTS',
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
      ? `DESAFIO — FALTAM ${Math.max(0, hp)} DE DANO PARA VENCER O DEMÔNIO`
      : provacaoAtiva
        ? `DESAFIO — FALTAM ${Math.max(0, 100 - pontos)} PTS PARA O DEMÔNIO`
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
  if (magiaUpgradeBtn) magiaUpgradeBtn.disabled = moedas < custoMagia();
}

function renderHUD(comRota = true) {
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
  if (comRota) renderRota();
  infoMonstroEl.textContent = demonioProva
    ? `DESAFIO · Boss Demônio · ${hpMax} de vida`
    : `${bossAtivo ? 'BOSS' : 'Monstro'} nível ${mobNivel} · ${hpMax} de vida · ${Math.round(100 - acerto)}% de erro`;
  if (comRota) atualizarCompras();
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
  magiaUpgradeBtn.disabled = moedas < custoMagia();
  magiaUpgradeBtn.title = '';
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

const _adagaSvgCache = new Map();
function adagaSvgCached(corGuarda, corElem) {
  const key = corGuarda + '|' + corElem;
  let svg = _adagaSvgCache.get(key);
  if (!svg) {
    svg = adagaSvg(corGuarda, corElem);
    _adagaSvgCache.set(key, svg);
  }
  return svg;
}

let _posCombate = null;
let _posCombateExp = 0;
function getPosCombate() {
  const agora = performance.now();
  if (!_posCombate || agora > _posCombateExp) {
    const a = getArenaRect();
    const h = heroi.getBoundingClientRect();
    const m = monstroEl.getBoundingClientRect();
    const x0 = h.left - a.left + h.width * .68;
    const y0 = h.top - a.top + h.height * .38;
    const alvoX = m.left - a.left + m.width * .45;
    const alvoY = m.top - a.top + m.height * .48;
    _posCombate = { x0, y0, alvoX, alvoY, dx: alvoX - x0, dy: alvoY - y0 };
    _posCombateExp = agora + 250;
  }
  return _posCombate;
}
addEventListener('resize', () => { _posCombate = null; });

let _adagasEmVoo = 0;
function lancarAdaga(resultado) {
  const { x0, y0, alvoX, alvoY, dx, dy } = getPosCombate();
  const erro = !resultado.acerto;

  if (_adagasEmVoo >= 8) {
    setTimeout(() => { if (!resetando) aplicarImpacto(resultado, alvoX, alvoY); }, 120);
    return;
  }

  _adagasEmVoo++;
  const adaga = document.createElement('div');
  adaga.className = 'adaga' + (resultado.crit ? ' critico' : '');
  const corGuarda = equipados.arma ? equipados.arma.cor : '#ffd447';
  const corElem = equipados.luva ? ELEMENTOS[equipados.luva.poder || 'fogo'].cor : '';
  adaga.innerHTML = adagaSvgCached(corGuarda, corElem);
  adaga.style.left = x0 + 'px';
  adaga.style.top = y0 + 'px';
  if (corElem) adaga.style.setProperty('--elem-adaga', corElem);
  arena.appendChild(adaga);

  const voo = adaga.animate([
    { transform: 'translate(0px,0px) rotate(-35deg) scale(.75)', opacity: 0.2 },
    { transform: `translate(${dx * .48}px, ${dy * .48 - 52}px) rotate(125deg) scale(${resultado.crit ? 1.35 : 1.15})`, opacity: 1, offset: .5 },
    { transform: `translate(${erro ? dx + 85 : dx}px, ${erro ? dy - 105 : dy}px) rotate(315deg) scale(${erro ? .75 : 1.05})`, opacity: erro ? 0 : 1 }
  ], { duration: 260, easing: 'cubic-bezier(.22,.78,.42,1)', fill: 'forwards' });

  let resolvido = false;
  const finalizar = () => {
    if (resolvido) return;
    resolvido = true;
    _adagasEmVoo = Math.max(0, _adagasEmVoo - 1);
    adaga.remove();
    if (!resetando) aplicarImpacto(resultado, alvoX, alvoY);
  };
  voo.onfinish = finalizar;
  setTimeout(finalizar, 300); // garante o impacto mesmo se o navegador atrasar os frames
}

let _impactosAtivos = 0;
function aplicarImpacto(resultado, x, y) {
  if (lutaPausada) return;
  if (!resultado.acerto) {
    animarMonstro('erro');
    flutuante('MISS!', '#d98a8a');
    tocarSom('miss');
    estatisticas.erros++;
    atualizarCombo(false);
    return;
  }
  estatisticas.acertos++;
  if (resultado.crit) estatisticas.criticos++;
  atualizarCombo(true);
  if (combo % 10 === 0) verificarConquistas();
  tocarSom(resultado.crit ? 'critico' : 'acerto');

  if (_impactosAtivos < 5) {
    _impactosAtivos++;
    const impacto = document.createElement('div');
    impacto.className = 'impacto' + (resultado.crit ? ' critico' : '');
    impacto.style.left = x + 'px';
    impacto.style.top = y + 'px';
    arena.appendChild(impacto);
    setTimeout(() => {
      _impactosAtivos = Math.max(0, _impactosAtivos - 1);
      impacto.remove();
    }, 480);
  }

  if (resultado.crit) {
    arena.animate([
      { transform: 'translate(0, 0)' },
      { transform: 'translate(-4px, 3px)', offset: 0.25 },
      { transform: 'translate(4px, -3px)', offset: 0.55 },
      { transform: 'translate(0, 0)' }
    ], { duration: 240, easing: 'ease-out' });
  }

  const { crit, ganho } = resultado;
  const antes = Math.floor(pontos / 10);
  pontos += ganho;
  hp = Math.max(0, hp - 1);
  const depois = Math.floor(pontos / 10);

  animarMonstro('acerto');
  flutuante(crit ? `CRÍTICO +${ganho}!` : `+${ganho}`, crit ? '#e0bb74' : '#ffffff');
  estourarConfete(crit ? 14 : 4);
  pontosEl.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.18)', offset: 0.45 },
    { transform: 'scale(1)' }
  ], { duration: 180, easing: 'ease-out' });

  hpBar.style.width = (hp / hpMax * 100) + '%';
  hpText.textContent = `${hp} / ${hpMax}`;
  if (depois !== antes) aplicarTema();

  if (depois > antes && pontos < 100) {
    piscar();
    estourarConfete(70);
    mostrarMensagem(`NÍVEL ${depois + 1}! MAIS BRILHO ✨`);
    tocarSom('nivel');
  }

  if (hp <= 0) {
    _posCombate = null;
    matarMonstro(crit ? 2 : 0);
  }

  if (pontos >= 100) {
    if (provacaoAtiva) {
      pontos = 100;
      if (!demonioProva) { resetarPontos(); return; }
      renderHUD(true);
      renderBuild();
      return;
    }
    resetarPontos();
    return;
  }
  renderHUD(false);
}

function atacar() {
  if (!jogoIniciado || resetando || lutaPausada) return;
  estatisticas.cliques++;

  botao.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(.91)', offset: 0.35 },
    { transform: 'scale(1.03)', offset: 0.7 },
    { transform: 'scale(1)' }
  ], { duration: 160, easing: 'ease-out' });

  const acerto = Math.random() * 100 < taxaAcerto();
  const crit = acerto && Math.random() * 100 < taxaCrit();

  heroi.animate([
    { transform: 'translateX(0) rotate(0)' },
    { transform: 'translateX(-10px) rotate(-10deg)', offset: 0.3 },
    { transform: 'translateX(10px) rotate(10deg)', offset: 0.65 },
    { transform: 'translateX(0) rotate(0)' }
  ], { duration: 220, easing: 'ease-out' });

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
    const sprite = monstroEl.querySelector('.modelo-anim');
    if (sprite) {
      sprite.classList.remove('levando');
      sprite.classList.add('morrendo');
    }
    nomeMonstroEl.textContent = '😈 BOSS DEMÔNIO DERROTADO';
    mostrarMensagem('⚔ DESAFIO VENCIDO — LÚCIFER FOI DERROTADO');
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
      mostrarMensagem('😈 DESAFIO FINAL — DERROTE O BOSS DEMÔNIO!');
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
  clearInterval(falaTimer);
  falaTimer = 0;
  const tela = el('inicio');
  if (tela) tela.hidden = true;
  document.body.classList.remove('pre-jogo');

  if (_saveCarregado) {
    document.body.classList.toggle('provacao-ativa', provacaoAtiva);
    el('provaAviso').hidden = !provacaoAtiva;
    el('btnPause').style.display = provacaoAtiva ? 'none' : '';
    renderTudo();
    renderRota();
    atualizarTituloAba();
    mostrarMensagem('▶ JORNADA CONTINUADA!');
    tocarSom('nivel');
    return;
  }

  provacaoAtiva = true;
  demonioProva = false;
  provaConcluida = false;
  bencaoConcedida = false;
  bossAtivo = false;
  pontos = 0;
  mobNivel = 1;
  document.body.classList.add('provacao-ativa');

  // durante o desafio, ataque só por clique ou ESPAÇO
  el('provaAviso').hidden = false;
  el('btnPause').style.display = 'none';

  atualizarMonstro(true);
  renderTudo();
  renderRota();
  atualizarTituloAba();
  mostrarMensagem('⚔ JORNADA INICIADA — CLIQUE OU USE ESPAÇO.');
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
  // início e bênção cobrem o jogo: o teclado não ataca por baixo
  if (!el('inicio').hidden) return;
  if (e.key === 'Escape') {
    if (!el('overlay').hidden) { fecharOverlay(); return; }
    if (!provacaoAtiva && !resetando) abrirMenuPausa();
    return;
  }
  if (provacaoAtiva) {
    if (e.code === 'Space') { e.preventDefault(); atacar(); }
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
  if (rerolarLoja()) flutuante('LOJA ROLADA!', '#9fb4c7', 90);
});
el('itensLoja').addEventListener('click', e => {
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

/* ---------- sistema idle: persistência, progresso offline e título ao vivo ---------- */
const SAVE_KEY = 'clickGlowSave_v1';

function formatarCompacto(n) {
  if (n < 1000) return String(Math.floor(n));
  const sufixos = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi'];
  const i = Math.min(Math.floor(Math.log10(n) / 3), sufixos.length - 1);
  return (n / Math.pow(1000, i)).toFixed(1).replace(/\.0$/, '') + sufixos[i];
}

function atualizarTituloAba() {
  if (!jogoIniciado) {
    document.title = 'Click Glow — Arena de Monstros';
    return;
  }
  document.title = `⚔️ ${formatarCompacto(moedas)} 🪙 · R${rodada} — Click Glow`;
}

let _resetandoSave = false;
function salvarJogo() {
  // antes de COMEÇAR JORNADA não existe progresso a guardar — um save vazio
  // faria o menu reabrir em "CONTINUAR" e pular a provação inicial
  if (_resetandoSave || !jogoIniciado) return;
  try {
    const dados = {
      pontos, rodada, moedas, rolls, mobNivel, hp, hpMax, bossAtivo,
      provacaoAtiva, demonioProva, provaConcluida, bencaoConcedida, elementoEscolhido,
      idItem, inventario, equipados, loja, raridadeMinima, comboMax,
      estatisticas, conquistas: [...conquistas],
      magia: { nivel: magia.nivel, elemento: magia.elemento, ativada: magia.ativada },
      ultimoSave: Date.now()
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(dados));
  } catch (err) { /* ignora erro de quota/privacidade */ }
}

function aplicarProgressoOffline(ultimoSave) {
  if (!ultimoSave || (!provaConcluida && !equipados.luva)) return;
  const segs = Math.min(Math.max(Math.floor((Date.now() - ultimoSave) / 1000), 0), 28800);
  if (segs < 10) return;

  const e = ELEMENTOS[magia.elemento] || ELEMENTOS.fogo;
  const dpsEfetivo = equipados.luva ? dpsMagia() * e.mult * 0.5 : (1 + Math.floor(rodada * 0.5));
  const danoTotal = Math.floor(dpsEfetivo * segs);
  const mortesOff = Math.max(0, Math.floor(danoTotal / Math.max(10, hpMax)));
  const recompensaPorMorte = 8 + mobNivel * 4;
  const moedasOff = Math.max(1, mortesOff * recompensaPorMorte + Math.floor(segs * 0.15));

  moedas += moedasOff;
  estatisticas.moedasGanhas += moedasOff;
  estatisticas.mortes += mortesOff;
  const mins = Math.floor(segs / 60);
  const tempoTxt = mins >= 1 ? `${mins}min` : `${segs}s`;
  setTimeout(() => {
    mostrarMensagem(`🌙 OFFLINE (${tempoTxt}): +${formatarCompacto(moedasOff)} 🪙${mortesOff > 0 ? ` · ${mortesOff} monstros` : ''}`);
  }, 600);
}

function carregarJogo() {
  try {
    const bruto = localStorage.getItem(SAVE_KEY);
    if (!bruto) return false;
    const d = JSON.parse(bruto);
    if (typeof d !== 'object' || !d) return false;

    pontos = Number(d.pontos) || 0;
    rodada = Number(d.rodada) || 1;
    moedas = Number(d.moedas) || 0;
    rolls = Number(d.rolls ?? 3);
    mobNivel = Number(d.mobNivel) || 1;
    hpMax = Number(d.hpMax) || 10;
    hp = Math.min(hpMax, Math.max(1, Number(d.hp) || hpMax));
    bossAtivo = !!d.bossAtivo;
    provacaoAtiva = !!d.provacaoAtiva;
    demonioProva = !!d.demonioProva;
    provaConcluida = !!d.provaConcluida;
    bencaoConcedida = !!d.bencaoConcedida;
    elementoEscolhido = d.elementoEscolhido || 'fogo';
    idItem = Number(d.idItem) || 1;
    inventario = Array.isArray(d.inventario) ? d.inventario : [];
    equipados = d.equipados && typeof d.equipados === 'object' ? d.equipados : {};
    loja = Array.isArray(d.loja) && d.loja.length ? d.loja : [novoItemComum(), novoItem(), novoItem()];
    if (d.raridadeMinima && typeof d.raridadeMinima === 'object') raridadeMinima = d.raridadeMinima;
    comboMax = Number(d.comboMax) || 0;
    if (d.estatisticas && typeof d.estatisticas === 'object') Object.assign(estatisticas, d.estatisticas);
    conquistas.clear();
    if (Array.isArray(d.conquistas)) d.conquistas.forEach(id => conquistas.add(id));
    if (d.magia && typeof d.magia === 'object') {
      magia.nivel = Number(d.magia.nivel) || 1;
      magia.elemento = d.magia.elemento || 'fogo';
      magia.ativada = !!d.magia.ativada;
      magia.ate = magia.ativada ? Infinity : 0;
    }

    aplicarProgressoOffline(d.ultimoSave);
    return true;
  } catch (err) {
    return false;
  }
}

function resetarSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch (err) {}
  // impede que beforeunload/intervalo regravem o save apagado durante o reload
  addEventListener('beforeunload', salvarJogo, { once: true, capture: true });
  _resetandoSave = true;
  location.reload();
}

document.addEventListener('visibilitychange', () => {
  document.body.classList.toggle('pausado', document.hidden);
  sincronizarMusica();
  if (document.hidden) salvarJogo();
  else _ultimoTickMagia = Date.now();
});
addEventListener('beforeunload', salvarJogo);
setInterval(() => {
  if (jogoIniciado) salvarJogo();
  atualizarTituloAba();
}, 10000);

// inicializa carregando save se existir, ou começando do zero
const _saveCarregado = carregarJogo();
if (!_saveCarregado) {
  loja = [novoItemComum(), novoItem(), novoItem()];
  atualizarMonstro();
} else {
  const hpSalvo = hp;
  const hpMaxSalvo = hpMax;
  const magiaAtivadaSalva = magia.ativada;
  const magiaAteSalva = magia.ate;
  atualizarMonstro();
  hp = hpSalvo;
  hpMax = hpMaxSalvo;
  magia.ativada = magiaAtivadaSalva;
  magia.ate = magiaAteSalva;
  sincronizarMagia();
  hpBar.style.width = (hp / hpMax * 100) + '%';
  hpText.textContent = `${hp} / ${hpMax}`;
}
renderTudo();
atualizarTituloAba();
setInterval(danoMagicoTick, 100);
if (_saveCarregado && el('btnComecar')) el('btnComecar').textContent = '▶ CONTINUAR JORNADA';
abrirInicio();
