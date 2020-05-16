<template>
  <div class="start-menu" ref="startMenu">
    <div class="animatable-background-img" ref="animatableBackgroundImg"></div>
    <div class="background-img" ref="backgroundImg"></div>
    <div class="ui-elements" v-if="currentView === 'Start menu'">
      <h1>Adventura</h1>
      <div class="btn-container">
        <button
          v-if="checkIfGameStarted('continue')"
          v-on:click="changeView('map')"
        >
          Continue adventure
        </button>
        <button v-on:click="checkIfGameStarted('reset')">
          Start new adventure
        </button>
        <div class="dark-overlay" v-if="confirmResetBtnVisibility"></div>
        <div class="confirm-reset-progress" v-if="confirmResetBtnVisibility">
          <h2>CONFIRM RESET?</h2>
          <p>
            All of your saved progress will be erased and you will have to start
            over.
          </p>
          <div class="confirm-reset-btn-container">
            <button v-on:click="confirmResetBtnVisibility = false">
              Cancel
            </button>
            <button
              v-on:click="
                resetProgress();
                changeView('map');
              "
            >
              Reset progress
            </button>
          </div>
        </div>
        <button v-on:click="changeView('instructions')">Instructions</button>
        <button v-on:click="changeView('settings')">Settings</button>
      </div>
    </div>
    <Instructions
      v-if="currentView === 'Instructions'"
      @closeInstructions="changeView('startMenu')"
    />
    <Settings
      v-if="currentView === 'Settings'"
      :fullscreenOn="fullscreenOn"
      :musicOn="musicOn"
      :sfxOn="sfxOn"
      @closeSettings="changeView('startMenu')"
      @toggleFullscreen="toggleFullscreen"
      @toggleMusic="toggleMusic"
      @toggleSfx="toggleSfx"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Area } from './area';
