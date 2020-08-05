<template>
  <div class="google-play-link">
    <a
      href="https://play.google.com/store/apps/details?id=com.gamitopia.calculator&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
    >
      <img
        src="@/assets/images/google-play-badge.png"
        alt="Get it on Google Play"
      />
    </a>
    <p>Google Play and the Google Play logo are trademarks of Google LLC.</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'GooglePlayLink',

  props: {
    link: String
  }
});
</script>

<style lang="scss" scoped>
.google-play-link {
  width: 100%;
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;

  a,
  p {
    width: 50%;
    max-width: 350px;
    min-width: 200px;
  }

  img {
    width: 100%;
  }

  p {
    color: var(--color-light-contrast);
  }
}
</style>
