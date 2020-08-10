<template>
  <div class="admin-login">
    <DarkModeButton />
    <h1>Log in as admin</h1>
    <form @submit.prevent="handleAuthenticate">
      <input
        type="text"
        name="username"
        placeholder="Username"
        class="username"
        v-model="username"
        ref="username"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        class="password"
        v-model="password"
        ref="password"
        required
      />
      <div class="show-password-container">
        <input
          type="checkbox"
          name="show-password"
          class="checkbox"
          @click="togglePasswordVisibility()"
        />
        <label for="checkbox"> Show password</label>
      </div>
      <p class="login-error">{{ loginError }}</p>
      <input type="submit" class="confirm-password-btn" value="Log in" />
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import DarkModeButton from '@/components/DarkMode.vue';

import { authenticate } from './actions/authenticate';
import router from '../../router';

export default defineComponent({
  name: 'admin-login',
  components: {
    DarkModeButton
  },

  data() {
    return {
      username: '',
      password: '',
      loginError: ''
    };
  },
  methods: {
    togglePasswordVisibility() {
      const passwordInputElement = this.$refs.password as HTMLInputElement;

      passwordInputElement.type === 'password'
        ? (passwordInputElement.type = 'text')
        : (passwordInputElement.type = 'password');
    },

    async handleAuthenticate() {
      try {
        const jwt = await authenticate(
          '/api/admin/login',
          this.username,
          this.password
        );
        this.loginError = '';
        localStorage.setItem('jwt', jwt);
        router.replace('/');
      } catch (error) {
        this.loginError = error.message;
      }
    }
  }
});
</script>

<style lang="scss">
.dark.default-dark .admin-login .password,
.dark.default-dark .admin-login .confirm-password-btn {
  border: 2px solid white;
}
.dark .admin-login {
  color: white;

  .dark-mode-toggle-button i {
    color: white;
  }

  .password,
  .confirm-password-btn {
    border: 2px solid white;
  }
}
.admin-login {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
  background-color: var(--color-light);
  padding-top: 10%;
  cursor: default;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: black;
  form {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 0 20px;
  }
  input {
    font-family: Nunito;
  }
  .dark-mode-toggle-button {
    position: absolute;
    top: 10px;
    left: 10px;
    i {
      color: black;
    }
  }
  .username,
  .password,
  .confirm-password-btn {
    border: 2px solid black;
  }
  .username,
  .password {
    margin: 20px 0;
    height: 70px;
    padding-left: 10px;
    min-width: 40%;
    width: auto;
    border-radius: 5px;
    background-color: rgb(245, 245, 245);
    transition: 0.2s;
    outline: none;
    overflow: hidden;
    box-sizing: border-box;
    font-size: 18px;
    &:hover {
      border-radius: 10px;
      background-color: rgb(255, 255, 255);
    }
  }

  .show-password-container,
  .login-error {
    width: 100%;
    text-align: left;
  }
  .login-error {
    color: red;
  }
  .confirm-password-btn {
    margin: 20px;
    height: 70px;
    min-width: 40%;
    width: auto;
    border-radius: 5px;
    background-color: var(--color-primary);
    color: white;
    transition: 0.2s;
    outline: none;
    overflow: hidden;
    box-sizing: border-box;
    font-size: 18px;
    font-weight: bold;
    position: relative;
    &:hover {
      opacity: 0.9;
      border-radius: 10px;
    }

    a {
      width: 100%;
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      color: white;
      font-style: normal;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
