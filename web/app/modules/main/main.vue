<style lang="sass">
  html {
    height: 100%;
    body {
      height: 100%;
      overflow: hidden;
    }
  }
  .app-container {
    display: flex;
    height: 100%;
  }

  .fade-router-enter-active, .fade-router-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-router-enter, .fade-router-leave-to {
    opacity: 0;
  }
</style>

<template>
  <div class='app-container'>
    <transition name="fade-router" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script type="text/babel">
  import { mapState, mapGetters, mapActions } from 'vuex';
  import Vue from 'vue';

  export default {
    computed: {
      ...mapState({
      }),
      ...mapGetters({
      })
    },
    data() {
      return {
      };
    },
    methods: {
      ...mapActions({
      })
    },
    components: {
    },
    mounted() {

    }
  };
</script>
