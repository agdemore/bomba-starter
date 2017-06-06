<style lang="sass">
  .bill {
    cursor: pointer;
    user-select: none;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    margin: 10px 100px 10px 100px;
    border: 2px solid grey;
    border-radius: 5px;
    align-items: center;
    box-sizing: content-box;
    padding: 8px;
    min-width: 100px;

    &__title {
      text-transform: uppercase;
    }

    &__data {
      display: flex;
      flex-direction: column;

      .complete {
        color: grey;
        font-size: 12px;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
<template>
  <div class="bill">
    <div class="bill__title">{{ (bill.title || 'Счет') }}</div>
    <div class="bill__data">
      <div class="pay">{{ 'Сумма счета: ' + (bill.pay || 0) + ' уе.' }}</div>
      <div class="complete">{{ 'Состояние: ' + (bill.complete ? 'завершен' : 'активен') }}</div>
    </div>
  </div>
</template>
<script type="text/babel">
  import { mapActions } from 'vuex'
  export default {
    props: ['bill'],
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