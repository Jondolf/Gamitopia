import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    games: [
      {
        name: 'Snake',
        route: '/snake',
        thumbnailImgSrc: require('@/assets/images/game-thumbnails/snake_thumbnail.jpg'),
        thumbnailImgAlt: 'Snake game',
        releaseDate: '3.1.2020'
      },
      {
        name: 'Adventura',
        route: '/adventura',
        thumbnailImgSrc: require('@/assets/images/game-thumbnails/adventura_thumbnail.jpg'),
        thumbnailImgAlt: 'Adventura game',
        releaseDate: '24.12.2019'
      },
      {
        name: 'Tic-Tac-Toe',
        route: '/tic-tac-toe',
        thumbnailImgSrc: require('@/assets/images/game-thumbnails/tic_tac_toe_thumbnail.jpg'),
        thumbnailImgAlt: 'Tic-Tac-Toe game',
        releaseDate: '12.10.2019'
      },
      {
        name: 'Randomizer',
        route: '/randomizer',
        thumbnailImgSrc: require('@/assets/images/game-thumbnails/randomizer_thumbnail.jpg'),
        thumbnailImgAlt: 'Randomizer game',
        releaseDate: '30.9.2019'
      },
      {
        name: 'Cookie Clicker',
        route: '/cookie-clicker',
        thumbnailImgSrc: require('@/assets/images/game-thumbnails/cookie_clicker_thumbnail.jpg'),
        thumbnailImgAlt: 'Cookie Clicker game',
        releaseDate: '31.8.2019'
      }
    ]
  }
});
