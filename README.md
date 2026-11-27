# Click Glow — Arena de Monstros

Jogo de clique com desafio inicial, bênção elemental, loja, raridades e bosses.

**Jogar:** https://otaviomapa.github.io/click-glow/

## Como jogar

- **COMEÇAR JORNADA**: no começo só ataque (clique ou **ESPAÇO**); loja e poderes ficam bloqueados.
- Alcance **100 pontos** para despertar o **Boss Demônio**.
- Derrote-o para receber a bênção de Deus e escolher **fogo, gelo ou raio**.
- Depois da bênção liberam-se loja, inventário, magia, seringa, pausa e configurações.
- **☰** na topbar (ou **ESC**) abre o menu de pausa com suas conquistas.
- **ESPAÇO** ataca e **P** pausa a luta.

## Arquivos

- `index.html` — estrutura da página
- `style.css` — visual
- `game.js` — toda a lógica
- `monstros/anim/` — spritesheets animados (idle, hit e morte) dos 18 inimigos
- `personagens/` — retratos base do cruzado/antimodelo e variações de build (WebP)
- `icones/` — sprites SVG dos itens

## Bestiário animado

Os inimigos usam spritesheets WebP com 8 colunas x 6 linhas (idle, movimento,
ataque, hit, morte e especial). O jogo toca **idle** em loop, **hit** ao acertar
e **morte** no Boss Demônio do desafio inicial. São 18 criaturas, incluindo os
chefes Baphomet, Lilith e Lúcifer.

## Herói e fase secreta

- **Herói normal:** cruzado (`personagens/heroi-cruzado.webp`).
- **Fase secreta 666:** após a bênção, o herói usa o visual de build do
  **antimodelo 666** (`personagens/anti_builds/`).
- Há **9 variações conceituais por personagem** (`personagens/hero_builds/` e
  `personagens/anti_builds/`). O jogo escolhe automaticamente uma conforme a
  combinação de raridades, peças equipadas e elemento da luva; mudanças de build
  atualizam o sprite. A mesma variação pode aparecer em builds diferentes porque
  o pacote só traz nove previews por personagem.
- Os previews são concept art recortada, ainda não sprites modulares/animados.
- Os inimigos são espelhados (`scaleX(-1)`) para encarar o herói à esquerda.

## Lista completa de itens

### Equipamentos da loja (5 slots)

| Slot | Peça | Ícone | Stat | Bônus base |
|------|------|-------|------|------------|
| arma | Lâmina | 🗡️ | Crítico | 3 |
| mira | Mira | 🎯 | Acerto | 3 |
| amuleto | Amuleto | 📿 | Crítico | 2 |
| luva | Luva | 🧤 | Acerto | 2 |
| talisma | Talismã | 🍀 | Sorte | 3 |

Cada peça tem 5 raridades; o bônus final é `base × multiplicador da raridade`:

| Raridade | Mult | Preço | Peso na loja |
|----------|------|-------|--------------|
| Comum | ×1 | 24 | 40 |
| Incomum | ×2,2 | 60 | 32 |
| Raro | ×5 | 145 | 20 |
| Épico | ×11 | 350 | 8 |
| Radiante | ×25 | 999 | 0 (só por fusão) |

> **Fusão Radiante:** ao acumular 5 épicos reservados no inventário, eles viram
> um item **Radiante** rainbow (bônus ×2,5 do melhor épico consumido).

### Luvas elementais (3)

Comprar uma luva define o poder da magia, que liga sozinha ao atacar:

| Poder | Emoji | Efeito |
|-------|-------|--------|
| Fogo | 🔥 | Dano mágico ×1,25 |
| Gelo | ❄️ | +5% de acerto |
| Raio | ⚡ | +5% de crítico |

A magia pode ser turbinada com **UPGRADE** (custo `40 + nível × 35` moedas),
aumentando o DPS (`2 + nível × 2` por segundo).

### Bênção de Deus (3 elementos)

Após derrotar o Boss Demônio do desafio inicial, escolha um elemento permanente.
Os efeitos são os mesmos das luvas acima.

### Eventos / consumíveis

| Item | Efeito |
|------|--------|
| 💉 Seringa de Frenesi | 60 s de auto-ataque a cada 650 ms; chance base 8%, até 75% com sorte |
| 🎲 Rolls | rerolar a loja (3 por rodada; +3 ao fechar uma rodada de 100 pts) |
| 🪙 Moedas | moeda da loja e upgrades (8 + nível × 4 por morte) |

### Conquistas (8)

| Ícone | Nome | Como desbloquear |
|-------|------|------------------|
| 🛒 | Primeira Compra | Compre seu primeiro item |
| ⚔️ | Primeira Vitória | Derrote um monstro |
| 🔥 | Combo 10 | Acerte 10 seguidos |
| 🪙 | Cofre Cheio | Ganhe 200 moedas |
| 👑 | Caçador de Boss | Derrote um boss |
| 🧤 | Poder Desperto | Compre uma luva elemental |
| 🛡️ | Build Completa | Preencha os 5 slots |
| 🌈 | Radiante | Forje um item rainbow |

### Bestiário (18 inimigos)

Cultista · Freira Corrompida · Imp · Olho do Abismo · Esqueleto Sagrado ·
Inquisidor · Cão do Inferno · Alma Atormentada · Gárgula · Zelota do Oculto ·
Cavaleiro Possuído · Anjo Caído · Succubus · Espectro Sacro · Demônio Abissal ·
Lúcifer · Lilith · Baphomet.

Os três últimos são **chefes** (boss da rodada, fase 666 e boss final).

### Configurações

Volume · Música ambiente · Qualidade (Auto/Alta/Média) · Movimento reduzido ·
Salvar progresso · Resetar save. Progresso salvo em `localStorage` com progresso
offline (moedas e mortes acumuladas enquanto o jogador esteve fora).