import Settings from './Settings.vue';
import Instructions from './Instructions.vue';
export default Vue.extend({
  name: 'start-menu',
  components: {
    Settings,
    Instructions
  },
  props: {
    unlockedAreas: Array as () => Area[],
    currentView: String,
    fullscreenOn: Boolean,
    musicOn: Boolean,
    sfxOn: Boolean
  },
  data() {
    return {
      confirmResetBtnVisibility: false
    };
  },
  methods: {
    changeView(viewName: string) {
      this.$emit(viewName);
    },
    checkIfGameStarted(param: string) {
      if (param === 'continue') {
        if (localStorage.getItem('coins')) {
          return true;
        }
        return false;
      } else if (param === 'reset') {
        if (localStorage.getItem('coins')) {
          this.confirmResetBtnVisibility = true;
        } else {
          this.changeView('map');
        }
      }
    },
    resetProgress() {
      if (localStorage.getItem('coins')) {
        setTimeout(() => {
          location.reload();
        }, 1);
      }
      localStorage.removeItem('adventurabossesDefeated');
      localStorage.removeItem('adventuracoins');
      localStorage.removeItem('adventuramaxHealth');
      localStorage.removeItem('adventuramaxMana');
      localStorage.removeItem('adventuraunlockedAreas');
      localStorage.removeItem('adventuraunlockedMoves');
      localStorage.removeItem('adventurahealthLevel');
      localStorage.removeItem('adventurahealthUpgradeCost');
      localStorage.removeItem('adventuramanaLevel');
      localStorage.removeItem('adventuramanaUpgradeCost');
      localStorage.removeItem('adventuraswordLevel');
      localStorage.removeItem('adventurafireLevel');
      localStorage.removeItem('adventurawaterLevel');
      localStorage.removeItem('adventuraiceLevel');
      localStorage.removeItem('adventuraearthLevel');
      localStorage.removeItem('adventuraairLevel');
      localStorage.removeItem('adventuralightningLevel');
      localStorage.removeItem('adventurahealLevel');
      localStorage.removeItem('adventuraswordUpgradeCost');
      localStorage.removeItem('adventurafireUpgradeCost');
      localStorage.removeItem('adventurawaterUpgradeCost');
      localStorage.removeItem('adventuraiceUpgradeCost');
      localStorage.removeItem('adventuraearthUpgradeCost');
      localStorage.removeItem('adventuraairUpgradeCost');
      localStorage.removeItem('adventuralightningUpgradeCost');
      localStorage.removeItem('adventurahealUpgradeCost');
      localStorage.removeItem('adventuraironSwordMinDamage');
      localStorage.removeItem('adventurafireMinDamage');
      localStorage.removeItem('adventurawaterMinDamage');
      localStorage.removeItem('adventuraiceMinDamage');
      localStorage.removeItem('adventuraearthMinDamage');
      localStorage.removeItem('adventuraairMinDamage');
      localStorage.removeItem('adventuralightningMinDamage');
      localStorage.removeItem('adventuraironSwordMaxDamage');
      localStorage.removeItem('adventurafireMaxDamage');
      localStorage.removeItem('adventurawaterMaxDamage');
      localStorage.removeItem('adventuraiceMaxDamage');
      localStorage.removeItem('adventuraearthMaxDamage');
      localStorage.removeItem('adventuraairMaxDamage');
      localStorage.removeItem('adventuralightningMaxDamage');
      localStorage.removeItem('adventurahealAmount');
    },
    toggleFullscreen() {
      this.$emit('toggleFullscreen');
    },
    toggleMusic() {
      this.$emit('toggleMusic');
    },
    toggleSfx() {
      this.$emit('toggleSfx');
    },
    setBackgroundImg() {
      const animatableBackgroundImg = this.$refs
        .animatableBackgroundImg as HTMLElement;
      const backgroundImg = this.$refs.backgroundImg as HTMLElement;
      if (
        this.unlockedAreas[this.unlockedAreas.length - 1]
          .animatableBackgroundImgSrc !== null
      ) {
        animatableBackgroundImg.style.backgroundImage = `url(${
          this.unlockedAreas[this.unlockedAreas.length - 1]
            .animatableBackgroundImgSrc
        })`;
      } else {
        animatableBackgroundImg.style.display = 'none';
      }
      backgroundImg.style.backgroundImage = `url(${
        this.unlockedAreas[this.unlockedAreas.length - 1].backgroundImgSrc
      })`;
    }
  },
  mounted() {
    this.setBackgroundImg();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';

@keyframes BACKGROUND-MOVE {
  0% {
    background-position-x: 0;
  }
  100% {
    background-position-x: 10000000px;
  }
}
@keyframes HEADER-ANIMATION {
  0% {
    font-size: 25px;
  }
  50% {
    font-size: 30px;
    font-weight: bold;
  }
  100% {
    font-size: 25px;
  }
}
.start-menu {
  height: 100%;
  overflow: hidden;
  .animatable-background-img,
  .background-img {
    height: 100%;
    background-size: auto 100%;
    background-position-y: bottom;
    background-repeat: repeat-x;
    z-index: 1;
  }
  .animatable-background-img {
    animation: BACKGROUND-MOVE 1000000s linear infinite;
  }
  .background-img {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .dark-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.75);
  }
  .confirm-reset-progress {
    background-color: white;
    color: black;
    width: 65%;
    position: absolute;
    margin: auto;
    padding: 5px;
    z-index: 4;
    .confirm-reset-btn-container {
      display: flex;
      padding: 10px;
      button {
        padding: 5px;
        background-color: black;
        color: white;
        margin: 10px;
      }
      button:hover {
        background-color: maroon;
        padding: 8px;
      }
    }
  }
  .ui-elements {
    z-index: 2;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 84px;
    color: white;
    text-shadow: 0 0 3px black;
    animation: HEADER-ANIMATION 10s infinite;
  }
  .btn-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 50%;
    button {
      background-color: rgba(255, 255, 255, 0.7);
      color: black;
      width: 60%;
      height: 8vh;
      padding: 0 15px;
      border: none;
      border-radius: 5px;
      transition: 0.4s;
    }
    button:hover {
      background-color: rgba(255, 255, 255, 0.9);
      width: 65%;
      padding: 20px;
    }
  }
}
</style>
