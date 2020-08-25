<template>
  <div id="about">
    <PageHeader>About</PageHeader>

    <div class="about-gamitopia">
      <h2>About Gamitopia</h2>
      <p>
        Gamitopia is a website with completely free games made by me. My goal is to make fun games and projects and
        learn programming along the way.
        <br />
        <a href="https://github.com/Jondolf/Gamitopia" target="_blank">A link to Gamitopia's GitHub repository</a>
      </p>

      <div class="bottom-container">
        <div class="made-with">
          <h3>Made with</h3>
          <h4>Frontend</h4>
          <ul>
            <li>Vue.js</li>
            <li>HTML</li>
            <li>SCSS</li>
            <li>TypeScript</li>
          </ul>
          <h4>Backend</h4>
          <ul>
            <li>Nest.js (with TypeScript)</li>
            <li>TypeORM</li>
          </ul>
        </div>

        <div class="gamitopia-logo-container">
          <img src="@/assets/images/gamitopia_logo.jpg" alt="Gamitopia logo" />
        </div>
      </div>
    </div>

    <div class="about-me">
      <h2>About me</h2>
      <p>
        I am a Finnish junior high school student who has worked with HTML, CSS and JavaScript for roughly 3-4 years. I
        have also worked with Vue, SCSS and TypeScript.
        <br />
        <a href="https://github.com/Jondolf" target="_blank">A link to my GitHub profile</a>
      </p>

      <div class="bottom-container">
        <div class="languages-that-i-have-used">
          <h3>Programming languages & frameworks that I have used</h3>
          <h4>Web</h4>
          <ul>
            <li>HTML</li>
            <li>SCSS/CSS</li>
            <li>TypeScript/JavaScript</li>
            <li>Vue.js</li>
            <li>A bit of Angular</li>
            <li>Nest.js</li>
          </ul>
          <h4>Other</h4>
          <ul>
            <li>Some C# (with Unity)</li>
            <li>A bit of Python</li>
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
import PageHeader from '@/components/PageHeader.vue';

export default defineComponent({
  name: 'About',

  components: {
    PageHeader
  }
});
</script>

<style lang="scss" scoped>
#about {
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
          border-radius: 5px;
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

      h4 {
        width: 100%;
        margin: 5px 0;
      }

      li {
        list-style: inside;
      }
    }
  }
}

@media only screen and (max-width: 500px) {
  #about .about-gamitopia .bottom-container,
  #about .about-me .bottom-container {
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
