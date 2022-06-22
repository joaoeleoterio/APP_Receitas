
# Habilidades

Nesse projeto, foi utilizado:

  - _Redux_ para gerenciar estado
  - a biblioteca _React-Redux_
  - a Context API do _React_ para gerenciar estado
  - o _React Hook useState_
  - o _React Hook useContext_
  - o _React Hook useEffect_
  - Criação de Hooks customizados

---

## O que deverá ser desenvolvido

Um app de receitas, utilizando o que há de mais moderno dentro do ecossistema React: Hooks e Context API!

Nele será possível ver, buscar, filtrar, favoritar e acompanhar o progresso de preparação de receitas e drinks!

A base de dados serão 2 APIs distintas, uma para comidas e outra para bebidas.

O layout tem como foco dispositivos móveis, então todos os protótipos vão estar desenvolvidos em telas menores.


## APIs

### TheMealDB API

O [TheMealDB](https://www.themealdb.com/) é um banco de dados aberto, mantido pela comunidade, com receitas e ingredientes de todo o mundo.

Os end-points são bastante ricos, você pode [vê-los aqui](https://www.themealdb.com/api.php)


### The CockTailDB API

Bem similar (inclusive mantida pela mesma entidade) a TheMealDB API, só que focado em bebidas.

Os end-points também são bastante ricos, você pode [vê-los aqui](https://www.thecocktaildb.com/api.php)

As respostas seguem a mesma estrutura, com algumas particularidades relativas às bebidas (como ser ou não alcoólica, por exemplo)


## Observações técnicas

* Utilizada a resolução de tela de `360 x 640` (360 pixels de largura por 640 pixels de altura).
