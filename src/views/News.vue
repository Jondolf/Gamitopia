<template>
  <div id="news">
    <router-link to="/admin/create-news-post" v-if="isAdmin"
      ><button class="create-news-post-btn">Create new</button>
    </router-link>

    <div class="filter">
      <h2>Filter</h2>
      <div class="btn-container">
        <button v-on:click="filterByYear('Show all')">All</button>
        <button v-on:click="filterByYear('2020')">2020</button>
        <button v-on:click="filterByYear('2019')">2019</button>
      </div>
    </div>
    <div class="news-posts-container">
      <NewsPost
        v-for="newsPost in news"
        :key="newsPost.id"
        :id="newsPost.id"
        :title="newsPost.title"
        :body="newsPost.body"
        :date="formatDate(newsPost.date)"
      />
    </div>
    <!--
    <div class="news-post">
      <h2>What I've been up to</h2>
      <p>
        So for the past month I have been doing a lot of very different stuff.
        <br />
        At the start of January I made a small update to Cookie Clicker which
        involved transferring it to Vue properly, updating the visuals a bit,
        adding some animations etc. I also added a simple filter system to the
        news page (as you can see if you look at the top of this page) that
        enables you to filter the news posts by year.
        <br />
        <br />
        The different thing that I mentioned is Unity. I have learnt the very
        basics of the Unity Game Engine and C# and made some small test games:
        an FPS test with physics, Pong (the old game with the two paddles moving
        up and down and a ball bouncing off of them) and a tiny platformer test.
        I made these tests just to see how the game engine works and if it's
        something I could actually learn (it is). I have also always wanted to
        learn it as I want to make bigger, better games.
        <br />
        <br />
        The point of this post was to inform you of what I've been doing. I also
        believe that it's possible to transport Unity games to the web so if it
        works this site might get some more games fairly soon.
      </p>
      <h6>24.1.2020</h6>
    </div>
    <div class="news-post">
      <h2>Snake</h2>
      <p>
        Yet another game has been released for Gamitopia, and this one is a
        classic. Slither around as a snake as you collect fruit and grow bigger
        to increase your score.
        <br />
        If you hit a wall or your own tail, your snake dies and you will have to
        try again.
        <br />
        <br />
        I also added a settings menu where you can make the game a lot more
        interesting by changing the size of the game area or
        increasing/decreasing the speed of your snake.
        <br />
        <br />
        I will update the game later this year by adding settings that will
        generate random walls around the game area whenever you restart to make
        navigating around a lot more interesting, settings to maybe change the
        color of the snake and the walls, settings to change how often fruit
        spawns and settings to choose if you want the snake's speed to change
        whenever you get a fruit.
        <br />
        <br />
        You can play snake <router-link to="/snake">here</router-link>
      </p>
      <h6>3.1.2020</h6>
    </div>
    <div class="news-post">
      <h2>New Year 2019-2020</h2>
      <p>
        Happy New Year's Eve!
        <br />
        At midnight tonight we will transition into 2020, the beginning of a new
        year, the beginning of a whole new decade.
        <br />
        <br />
        I said in a previous post that I would discuss my plans for the
        beginning year. That's what I'm going to do now.
      </p>
      <h3>My plans for 2020</h3>
      <p>
        I will most likely be mostly doing updates to the games this website
        already has, as well as a couple new games.
        <br />
        I would also like to make some kind of admin related stuff for this
        website (being able to create, edit or delete news posts for example)
        but I'm not quite sure yet.
        <br />
        <br />
        Below is a list of things I would like to do to this website in 2020.
      </p>
      <ul>
        <li>Updating current games, adding more content to them</li>
        <li>Making a few new games (one of them I have started)</li>
        <li>Admin system</li>
        <li>Visual improvements</li>
        <li>
          Overall a slightly better design and layout for the main components of
          the website
        </li>
        <li>
          Making the website even more responsive (works well on screens of all
          sizes)
        </li>
        <li>Etc.</li>
      </ul>
      <p  >
        It's important to remember that these are things that I
        <strong>may</strong> do, not things that I <strong>will</strong> do.
        <br />With all that said, happy New Year!
      </p>
      <h6>31.12.2019</h6>
    </div>
    <div class="news-post">
      <h2>Adventura</h2>
      <p>
        Gamitopia's 4th game, Adventura, has been released!
        <br />
        Adventura is a turn based combat game where you fight enemies and
        bosses, become stronger and discover the many different areas.
        <br />
        <br />
        Adventura is my most visually impressive game so far and it will also be
        easier to update as I can just add more areas with new enemies and
        weapons.
        <br />
        <br />
        Some potential updates include lots of new areas and enemies, seasonal
        areas such as a Halloween area that will be available for only a certain
        period of time, proper mobile support and much more.
        <br />
        <br />
        You can play Adventura <router-link to="/adventura">here</router-link>
      </p>
      <h6>24.12.2019</h6>
    </div>
    <div class="news-post">
      <h2>Merry Christmas 2019</h2>
      <p>
        Merry Christmas everyone!
        <br />
        <br />
        Unfortunately this blog is the only Christmas related thing I will be
        able to do for Gamitopia this Christmas as I have been very busy with
        school and the new game that I have been making for over a month (the
        next blog will be about that).
        <br />
        <br />
        While it's not necessarily Christmas related, the new game that I
        mentioned, Adventura is now released! It's my most impressive game so
        far and I'm really proud about it and I hope you'll enjoy playing it!
        <br />
        <br />
        I also made some minor changes to the website. I added an About Me
        section to the About page and highlighted the lists on the News page.
        <br />
        <br />
        Now that the game is officially released and I have a break from school,
        I'll most likely take a little break from coding actively. I do however
        have some plans for the future of this website and I will address them
        in a future blog coming on New Years Eve.
        <br />
        <br />
        With that said I wish you a Merry Cristmas and a happy new year.
      </p>
      <h6>24.12.2019</h6>
    </div>
    <div class="news-post">
      <h2>Tic-Tac-Toe Update</h2>
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
      <h2>Tic-Tac-Toe</h2>
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
      <h2>Transitioning to Vue.js</h2>
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
      <h2>Randomizer</h2>
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
      <h2>Dark Theme</h2>
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
      <h2>Cookie Clicker</h2>
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
      <h2>The Journey Begins</h2>
      <p>
        Welcome to Gamitopia, the website with small games and projects all made
        by me! Whenever I publish games or make big updates to games or the
        website in general, I will make a news-post just like this one. Have
        fun!
      </p>
      <h6>31.8.2019</h6>
    </div>
    -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios, { AxiosResponse } from 'axios';

