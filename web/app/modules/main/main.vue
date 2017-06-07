<style lang="sass">
  html {
    height: 100%;
    body {
      height: 100%;
      font-family: sans-serif;
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
    sockets:{
      connect: function(){
        console.log('socket connected');
        // Notification.requestPermission(function(permission){
        // console.log('Результат запроса прав:', permission);
        // });
      },
      'some event': function(val){
        // var notification = new Notification('Сколько',
        // { body: 'Только ты!', dir: 'auto', icon: 'icon.jpg' });
        // console.log('SOME EVENT', val)
      }
    },
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
