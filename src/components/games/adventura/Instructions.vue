<template>
  <div class="instructions" ref="startMenu">
    <div class="ui-elements">
      <h1>Instructions</h1>
      <div class="btn-container">
        <button @click="$emit('go-back')">Go back</button>
      </div>
      <div class="instructions-text">
        <p>
          Welcome to Adventura!
          <br />
          If you want to change things around, go to the settings.
          <br />
          To start the game, go back to the main menu and press Start new
          adventure. That will take you to an area map, that will unravel itself
          as you complete the different areas in the world of Adventura.
        </p>
        <h2>Map</h2>
        <p>
          The map is your tool for getting onward in the game. Press anywhere on
          an unlocked area button (the wide button with the ground texture) to
          go to that area. As you'll notice, there is a "Fight boss" button on
          the left side of the area button. That button will take you to a boss,
          which is much harder than the normal enemies you encounter in the
          area, so you should get prepared.
        </p>
        <h2>Combat</h2>
        <p>
          When you go to an area, you will fight enemies. At the top of the
          screen you can see a bar with useful information. The left side of the
          bar has your own stats (health = red bar, mana = blue bar, coins) and
          the right side has your enemy's stats (health, weaknesses, strengths).
          <br />
          In combat you will take turns attacking with your enemy. In the middle
          you can see a gray box filled with buttons, such as Attack, Heal and
          so on. You can attack the enemy or heal yourself by pressing these
          buttons. After you have made your move, the enemy attacks.
          <br />
          Some moves cost <strong>mana</strong>. Those attacks are usually
          powerful spells or other magical things. The amount of mana it costs
          is next to the spell. In the bar at the top, you can see the blue
          bars. They indicate how much mana you have at the moment. You will get
          only one mana back every turn and there are no other ways to get back
          mana so you shouldn't waste it.
          <br />
          At the top you can see your coins. You get them every time you kill an
          enemy. They are incredibly useful as you will need them to buy
          upgrades from the shop. Without getting stronger, you can't beat the
          bosses or the more difficult enemies.
          <br />
          If you run out of health (the red bar), you will die and lose a fourth
          of your coins. You can then of course come straight back to the same
          area and continue fighting. When your enemy dies, you will get coins
          (the amount depends on the area) and a new enemy will spawn.
        </p>
        <h2>Enemy Strengths and Weaknesses</h2>
        <p>
          Most enemies have strengths and weaknesses. If for example a snowman
          has a fire-weakness, then fire attacks will generally do the most
          damage. If said snowman had an ice-strength however, you shouldn't use
          ice attacks as they will do less damage. You can see the weaknesses
          and strengths from the right side of the top bar.
        </p>
        <h2>Unlocking New Areas and Moves</h2>
        <p>
          You unlock areas by defeating your current area's boss. Bosses also
          drop more coins than normal enemies, but they are also significantly
          harder to beat. When you beat a boss, you will also usually unlock a
          new move, such as a new spell.
        </p>
        <h2>The Shop</h2>
        <p>
          You can get to the shop from the button at the top of the area map.
          You can use the coins you have collected from your enemies to buy
          upgrades, such as upgrading your max health or mana or upgrading the
          damage of some attacks.
        </p>
        <p>I hope you will enjoy the world of Adventura.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Instructions'
});
</script>

<style lang="scss" scoped>
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
.instructions {
  height: 473px;
  .ui-elements {
    overflow: auto;
    z-index: 2;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    .instructions-text {
      width: 75%;
      margin: auto;
      padding: 10px;
      margin-top: 10px;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.7);
      color: black;
      p {
        text-align: left;
      }
    }
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
  button {
    background-color: rgba(255, 255, 255, 0.7);
    color: black;
    width: 60%;
    margin-bottom: 15px;
    padding: 15px;
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
</style>
