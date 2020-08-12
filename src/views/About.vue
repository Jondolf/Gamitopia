<template>
  <div class="about">
    <div class="about-gamitopia">
      <h2>About Gamitopia</h2>
      <p>
        Gamitopia is a website with completely free games made by me. My goal is to make fun games and projects and
        learn programming along the way.
      </p>

      <div class="bottom-container">
        <div class="made-with">
          <h3>Made with</h3>
          <ul>
            <li>HTML</li>
            <li>SCSS/CSS</li>
            <li>TS/JS</li>
            <li>Vue.js</li>
            <li>Nest.js</li>
            <li>TypeORM</li>
          </ul>
        </div>

        <div class="gamitopia-logo-container">
          <img src="@/assets/images/paradise_island.png" alt="Gamitopia logo" />
        </div>
      </div>
    </div>

    <div class="about-me">
      <h2>About me</h2>
      <p>
        I am a Finnish junior high school student who has worked with HTML, CSS and JavaScript for roughly 3-4 years. I
        have also worked with Vue, SCSS and TypeScript.
        <br />
        <a href="https://github.com/Jondolf" target="_blank">The link to my GitHub profile</a>
      </p>

      <div class="bottom-container">
        <div class="languages-that-i-have-used">
          <h3>Languages that I have used (and more)</h3>
          <ul>
            <li>HTML</li>
            <li>SCSS/CSS</li>
            <li>TS/JS</li>
            <li>Vue.js 2</li>
            <li>A bit of Angular</li>
            <li>Nest.js</li>
            <li>Some C# (with Unity)</li>
            <li>A bit of Python 2 & 3</li>
            <li>A tiny bit of Java</li>
          </ul>
        </div>

        <div class="software-that-i-use">
          <h3>Software that I use</h3>
          <ul>
            <li>Visual Studio Code (for web development)</li>
            <li>Visual Studio (for Unity related)</li>
            <li>Unity Personal</li>
            <li>Garageband (for game music)</li>
            <li>Trello (for planning)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'About'
});
</script>

<style lang="scss" scoped>
.about {
  padding-top: 76px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .about-gamitopia,
  .about-me {
    width: 80vw;
    background-color: var(--color-primary);
    color: white;
    text-align: left;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 5px;
    box-sizing: border-box;

    h2 {
      margin: 0;
      margin-bottom: 20px;
    }

    .bottom-container {
      display: flex;
      width: 100%;
      box-sizing: border-box;

      div {
        width: 50%;
        padding-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        &:first-child {
          padding-right: 10px;
        }
        &:last-child {
          padding-left: 10px;
        }

        img {
          justify-self: center;
          height: 35vw;
          max-height: 40vh;
        }
      }

      h3 {
        margin-bottom: 5px;
      }

      h3,
      ul {
        margin-top: 0;
        width: 100%;
      }

      li {
        list-style: inside;
      }
    }
  }
}

@media only screen and (max-width: 500px) {
  .about .about-gamitopia .bottom-container,
  .about .about-me .bottom-container {
    flex-direction: column;

    div {
      width: 100%;
      &:first-child,
      &:last-child {
        padding: 20px 0 0 0;
      }

      img {
        height: 60vw;
        max-height: 60vw;
      }
    }
  }
}
</style>
