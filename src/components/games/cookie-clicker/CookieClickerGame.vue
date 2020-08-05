<template>
  <div class="cookie-clicker-game">
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

    <UpgradeContainer
      :pointsPerClick="pointsPerClick"
      :speedOfPointsByTime="speedOfPointsByTime"
      :amountOfPointsByTime="amountOfPointsByTime"
      @btn-clicked="upgradeItem"
    />
    <ResetProgress
      v-if="resetProgressVisibility"
      @cancel="resetProgressVisibility = false"
      @reset="resetProgress()"
    />
    <div class="cookie-clicking-container">
      <div class="settings-container">
        <button
          @click="resetProgressVisibility = !resetProgressVisibility"
          class="open-reset-menu"
        >
          Reset
        </button>
        <SoundControlBtn
          :soundOnText="'music_note'"
          :soundOffText="'music_off'"
          :soundOn="musicOn"
          @btn-clicked="musicOn = !musicOn"
        />
        <SoundControlBtn
          :soundOnText="'volume_up'"
          :soundOffText="'volume_off'"
          :soundOn="sfxOn"
          @btn-clicked="sfxOn = !sfxOn"
        />
        <button
          @click="$emit('toggle-fullscreen')"
          class="toggle-fullscreen-button"
        >
          <i class="material-icons">{{
            isFullscreen ? 'fullscreen_exit' : 'fullscreen'
          }}</i>
        </button>
      </div>
      <p class="points">
        Cookies Baked:
        {{ points }}
      </p>
      <div class="cookie-container">
        <Cookie
          @cookie-clicked="
            points += pointsPerClick.pointsToAdd;
            playSound('Cookie click');
          "
        />
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
  name: 'CookieClickerGame',

  components: {
    UpgradeContainer,
    Cookie,
    SoundControlBtn,
    ResetProgress
  },

  props: {
    isFullscreen: Boolean
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

      clearInterval(this.pointInterval!);

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
        const cookieClickSound = this.cookieClickSound.cloneNode() as HTMLAudioElement;
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
.cookie-clicker-game {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: var(--clicking-container);
  --upgrades: rgb(55, 76, 194);
  --clicking-container: rgb(100, 181, 246);
}

.cookie-clicking-container {
  width: 60%;
  position: relative;

  .open-reset-menu {
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
    &:hover {
      background-color: rgba(255, 255, 255, 0.7);
    }
  }

  .settings-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    margin: auto;
    padding: 10px;

    .toggle-fullscreen-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 65px;
      height: 65px;
      border-radius: 50%;
      overflow: hidden;
      background-color: white;
      border: 1px solid black;
      background-size: 70%;
      background-repeat: no-repeat;
      background-position: center center;
      transition: 0.4s;
      font-family: 'Material Icons';
      font-size: 35px;
      &:hover {
        background-color: rgba(255, 255, 255, 0.7);
      }

      i {
        color: black;
      }
    }
  }

  .points {
    font-size: 20px;
    color: var(--color-light-contrast);
    margin: auto;
  }

  .cookie-container {
    position: absolute;
    top: 113px;
    right: 20%;
    left: 20%;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.dark.default-dark .cookie-clicker-game {
  --upgrades: #17223b;
  --clicking-container: #263859;

  .toggle-sound-effects {
    color: black;
  }
}

@media only screen and (max-width: 800px) {
  .cookie-clicking-container {
    width: 100%;

    .cookie-container {
      bottom: 10%;
    }
  }
}
</style>
