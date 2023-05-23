# 🌴 Gamitopia

## Maintenance update

Gamitopia doesn't really reflect my motivations or skills anymore, and I haven't updated it in a long time, so I have decided to archive the project.
You can still find the code in this repository, but the website will no longer be maintained or updated, and the blog is not available, as it used to be in a separate PostgreSQL database, which has now been shut down.

My new personal website can be found at https://joonaa.dev. It is similar to Gamitopia in that it contains a blog and some of my projects, but it has less of a focus on games, and it better represents my current capabilities and interests.

## Description

[Gamitopia](http://gamitopia.herokuapp.com/) is a website with completely free games and apps all made by me. I publish my projects there and make news/blog posts about the development process and about new game releases.

<img src="./src/assets/images/gamitopia_logo_circle.png" width="250" height="250"/>

## Project Structure

The website is a SPA (Single Page Application) made with Vue.js hosted by Heroku.\
The backend is made with Nest.js and TypeORM and uses a Postgres database provided by Heroku.

Below is a quick overview of the most important folders and files excluding config files.

[gamitopia-backend](https://github.com/Jondolf/Gamitopia/tree/master/gamitopia-backend) contains the backend

[src](./src) contains the website's source files, such as assets and \*.vue files\
[src/assets](./src/assets) contains assets, such as images and audio\
[src/components](./src/components) contains Vue component files\
[src/composables](./src/composables) contains Vue composable files used by Vue 3's Composition API\
[src/games](./src/games) contains all games and apps\
[src/interfaces](./src/interfaces) contains widely used TypeScript interfaces\
[src/router](./src/router) contains the Vue Router routes\
[src/store](./src/store) contains the Vuex store and it's modules\
[src/views](./src/views) contains Vue view files

[public](./public) Contains most of the static files and assets\
[tests](./tests) Contains the website's tests\
