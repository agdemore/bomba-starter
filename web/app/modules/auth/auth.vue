<style lang="sass">
  $field-color: #ecf0f1;

  .auth-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    background-color: #34495e;  
    transition: opacity 0.3s ease;
  }
  .auth {
    display: flex;
    flex-direction: column;
    // padding: 25px 50px 25px 50px;

    & > div {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      
      margin: 0 0 20px 0;
      input {
        border: none;
        background-color: transparent!important;
        outline: none;
        height: 30px;
        font-size: 19px;
        border-bottom: 2px solid #95a5a6;
        color: #95a5a6;
        transition: color .2s ease;
        &:focus {
          color: $field-color;
          border-bottom: 2px solid $field-color;
        }
        &:hover {
          color: $field-color;
          border-bottom: 2px solid $field-color;
        }
      }
    }
    &--login {
      input {
        flex-grow: 1;
      }
    }
    &--password {
      margin-bottom: 10px!important;
      input {
        flex-grow: 1;
      }
    }
  }

  .auth-app-enter-active, .auth-app-leave-active {
    opacity: 1;
  }
  .auth-app-enter, .auth-app-leave-to {
    opacity: 0;
  }
</style>
<template>
  <transition name="auth-app">
    <div class="auth-container">
      <div class="auth">
        <div class="auth--login">
          <input type="text" autoFocus="autofocus" placeholder="Email"
                  v-model="login">
        </div>
        <div class="auth--password">
          <input type="password" placeholder="Password"
                  v-model="password"
                  v-on:keyup.enter="authMe">
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  export default {
    data () {
      return {
        login: null,
        password: null,
        error: null,
        mesage: null
      };
    },
    components: {},
    props: {},
    computed: {
      ...mapGetters({}),
      ...mapState({})
    },
    methods: {
      ...mapActions({
          auth: 'auth'
      }),
      authMe() {
        console.log('EEPOOOOOKKK', this.password, this.login);
        if (this.login && this.password)
          this.auth({ login: this.login, password: this.password })
          .then((res) => {
            this.message = res;
            console.log('RES', res);
          }).catch((err) => {
            this.error = err;
            console.log('ERR', err);
          });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="sass"></style>