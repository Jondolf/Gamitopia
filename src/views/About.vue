<template>
  <div id="about">
    <div class="about-container">
      <p>
        Gamitopia is a website with completely free games made by me. My goal is
        to make fun games and projects and learn programming along the way.
      </p>
      <div>
        <h3>Website Made With:</h3>
        <br />
        <ul>
          <li>HTML</li>
          <li>SCSS/CSS</li>
          <li>TS/JS</li>
          <li>Vue.js</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "about",
  components: {}
});
</script>

<style lang="scss">
#about {
  padding-top: 66px;
  height: 100%;
  display: flex;
  justify-content: center;
  .about-container {
    min-height: 200px;
    width: 80%;
    background-color: var(--secondary-color);
    color: white;
    margin: auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    padding: 20px;
    border-radius: 5px;
    justify-content: space-between;
  }

  p {
    width: 50%;
  }

  .about-container div {
    width: 40%;
    border-radius: 5px;
  }

  ul {
    list-style: none;
    padding-left: 0;
  }
}

@media only screen and (max-width: 550px) {
  .about-container {
    flex-direction: column;
    padding: 10px;

    p {
      font-size: 14px;
      width: 100%;
    }
    div {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
