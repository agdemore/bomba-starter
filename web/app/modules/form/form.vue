<style lang="sass">
  .form {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &__header {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      height: 55px;

      &--title {
        display: flex;
        flex-direction: column;

        margin-right: 10px;
        padding-top: 10px;
        font-size: 18px;

        .title {
          &__icons {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            
            .logout-btn {
              cursor: pointer;
            }
          }
        }
      }
      &--user {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 5px;
        .user {
          &__icon {
            
          }
        }
      }
    }
    &__panel {
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: 60px;
      background: #2c3e50;

      &--create {
        user-select: none;
        display: flex;
        align-items: center;
        margin: 5px;
        padding: 8px;

        background-color: transparent;
        transition: background-color .3s ease;

        cursor: pointer;
        color: white;
        &.activated {
          background-color: #405a75;
        }
        &:hover {
          background-color: #405a75;
        }
      }
      &--current {
        user-select: none;
        display: flex;
        align-items: center;
        margin: 5px;
        padding: 8px;

        background-color: transparent;
        transition: background-color .3s ease;
        color: white;
        cursor: pointer;
        &.activated {
          background-color: #405a75;
        }
        &:hover {
          background-color: #405a75;
        }
      }
    }
    &__content {
      display: flex;
      flex-grow: 1;
    }
  }

  .fade-router-enter-active, .fade-router-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-router-enter, .fade-router-leave-to {
    opacity: 0;
  }
</style>
<template>
  <div class='form'>
    <div class="form__header">
      <div class="form__header--user">
        <div class="form__header--title">
          <div class="title__name">{{ name }}</div>
          <div class="title__icons"
          v-on:click="logoutClick">
            <avatar class="logout-btn" imkey="logout"
                    link="https://cdn2.iconfinder.com/data/icons/picons-essentials/57/logout-512.png"
                    :size="20"
                    ></avatar>
            
          </div>
        </div>
        <avatar imkey="avatar" :size="45"></avatar>
      </div>
    </div>
    <div class="form__panel">
      <div class="form__panel--create" :class="{ 'activated': activated == 'create' }" @click="create">Создать счет</div>
      <div class="form__panel--current" :class="{ 'activated': activated == 'current' }" @click="openCurrent">Операции</div>
    </div>
    <div class="form__content">
      <transition name="fade-router" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script type="text/babel">
  import avatar from './avatar.vue';
  import { mapState, mapGetters, mapActions } from 'vuex';
  import Vue from 'vue';
  export default {
    components: {
      avatar
    },
    computed: {
      ...mapState({
        name: state => state.auth.name
      }),
      ...mapGetters({
      })
    },
    data() {
      return {
        activated: ''
      };
    },
    methods: {
      ...mapActions({
        logOff: 'logOff',
        clearBill: 'clearBill'
      }),
      logoutClick() {
        this.logOff();
        this.$router.push({ name: 'auth-page' });
      },
      create() {
        this.clearBill().then(() => {
          this.$router.push({ name: 'create' });
          this.activated = 'create';
        });
      },
      openCurrent() {
        this.$router.push({ name: 'current' });
        this.activated = 'current';
      }
    },
    mounted() {
      this.activated = 'current';
    }
  };
</script>
