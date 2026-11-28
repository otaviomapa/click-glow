# Click Glow — Arena de Monstros

Jogo de clique com desafio inicial, bênção elemental, loja, raridades e bosses.

**Jogar:** https://otaviomapa.github.io/click-glow/

## Como jogar

- **COMEÇAR JORNADA**: ataque com clique ou **ESPAÇO**; loja, compras, rerolagem e inventário já funcionam.
- Alcance **100 pontos** para despertar o **Boss Demônio**.
- **Todo boss se apresenta**: fala própria (Lúcifer, Lilith ou Baphomet) e cerca
  de **3 segundos** em que ele não leva dano. Depois a luta volta ao normal.
- Derrote-o para receber a bênção de Deus e escolher **fogo, gelo ou raio**.
- Depois da bênção liberam-se magia, seringa, pausa e configurações.
- **☰** na topbar (ou **ESC**) abre o menu de pausa com suas conquistas.
- **ESPAÇO** ataca e **P** pausa a luta.

## Progressão e save (v45)

- **Rolls**: você guarda no máximo **12 🎲**. Matar monstros, bosses e romper
  100 pontos continua rendendo rolls; o excedente simplesmente não é contado.
- **Pity**: depois de **8 rolagens sem item raro ou melhor**, a próxima rerolagem
  garante pelo menos um item **raro** na primeira posição da loja.
- **Tier da peça**: comprar um item de raridade maior aposenta as inferiores
  **daquela mesma peça**. Os itens inferiores que ainda estavam na loja são
  substituídos por outros da peça, já no novo tier, **sem gastar roll**. Não são
  necessárias 5 compras: **uma** compra de tier superior sobe a peça. As 5 peças
  são só para a fusão de **épico → radiante**.
- **Sem volta**: depois que a peça subiu, itens de tier inferior não aparecem
  mais na loja (nem depois de recarregar a página) e a compra deles é barrada.
  As outras peças continuam independentes.
- **Offline**: o tempo fora rende moedas, mortes e até **6 rolls** (respeitando o
  teto). O painel da magia mostra os segundos restantes da recarga.
- **Save**: recarregar a página nunca herda magia ativa — ela volta desligada e
  com a recarga reconstruída. O progresso da primeira ativação (8s) e o nível da
  magia são preservados. Saves antigos ou corrompidos são saneados na carga:
  itens inválidos são descartados, o HP zerado renasce cheio e a loja é
  reajustada ao tier já desbloqueado de cada peça.

## Arquivos

- `index.html` — estrutura da página
- `style.css` — visual
- `game.js` — toda a lógica
- `monstros/anim/` — spritesheets animados (idle, hit e morte) dos 18 inimigos
- `personagens/` — retratos do cruzado e do antimodelo (WebP). O herói **sempre**
  mantém o mesmo retrato e a mesma pose; a build só sobrepõe o ícone do item
  equipado (com a cor da raridade) na mão dele. Sem peça equipada, fica só o
  cruzado.
- `icones/` — sprites SVG dos itens

## Bestiário animado

Os inimigos usam spritesheets WebP com 8 colunas x 6 linhas (idle, movimento,
ataque, hit, morte e especial). O jogo toca **idle** em loop, **hit** ao acertar
e **morte** no Boss Demônio do desafio inicial. São 18 criaturas, incluindo os
chefes Baphomet, Lilith e Lúcifer.

## Herói e fase secreta

- **Herói normal:** cruzado. **Fase secreta 666:** após a bênção, o jogo troca
  para o antimodelo 666 mantendo a mesma build.
- Os retratos em tempo real vêm de `sprite_request/hero/presets/` e
  `sprite_request/antimodelo_666/presets/`: `base`, `lamina`, `mira`, `amuleto`,
  `fogo`, `gelo`, `raio`, `talisma` e `radiante`. O visual segue a peça mais
  forte equipada; luva elemental escolhe `fogo`/`gelo`/`raio` e qualquer
  radiante impõe o visual `radiante`.
- O pacote modular (`sprite_request/`) traz 37 camadas PNG por forma,
  `build_manifest.json`, `sprite_build_response.json` e `contact_sheet.png`.
  Ele resolve as 20.736 combinações de slots, raridades e elementos sem
  precisar de uma imagem por combinação.
- Os retratos antigos em `personagens/hero_builds/` e `personagens/anti_builds/`
  ficam só como reserva; o jogo não os carrega mais.
- ícones vêm do pack Crusader: 7 categorias × 5 raridades × 2 formas em
  `icones/hero/` e `icones/antimodel/`; a luva troca de ícone com o elemento.
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

Comprar uma luva define o poder da magia. **Antes da dádiva de Deus a loja não
vende luva nenhuma** (nem na oferta inicial, nem na rerolagem, nem na reposição
de raridade); depois da bênção ela só oferece luvas do elemento escolhido, e o
poder liga sozinho quando a recarga termina:

| Poder | Emoji | Efeito |
|-------|-------|--------|
| Fogo | 🔥 | Dano mágico ×1,25 |
| Gelo | ❄️ | +5% de acerto |
| Raio | ⚡ | +5% de crítico |

A primeira recarga leva **8s**; as seguintes **4s**, com `-0,5s` por nível
(mínimo `1,5s`). A barra mostra o progresso e o rótulo conta os segundos.
A magia só pode ser turbinada com **UPGRADE** (custo `40 + nível × 35` moedas)
depois de equipar uma luva; o nível aumenta o DPS (`2 + nível × 2` por segundo).

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
Na primeira run o Boss Demônio se apresenta por ~3s: fala digitada, brilho
extra e nenhum dano (cliques e magia são ignorados). Nas próximas runs a
chegada volta a ser rápida.

### Configurações

Volume · Música ambiente · Qualidade (Auto/Alta/Média) · Movimento reduzido ·
Salvar progresso · Resetar save. Progresso salvo em `localStorage` com progresso
offline (moedas e mortes acumuladas enquanto o jogador esteve fora).
