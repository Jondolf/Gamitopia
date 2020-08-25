# 🌴 Gamitopia

## Description

[Gamitopia](http://gamitopia.herokuapp.com/) is a website with completely free games and apps all made by me. I publish my projects there and make news/blog posts about the development process and about new game releases.

<img src="https://github.com/Jondolf/Gamitopia/blob/master/src/assets/images/gamitopia_logo_circle.png" width="250" height="250"/>

## Project Structure

The website is a SPA (Single Page Application) made with Vue.js hosted by Heroku.  
The backend is made with Nest.js and TypeORM and uses a Postgres database provided by Heroku.  

Below is a quick overview of the most important folders and files excluding config files.

[gamitopia-backend/](https://github.com/Jondolf/Gamitopia/tree/master/gamitopia-backend) contains the backend  

[src/](https://github.com/Jondolf/Gamitopia/tree/master/src) contains the website's source files, such as assets and *.vue files  
[src/assets](https://github.com/Jondolf/Gamitopia/tree/master/src/assets) contains assets, such as images and audio  
[src/components/](https://github.com/Jondolf/Gamitopia/tree/master/src/components) contains Vue component files  
[src/composables/](https://github.com/Jondolf/Gamitopia/tree/master/src/composables) contains Vue composable files used by Vue 3's Composition API  
[src/interfaces/](https://github.com/Jondolf/Gamitopia/tree/master/src/interfaces) contains widely used TypeScript interfaces  
[src/router](https://github.com/Jondolf/Gamitopia/tree/master/src/router) contains the Vue Router routes  
[src/store](https://github.com/Jondolf/Gamitopia/tree/master/src/store) contains the Vuex store and it's modules  
[src/views/](https://github.com/Jondolf/Gamitopia/tree/master/src/views) contains Vue view files

[public/](https://github.com/Jondolf/Gamitopia/tree/master/public) Contains most of the static files and assets  
[tests/](https://github.com/Jondolf/Gamitopia/tree/master/tests) Contains the website's tests  