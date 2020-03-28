<template>
  <div class="card-game">
    <div class="webgl-logo"></div>
    <h2>🏹 Target Practise</h2>
    <h2>!Not Officially Released, Isn't Finished!</h2>
    <h3>Loading the game may take a little while</h3>
    <div class="fullscreen" onclick="unityInstance.SetFullscreen(1)">
      Fullscreen
    </div>
    <Unity
      src="./Build/TargetPractise.json"
      width="700"
      height="438"
      unityLoader="./Build/UnityLoader.js"
    ></Unity>

    <div class="description">
      <div class="mainDescription">
        <h3>Description</h3>
        <p>
          In Target Practise you shoot at targets and try to get as much points
          as possible.
          <br />
          NOTE: This is unfinished and doesn't properly support all browsers.
        </p>
      </div>
      <div class="otherDescription">
        <div class="madeWith">
          <h3>Made with:</h3>
          <ul>
            <li>Unity 3D</li>
            <ul>
              <li>C#</li>
            </ul>
          </ul>
        </div>
        <div class="otherInfo">
          <h3>Other Info</h3>
          <p>Dark mode support: no</p>
          <br />
          <p>Fullscreen support: no</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Unity from 'vue-unity-webgl';

export default Vue.extend({
  name: 'TargetPractise',
  components: {
    Unity
  },

  mounted() {}
});
</script>

<style lang="scss">
.card-game {
  padding-top: 86px;

  h2 {
    margin: 30px;
  }
}

.webgl-content {
  #unity-container,
  #unity-container canvas {
    margin: auto !important;
    border-radius: 5px;
  }
}

.description {
  width: 70%;
  display: flex;
  background-color: var(--secondary-color);
  border-radius: 5px;
  margin: 50px auto;
  color: white;
  text-align: left;
  position: relative;
}

.description h3 {
  margin-bottom: 15px;
}

.mainDescription,
.otherDescription {
  padding: 20px;
  list-style: none;
  box-sizing: border-box;
}

.mainDescription {
  width: 60%;
  border-right: 1px solid;
}

.otherDescription {
  width: 40%;
  height: 100%;
}

.otherDescription li {
  list-style: none;
}

.madeWith {
  padding: 20px;
  height: 100%;
}

.otherInfo {
  padding: 20px;
  height: 100%;
}

@media only screen and (max-width: 620px) {
  .description {
    flex-direction: column;
    padding: 10px;
  }
  .mainDescription {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid;
    padding: 20px;
  }
  .otherDescription {
    width: 100%;
    padding: 0;
  }
}
</style>
