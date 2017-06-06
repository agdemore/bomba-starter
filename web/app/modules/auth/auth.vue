<style lang="sass">
  $field-color: #ecf0f1;

  .auth-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;

    background-color: #34495e;  
    
  }
  .auth {
    display: flex;
    flex-direction: column;
    // padding: 25px 50px 25px 50px;

    &--logo {
      color: #ecf0f1;
      font-size: 26px;
      margin-bottom: 22px;
    }
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

    &--btn {
      color: #ecf0f1;
      border: 2px solid #ecf0f1;
      border-radius: 17px;
      padding: 2px 8px 2px 8px;
      margin-top: 11px;
      font-size: 17px;
      cursor: pointer;

      height: 28px;
      box-sizing: border-box;

      &:hover {
        color: #2ecc71;
        border: 2px solid #2ecc71;
      }

      &-error {
        color: #c0392b;
        border: 2px solid #c0392b;
      }
    }
  }

  .auth-app-enter-active, .auth-app-leave-active {
    transition: opacity 0.3s ease;
    opacity: 1;
  }
  .auth-app-enter, .auth-app-leave-to {
    opacity: 0;
  }

  .spinner {
    margin-top: 11px;
    width: 28px;
    height: 28px;
    cursor: pointer;

    position: relative;
  }

  .double-bounce1, .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #2ecc71;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    
    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bounce {
    0%, 100% { 
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% { 
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
    }
  }
</style>
<template>
  <transition name="auth-app">
    <div class="auth-container">
    <div class="auth--logo">
      Share my pay up!
    </div>
      <div class="auth">
        <div class="auth--login">
          <input type="text" autoFocus="autofocus" placeholder="Email"
                  v-model="login" v-on:keyup.enter="nextField">
        </div>
        <div class="auth--password">
          <input type="password" placeholder="Password" ref="pass"
                  v-model="password"
                  v-on:keyup.enter="authMe">
        </div>
      </div>
      <div class="auth--btn" :class="{ 'auth--btn-error': error }" v-if="!progress" @click="authMe">
        Sign in
      </div>
      <div class="spinner" v-if="progress">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
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
        progress: false
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
      nextField() {
        this.$refs.pass.focus();
      },
      authMe() {
        if (this.login && this.password) {
          this.progress = true;
          this.auth({ login: this.login, password: this.password })
          .then((res) => {
            if (!res.data.error)
              setTimeout(() => {
                this.progress = false;
                this.error = false;
                this.$router.push({ path: 'form-app' })
              }, 400);
            else {
              setTimeout(() => {
                this.progress = false;
                this.error = true;
              }, 400);
            }
          }).catch((err) => {
            setTimeout(() => {
              this.progress = false;
              this.error = err;
            }, 400);
          });
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="sass"></style>