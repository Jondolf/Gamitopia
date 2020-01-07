<template>
  <div id="cookie-clicker">
    <audio v-if="musicOn" loop="true" autoplay ref="backgroundMusic">
      <source
        src="@/assets/sound/cookie-clicker-background-music.mp3"
        type="audio/mp3"
      />
    </audio>
    <audio v-if="sfxOn" ref="cookieClickSound">
      <source
        src="@/assets/sound/cookie-clicker-sound-effect.mp3"
        type="audio/mp3"
      />
    </audio>
    <h2>Cookie Clicker</h2>
    <div id="gameContainer">
      <UpgradeContainer
        :pointsPerClick="pointsPerClick"
        :speedOfPointsByTime="speedOfPointsByTime"
        :amountOfPointsByTime="amountOfPointsByTime"
        @btnClicked="upgradeItem"
      />
      <ResetProgress
        v-if="resetProgressVisibility"
        @cancel="resetProgressVisibility = false"
        @reset="resetProgress()"
      />
      <div class="cookieClickingContainer">
        <div class="audioContainer">
          <SoundControlBtn
            :soundOnText="'music_note'"
            :soundOffText="'music_off'"
            :soundOn="musicOn"
            @btnClicked="musicOn = !musicOn"
          />
          <button
            v-on:click="resetProgressVisibility = !resetProgressVisibility"
            id="openResetMenu"
          >
            Reset
          </button>
          <SoundControlBtn
            :soundOnText="'volume_up'"
            :soundOffText="'volume_off'"
            :soundOn="sfxOn"
            @btnClicked="sfxOn = !sfxOn"
          />
        </div>
        <div class="cookieContainer">
          <p id="points">
            Cookies Baked:
            {{ points }}
          </p>
          <Cookie
            @cookieClicked="
              points += pointsPerClick.pointsToAdd;
              playSound('Cookie click');
            "
          />
        </div>
      </div>
    </div>
    <div class="description">
      <div class="mainDescription">
        <h3>Description</h3>
        <p>
          Click the cookie to bake cookies. Use your baked cookies to buy
          upgrades. Upgrades help you bake more cookies faster. Try to bake as
          many cookies as you can!
        </p>
      </div>
      <div class="otherDescription">
        <div class="madeWith">
          <h3>Made with:</h3>
          <ul>
            <li>HTML</li>
            <li>SCSS</li>
            <li>TypeScript</li>
          </ul>
        </div>
        <div class="otherInfo">
          <h3>Other Info</h3>
          <p>Dark mode support: yes</p>
          <br />
          <p>Fullscreen support: no</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import UpgradeContainer from '@/components/games/cookie-clicker/UpgradeContainer.vue';
import Cookie from '@/components/games/cookie-clicker/Cookie.vue';
import SoundControlBtn from '@/components/games/cookie-clicker/SoundControlBtn.vue';
import ResetProgress from '@/components/games/cookie-clicker/ResetProgress.vue';
import {
  Upgrade,
  PointsPerClick,
  SpeedOfPointsByTime,
  AmountOfPointsByTime
} from '@/components/games/cookie-clicker/upgrade';

