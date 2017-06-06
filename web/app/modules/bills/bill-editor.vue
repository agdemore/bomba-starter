<style lang="sass">
  .bill-editor {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    &__title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;


      .title {
        display: flex;
        flex-direction: row;
        margin: 10px;
        div {
          padding: 5px 10px 5px 10px;
        }
        input {
          padding: 5px 10px 5px 10px;
          border-bottom: 2px solid grey;
          border-top: none;
          border-left: none;
          border-right: none;
        }
        input:focus {
          outline: none;
        }
      }

      .pay {
        display: flex;
        flex-direction: row;
        margin: 10px;
        div {
          padding: 5px 10px 5px 10px;
        }
        input {
          padding: 5px 10px 5px 10px;
          border-bottom: 2px solid grey;
          border-top: none;
          border-left: none;
          border-right: none;
        }
        input:focus {
          outline: none;
        }
      }
      .receiver {
        display: flex;
        flex-direction: row;
        margin: 10px;
        div {
          padding: 5px 10px 5px 10px;
        }
        input {
          padding: 5px 10px 5px 10px;
          border-bottom: 2px solid grey;
          border-top: none;
          border-left: none;
          border-right: none;
        }
        input:focus {
          outline: none;
        }
      }
    }
    &__fields {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 10px;

      &--users {

      }
      &--items {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .items {

          &___status {
            &.ready {
              color: #2ecc71;
            }
            color: grey;
            font-size: 12px;
            display: flex;
            justify-content: flex-end;
          }
        }
      }
    }
    &__footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 10px;

      &--btn.save {
        cursor: pointer;
        color: white;
        background-color: #2ecc71;
        border: 2px solid #2ecc71;
        border-radius: 8px;
        padding: 2px 8px 2px 8px;
        margin: 10px;
      }
      &--btn.back {
        cursor: pointer;
        color: white;
        background-color: #95a5a6;
        border: 2px solid #95a5a6;
        border-radius: 8px;
        padding: 2px 8px 2px 8px;
        margin: 10px;
      }
    }
  }
</style>
<template>
  <div class="bill-editor">
    <div class="bill-editor__title">
      <div class="title">
        <div>Название счета:</div>
        <input v-if="isNew" v-model="newbill.title"/>
      </div>
      <div class="pay">
        <div>Сумма:</div>
        <input v-if="isNew" v-model="newbill.pay"/>
      </div>
      <div class="receiver">
        <div>Получатель:</div>
        <input v-if="isNew" v-model="newbill.receiver"/>
      </div>
    </div>
    <div class="bill-editor__fields">
      <div v-for="payer in newbill.payers" class="bill-editor__fields--items">
        <div class="items__title">{{ getUser(payer.wallet) }}</div>
        <input class="items__value" v-model="payer.amount"/>
        <div class="items__status" :class="{ 'ready': payer.confirmed }">{{ payer.confirmed ? 'оплачено' : 'ожидание' }}</div>
      </div>
    </div>
    <div class="bill-editor__footer">
      <div class="bill-editor__footer--btn back" @click="back">Назад</div>
      <div class="bill-editor__footer--btn save" @click="save">Сохранить</div>
    </div>
  </div>
</template>
<script type="text/babel">
  import { mapActions, mapState } from 'vuex';
  import cloneDeep from 'lodash/cloneDeep';
  export default {
    data() {
      return {
        newbill: {},
        isNew: false
      };
    },
    computed: {
      ...mapState({
        bill: state => state.tabs.currentBill,
        friends: state => state.auth.friends
      })
    },
    methods: {
      ...mapActions({
        saveBill: 'saveBill'
      }),
      back() {
        this.$router.push({ name: 'current' });
      },
      save() {
        this.saveBill(this.newbill);
      },
      getUser(wallet) {
        const ind = (this.friends || []).find(urs => usr.wallet === wallet);
        return (ind || {}).name || 'Участник';
      }
    },
    mounted() {
      if (this.bill === null) {
        this.isNew = true;
        this.newbill = {
          title: 'Счет 1',
          pay: 100,
          type: '',
          payers: [],
          complete: false,
          receiver: 'Получатель'
        };
        return;
      }
      this.newbill = cloneDeep(this.bill);
    }
  };
</script>