import NewsPost from '@/components/news/NewsPost.vue';

import { getNewsPosts } from './admin/actions/getNewsPosts';
import News from './admin/interfaces/newsInterface';

import globalVariables from '@/global.variables';

export default Vue.extend({
  name: 'news',
  components: { NewsPost },
  data() {
    return {
      news: [] as News[],
      isAdmin: globalVariables.isAdmin
    };
  },
  methods: {
    formatDate(date: string) {
      return date
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-')
        .replace(/-/g, '.');
    },

    filterByYear(year: string) {
      const newsPosts = document.getElementsByClassName('news-post') as any;
      for (let post of newsPosts) {
        let date = post.getElementsByTagName('time')[0] as HTMLTimeElement;
        if (date.innerText.includes(year)) {
          post.style.display = 'block';
        } else if (year === 'Show all') {
          post.style.display = 'block';
        } else {
          post.style.display = 'none';
        }
      }
    }
  },
  async mounted() {
    this.news = await getNewsPosts();
  }
});
</script>

<style lang="scss">
@import '@/global.scss';
a:visited {
  color: white;
}
a:hover {
  color: rgb(200, 200, 255);
}
.darkMode .filter button {
  color: white;
}

#news {
  padding-top: 86px;
  .create-news-post-btn {
    width: 10%;
    height: 35px;
    margin-bottom: 20px;
    border: none;
    border-radius: 5px;
    opacity: none;
    color: white;
    background-color: var(--secondary-color);
    transition: 0.4s;
  }
  .create-news-post-btn:hover {
    border-radius: 10px;
  }
  .filter {
    width: 50%;
    padding: 25px;
    border-radius: 5px;
    text-align: left;
    background-color: var(--secondary-color);
    margin: auto;
    h2 {
      color: white;
    }
    .btn-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
    }
    button {
      background-color: var(--primary-color);
      width: 33%;
      padding: 15px 0 15px 0;
      border: none;
      outline: none;
      margin: 0 15px 0 0;
      border-radius: 5px;
      transition: 0.4s;
    }
    button:last-child {
      margin: 0;
    }
    button:hover {
      padding: 18px;
    }
  }
  .news-posts-container {
    display: flex;
    flex-direction: column-reverse;
  }
}
</style>