export default Vue.extend({
  name: 'cookie-clicker',
  components: {
    UpgradeContainer,
    Cookie,
    SoundControlBtn,
    ResetProgress
  },

  data() {
    return {
      pointsPerClick: new PointsPerClick(),
      speedOfPointsByTime: new SpeedOfPointsByTime(2000),
      amountOfPointsByTime: new AmountOfPointsByTime(),

      pointInterval: null as number | null,
      previousTime: performance.now(),

      cookieClickSound: new Audio(
        require('@/assets/sound/cookie-clicker-sound-effect.mp3')
      ) as HTMLAudioElement,
      backgroundMusic: this.$refs.backgroundMusic as HTMLAudioElement,

      points: 0,

      sfxOn: true,
      musicOn: true,

      resetProgressVisibility: false
    };
  },

  methods: {
    resetProgress() {
      this.points = 0;
      this.pointsPerClick = new PointsPerClick();
      this.speedOfPointsByTime = new SpeedOfPointsByTime(2000);
      this.amountOfPointsByTime = new AmountOfPointsByTime();

      if (localStorage.getItem('cookieClickerPoints')) {
        localStorage.removeItem('cookieClickerPoints');
      }
      if (localStorage.getItem('cookieClickerPointsPerClick')) {
        localStorage.removeItem('cookieClickerPointsPerClick');
      }
      if (localStorage.getItem('cookieClickerSpeedOfPointsByTime')) {
        localStorage.removeItem('cookieClickerSpeedOfPointsByTime');
      }
      if (localStorage.getItem('cookieClickerAmountOfPointsByTime')) {
        localStorage.removeItem('cookieClickerAmountOfPointsByTime');
      }
    },

    upgradeItem(item: Upgrade, uniqueness: string) {
      // Unique here means if you should do something else than just add 1 to .pointsToAdd
      if (this.points - item.cost >= 0 && uniqueness === 'Not unique') {
        this.points -= item.cost;
        item.getCostAfterUpgrade();
        item.pointsToAdd++;
      }

      if (item === this.speedOfPointsByTime && this.points - item.cost >= 0) {
        this.points -= this.speedOfPointsByTime.cost;
        this.speedOfPointsByTime.getCostAfterUpgrade();
        this.speedOfPointsByTime.speed -= 50;
        this.resetInterval();
      }

      if (item === this.amountOfPointsByTime && this.points - item.cost >= 0) {
        this.points -= this.amountOfPointsByTime.cost;
        this.amountOfPointsByTime.getCostAfterUpgrade();
        this.amountOfPointsByTime.pointsToAdd += 0.5;
        this.resetInterval();
      }

      localStorage.setItem(
        'cookieClickerPointsPerClick',
        JSON.stringify(this.pointsPerClick)
      );
      localStorage.setItem(
        'cookieClickerSpeedOfPointsByTime',
        JSON.stringify(this.speedOfPointsByTime)
      );
      localStorage.setItem(
        'cookieClickerAmountOfPointsByTime',
        JSON.stringify(this.amountOfPointsByTime)
      );
    },

    addPointsByTime() {
      const timeDifference = performance.now() - this.previousTime;
      const timesAdded = Math.floor(
        timeDifference / this.speedOfPointsByTime.speed
      );
      this.previousTime += timesAdded * this.speedOfPointsByTime.speed;

      this.points += timesAdded * this.amountOfPointsByTime.pointsToAdd;
    },

    resetInterval() {
      this.previousTime = performance.now();
      clearInterval(this.pointInterval!);
      this.pointInterval = setInterval(
        () => this.addPointsByTime(),
        Math.max(this.speedOfPointsByTime.speed, 50)
      );
    },

    playSound(sound: string) {
      if (sound === 'Cookie click' && this.sfxOn) {
        let cookieClickSound = this.cookieClickSound.cloneNode() as HTMLAudioElement;
        cookieClickSound.play();
      }
    }
  },

  created() {
    if (localStorage.getItem('cookie-clicker-points')) {
      this.points = JSON.parse(localStorage.getItem('cookie-clicker-points')!!);
    }
    if (localStorage.getItem('cookieClickerPointsPerClick')) {
      this.pointsPerClick = Upgrade.fromJSON(
        JSON.parse(localStorage.getItem('cookieClickerPointsPerClick')!!)
      );
    }
    if (localStorage.getItem('cookieClickerSpeedOfPointsByTime')) {
      this.speedOfPointsByTime = Upgrade.fromJSON(
        JSON.parse(localStorage.getItem('cookieClickerSpeedOfPointsByTime')!!)
      );
    }
    if (localStorage.getItem('cookieClickerAmountOfPointsByTime')) {
      this.amountOfPointsByTime = Upgrade.fromJSON(
        JSON.parse(localStorage.getItem('cookieClickerAmountOfPointsByTime')!!)
      );
    }
    if (
      this.speedOfPointsByTime.level === 2 ||
      this.amountOfPointsByTime.level === 2
    ) {
      this.resetInterval();
    }
  },

  watch: {
    points() {
      localStorage.setItem(
        'cookie-clicker-points',
        JSON.stringify(this.points)
      );
    }
  }
});
</script>

<style lang="scss">
@import '@/global.scss';
#cookie-clicker {
  padding-top: 66px;
}

body {
  --upgrades: rgb(55, 76, 194);
  --clickingContainer: rgb(100, 181, 246);
}

.darkMode #cookie-clicker {
  --upgrades: #17223b;
  --clickingContainer: #263859;
  #toggleSoundEffects {
    color: black;
  }
}

h2 {
  margin: 30px;
}

#gameContainer {
  display: flex;
  position: relative;
  border: 1px solid black;
  border-radius: 5px;
  background-color: var(--clickingContainer);
  width: 70%;
  margin: 30px auto;
  padding: 0;
  touch-action: manipulation;
  overflow: hidden;
}

#cookieContainer p {
  margin: 20px auto 0px auto;
}

#gameContainer {
  display: flex;
  position: relative;
  border: 1px solid black;
  border-radius: 5px;
  background-color: var(--clickingContainer);
  width: 70%;
  margin: 30px auto;
  padding: 0;
  touch-action: manipulation;
}

#openResetMenu {
  border: 1px solid black;
  width: 20%;
  height: 35px;
  padding: 10px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.4s;
}

#openResetMenu:hover {
  background-color: rgba(255, 255, 255, 0.7);
}

.audioContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin: auto;
  padding: 10px;
}

#points {
  font-size: 20px;
}

#cookie {
  width: 60%;
  border-radius: 33%;
  margin: 20px auto 10px auto;
}

.cookieClickingContainer {
  width: 60%;
  position: relative;
}

.cookieContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 35px 0;
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

@media only screen and (max-width: 800px) {
  .cookieClickingContainer {
    width: 100%;
  }
  #cookie {
    margin-bottom: 70px;
  }
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

@media only screen and (max-width: 460px) {
  .description p {
    font-size: 14px;
  }
}
</style>
