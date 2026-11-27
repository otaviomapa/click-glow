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
- `icones/` — sprites SVG dos itens

## Bestiário animado

Os inimigos usam spritesheets WebP com 8 colunas x 6 linhas (idle, movimento,
ataque, hit, morte e especial). O jogo toca **idle** em loop, **hit** ao acertar
e **morte** no Boss Demônio do desafio inicial. São 18 criaturas, incluindo os
chefes Baphomet, Lilith e Lúcifer.
