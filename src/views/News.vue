<template>
  <div id="news">
    <div class="news-post">
      <h3>Tic-Tac-Toe Update</h3>
      <p>
        Tic-Tac-Toe has received a farely large update!
        <br />Here's a quick list of the changes:
      </p>
      <ul>
        <li>A start menu has been added</li>
        <li>An instructions menu has been added</li>
        <li>A settings menu has been added</li>
        <li>You can now change the size of the grid from the settings</li>
        <li>
          You can now also change how many X's or O's you need in a row to win
          from the settings
        </li>
        <li>Some visual improvements</li>
        <li>
          The game is now more responsive (works with different screen sizes)
        </li>
      </ul>
      <p>
        That's it for now. I'll probably make some more small changes to the
        game in the future, mainly visual improvements.
      </p>
      <h6>18.10.2019</h6>
    </div>
    <div class="news-post">
      <h3>Tic-Tac-Toe</h3>
      <p>
        Gamitopia's 3rd game has already been released! <br /><br />Tic-Tac-Toe
        is a game that we all know and have played at one point in our lives. If
        you haven't (and even if you have), play it now and read the rules in
        the description! <br /><br />You can play Tic-Tac-Toe
        <router-link to="/tic-tac-toe">here</router-link> <br /><br /><strong
          >*Note</strong
        ><br />Currently the game has only one grid size and game mode, so you
        have to play it locally with someone else (or yourself). Later on I will
        most likely update the game: add a 4x4 grid, a start menu and an AI to
        play against.
      </p>
      <h6>12.10.2019</h6>
    </div>
    <div class="news-post">
      <h3>Transitioning to Vue.js</h3>
      <p>
        For the past week I have been busy coding.
        <br />I have set up a framework called Vue.js for my website, which
        makes it a lot easier to maintain and improve and add content. It also
        adds some challenges like having to learn how Vue.js works and how to
        utilize it for my needs. <br />With Vue.js set up, my website is now a
        single page application. Because of that the website will have to load
        only once (per visit) so going from, for example, the homepage to the
        news-page will be instant. <br />I haven't properly transferred the
        games to Vue.js yet, so the code is quite messy and hard to read.
        Eventually I will try to fully change the games to properly utilize the
        capabilities of Vue.js but for now it will remain the way it is.
        <br />
        <br />I am now going to address my plans for this website. <br />I would
        like to:
        <br />
      </p>
      <ul>
        <li>Improve the visual appearance</li>
        <li>
          Add an admin system, which would make it possible to add, edit or
          delete news-posts from the website itself without having to touch the
          HTML files. This would also mean making a working database (and
          learning SQL)
        </li>
        <li>Add more games (obviously)</li>
        <li>
          Properly utilize Vue.js capabilities, therefore making the code easier
          to read and maintain
        </li>
        <li>
          Update the current games (which I may or may not discuss in a later
          news-post)
        </li>
      </ul>
      <p>
        <br />I also did some minor other changes, mostly typos and updating
        info on the about-page. That's it for now.
      </p>
      <h6>9.10.2019</h6>
    </div>
    <div class="news-post">
      <h3>Randomizer</h3>
      <p>
        The second game on Gamitopia, Randomizer, is now published!
        <br />In Randomizer, you can get random things like numbers and more by
        pressing a button. Open a menu to choose what to randomize.
        <br />Currently Randomizer has only three things to randomize, but more
        will come later on. <br />You can play Randomizer
        <router-link to="/randomizer">here</router-link>
      </p>
      <h6>30.9.2019</h6>
    </div>
    <div class="news-post">
      <h3>Dark Theme</h3>
      <p>
        For those who are looking at screens late at night or just like dark
        colors, the dark theme has been added! Press the icon at the top-left
        corner to activate it. Press the icon again to go back to light mode.
        Your choice of the theme will be saved, so if you had dark theme on when
        you left the website, it will stay the same when you come back. Note
        that all games may not support the dark theme so some games may appear
        quite bright when the dark theme is on.
      </p>
      <h6>6.9.2019</h6>
    </div>
    <div class="news-post">
      <h3>Cookie Clicker</h3>
      <p>
        Gamitopia's first game, Cookie Clicker is now finished!
        <br />Bake cookies by clicking the large cookie. Use those cookies to
        buy upgrades. Upgrades will help you bake lots of cookies faster. Get
        baking and become a cookie bazillionaire! <br />You can play Cookie
        Clicker
        <router-link to="/cookie-clicker">here</router-link>
      </p>
      <h6>31.8.2019</h6>
    </div>
    <div class="news-post">
      <h3>The Journey Begins</h3>
      <p>
        Welcome to Gamitopia, the website with small games and projects all made
        by me! Whenever I publish games or make big updates to games or the
        website in general, I will make a news-post just like this one. Have
        fun!
      </p>
      <h6>31.8.2019</h6>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "news",
  components: {}
});
</script>

<style lang="scss">
@import "@/global.scss";
a:visited {
  color: white;
}
a:hover {
  color: rgb(200, 200, 255);
}
#news {
  padding-top: 86px;
  .news-post {
    width: 70%;
    background-color: var(--secondary-color);
    color: white;
    margin: 20px auto;
    padding: 30px;
    text-align: left;
    border-radius: 5px;
    p {
      margin: 15px auto 15px auto;
    }

    a {
      font-weight: bolder;
      font-style: italic;
    }
  }
}
#news .news-post .darkMode a {
  font-weight: bolder;
  font-style: italic;

  color: red;
}
</style>
