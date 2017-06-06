<style lang="sass">
  .form {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    &__header {

    }
    &__panel {

    }
    &__content {
    
    }
  }
</style>
<template>
  <div class='form'>
    <div class="form__header"></div>
    <div class="form__panel"></div>
    <div class="form__content"></div>
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
