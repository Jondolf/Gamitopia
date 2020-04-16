<template>
  <div class="about">
    <div class="about-container">
      <div class="about-gamitopia">
        <h2>About Gamitopia</h2>
        <p>
          Gamitopia is a website with completely free games made by me. My goal
          is to make fun games and projects and learn programming along the way.
        </p>
        <h3>Made with:</h3>
        <br />
        <ul>
          <li>HTML</li>
          <li>SCSS/CSS</li>
          <li>TS/JS</li>
          <li>Vue.js</li>
          <li>Nest.js</li>
          <li>TypeORM</li>
        </ul>
      </div>
      <div class="about-me">
        <h2>About me</h2>
        <p>
          I am a Finnish junior high school student who has worked with HTML,
          CSS and JavaScript for roughly 3-4 years. I have also worked with Vue,
          SCSS and TypeScript.
          <br />
          <a href="https://github.com/Jondolf" target="_blank"
            >The link to my GitHub profile</a
          >
        </p>
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
        <h3>Software that I use</h3>
        <ul>
          <li>Visual Studio Code (for web development)</li>
          <li>Visual Studio (for Unity related)</li>
          <li>Unity Personal</li>
          <li>Garageband (for game music)</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'about',
  components: {}
});
</script>

<style lang="scss">
.about {
  padding-top: 66px;
  height: 100%;
  display: flex;
  justify-content: center;
  .about-container {
    min-height: 200px;
    width: 80%;
    background-color: var(--secondary-color);
    color: white;
    margin: 30px auto;
    display: flex;
    flex-direction: row;
    text-align: left;
    padding: 20px;
    border-radius: 5px;
    justify-content: space-between;
    h2 {
      margin: 0;
      margin-bottom: 15px;
    }
    .about-gamitopia,
    .about-me {
      display: flex;
      flex-direction: column;
      width: 50%;
      height: 100%;
      padding: 10px;
      h3,
      ul {
        margin-top: 15px;
        width: 100%;
      }
    }
  }

  .about-gamitopia div {
    width: 40%;
    border-radius: 5px;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }
}

@media only screen and (max-width: 550px) {
  .about {
    .about-container {
      flex-direction: column;
      padding: 10px;
      margin: 30px;
      justify-content: center;
      align-items: center;

      p {
        font-size: 14px;
        width: 100%;
      }
      .about-gamitopia,
      .about-me {
        width: 100%;
      }
      .about-me {
        margin-top: 20px;
      }
    }
  }
}
</style>
