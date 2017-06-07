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

    &--profit {
      color: #00ad49;
      font-size: 26px;
    }

    &.open {

    }
    &.closing {
      backgrund-color: #2ecc71;
    }
    &.dead {
      backgrund-color: #d6d6d6;
    }

    &__title {
      display: flex;
      flex-direction: column;
      &--name {
        text-transform: uppercase;
      }
      &--receiver {
        color: grey;
        font-size: 12px;
        display: flex;
        justify-content: flex-start;
      }
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
      .closing {
        color: #27ae60;
      }
    }
  }
</style>
<template>
  <div class="bill" :class="{ [bill.type]: true }">
    <div class="bill__title">
      <div class="bill__title--name">{{ (bill.clientData.title || 'Счет') }}</div>
      <div class="bill__title--receiver">{{ 'Получатель: ' + (getReceiver(bill.receiver)) }}</div>
    </div>
    <div class="bill--profit" v-if="bill.type === 'dead' && bill.receiver === mywallet">
      {{ '+' + this.bill.summ + 'у.е.' }}
    </div>
    <div class="bill__data">
      <div class="pay">{{ 'Сумма счета: ' + (bill.summ || 0) + ' уе.' }}</div>
      <div :class="`complete ${this.bill.type === 'closing' ? 'closing' : ''}`">{{ 'Состояние: ' + getType }}</div>
    </div>
  </div>
</template>
<script type="text/babel">
  import { mapActions, mapState } from 'vuex'
  export default {
    props: ['bill'],
    data() {
      return {
      };
    },
    computed: {
      ...mapState({
        friends: state => state.auth.friends || [],
        mywallet: state => state.auth.wallet,
        myname: state => state.auth.name
      }),
      getType() {
        if (this.bill.type === 'open')
          return 'открыт';
        if (this.bill.type === 'closing')
          return 'требует закрытия';
        if (this.bill.type === 'dead')
          return 'завершен';
      }
    },
    methods: {
      ...mapActions({
      }),
      getReceiver(rec) {
        const ind = this.friends.findIndex(fr => fr.wallet === rec);
        if (ind === -1)
          return this.myname;
        return this.friends[ind].name;
      }
    },
    components: {
    },
    mounted() {
    }
  };
</script>