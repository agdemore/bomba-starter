<style lang="sass">
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;

    background: #e1e1e1;

    &--btn {
      cursor: pointer;
      border-radius: 5px;
      padding: 8px;

      box-shadow: 4px 5px 7px rgba(0,0,0,.4);
      background-color: #ff9800;

      &:active {
        background-color: #9c27b0;
      }
    }
  }
</style>
<template>
  <div class='form'>
    <div class="form--btn"
         @click="sendTest">
      I am a button
    </div>
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
        sendTest: 'sendTest'
      })
    },
    components: {
    },
    mounted() {
    }
  };
</script>
