<style lang="sass">
  .bill-editor {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;

    .input-modern {
      padding: 5px 10px 5px 10px;
      border-bottom: 2px solid grey;
      border-top: none;
      border-left: none;
      border-right: none;
      &:focus {
        outline: none;
      }
    }

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
        // input {
        //   padding: 5px 10px 5px 10px;
        //   border-bottom: 2px solid grey;
        //   border-top: none;
        //   border-left: none;
        //   border-right: none;
        // }
        // input:focus {
        //   outline: none;
        // }
      }

      .pay {
        display: flex;
        flex-direction: row;
        margin: 10px;
        div {
          padding: 5px 10px 5px 10px;
        }
        // input {
        //   padding: 5px 10px 5px 10px;
        //   border-bottom: 2px solid grey;
        //   border-top: none;
        //   border-left: none;
        //   border-right: none;
        // }
        // input:focus {
        //   outline: none;
        // }
      }
      .receiver {
        display: flex;
        flex-direction: row;
        margin: 10px;
        div {
          padding: 5px 10px 5px 10px;
        }
        // input {
        //   padding: 5px 10px 5px 10px;
        //   border-bottom: 2px solid grey;
        //   border-top: none;
        //   border-left: none;
        //   border-right: none;
        // }
        // input:focus {
        //   outline: none;
        // }
      }
    }
    .plus-btn {
      border: 1px solid #cecece;
      padding: 8px;
      cursor: pointer;
      &:hover {
        background: #cecece;
      }
    }
    &__fields {
      flex-grow: 1;
      justify-content: flex-start;
      overflow-y: auto;
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 10px;

      

      &--users {

      }
      &--items {
        flex-shrink: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .items {
          &__title {
            margin: 15px 10px 0 10px;
          }
          &__value {
            margin: 15px 10px 0 10px;
          }
          &__status {
            margin: 15px 10px 0 10px;
            display: flex;
            align-items: center;
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

  .dropbtn {
    width: 100%;
    height: 30px;
    margin-top: 12px;
    color: black;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }

  .dropbtn:hover, .dropbtn:focus {
      background-color: #dddddd;
  }

  .dropdown {
    cursor: pointer;

    width: 300px;
    position: relative;
    display: inline-block;
  }

  .dropdown-content {
      display: none;
      position: absolute;
      background-color: #f9f9f9;
      min-width: 160px;
      overflow: auto;
      box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
      z-index: 1;
  }

  .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
  }

  .dropdown a:hover {background-color: #f1f1f1}

  .show {display:block;}

</style>
<template>
  <div class="bill-editor">
    <div class="bill-editor__title">
      <div class="title">
        <div>Название счета:</div>
        <input v-if="isNew" class="input-modern" v-model="newbill.title"/>
        <div v-if="!isNew">{{ newbill.title || 'Счет' }}</div>
      </div>
      <div class="pay">
        <div>Сумма:</div>
        <input v-if="isNew" type="number" size="6" name="num" min="0" max="1000000" class="input-modern" v-model.number="newbill.pay"/>
        <div v-if="!isNew">{{ newbill.pay || 0 }}</div>
      </div>
      <div class="receiver">
        <div>Получатель:</div>
        <input v-if="isNew" class="input-modern" v-model="newbill.receiver"/>
        <div v-if="!isNew">{{ newbill.receiver || 'Кафе / ресторан' }}</div>
      </div>
    </div>
    <div class="plus-btn" @click="add">Добавить друга</div>
    <div class="bill-editor__fields">
      <div v-for="(payer, index) in news" class="bill-editor__fields--items">

        <div class="dropdown">
          <button @click="opened = 'n' + index" class="dropbtn">{{ (friends.find(f => f.wallet === payer.wallet) || {}).name || "пользователь" }}</button>
          <div id="myDropdown" class="dropdown-content" :class="{ 'show': 'n' + index === opened }">
            <div class="dd-item" v-for="fr in mappedFriends"
            @click="clickedFr(fr, index)">{{ fr.name }}</div>
          </div>
        </div>

        <input type="number" size="6" name="num" min="0" max="1000000" class="items__value input-modern" v-model.number="payer.amount" placeholder="Сумма"/>
        <div class="items__status" :class="{ 'ready': payer.confirmed }">{{ payer.confirmed ? 'оплачено' : 'ожидание' }}</div>
      </div>
      <div v-for="payer in newbill.payers" class="bill-editor__fields--items">
        <!--<div class="items__title">{{ getUser(payer.wallet) }}</div>-->

        <div class="dropdown">
          <button @click="opened = 'ex' + index" class="dropbtn">{{ (friends.find(f => f.wallet === payer.wallet) || {}).name || "пользователь" }}</button>
          <div id="myDropdown2" class="dropdown-content" :class="{ 'show': 'n' + index === opened }">
            <div class="dd-item" v-for="fr in mappedFriends"
            @click="clickedFrEx(fr, index)">{{ fr.name }}</div>
          </div>
        </div>

        <input type="number" size="6" name="num" min="0" max="1000000" class="items__value input-modern" v-model.number="payer.amount" placeholder="Сумма"/>
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
  // import multiselect from 'vue-multiselect/lib/vue-multiselect.min.js';
  import cloneDeep from 'lodash/cloneDeep';
  export default {
    data() {
      return {
        newbill: {},
        isNew: false,
        news: [],
        opened: null
      };
    },
    components: {
    },
    computed: {
      ...mapState({
        bill: state => state.tabs.currentBill,
        friends: state => state.auth.friends || [{name: 1, wallet: 'ddssfds'}, {name: 2, wallet: 'ddssfsddsfds'}]
      }),
      mappedFriends() {
        return this.friends;
        // .filter(elem => {
        //   return this.news.findIndex(e => e.wallet === elem.wallet) === -1 && 
        //         this.newbill.payers.findIndex(e => e.wallet === elem.wallet) === -1;
        // });
      }
    },
    methods: {
      ...mapActions({
        saveBill: 'saveBill'
      }),
      clickedFr(fr, index) {
        this.news[index].wallet = fr.wallet;
        this.opened = null;
      },
      clickedFrEx(fr, index) {
        this.newbill.payers[index].wallet = fr.wallet;
        this.opened = null;
      },
      back() {
        this.$router.push({ name: 'current' });
      },
      save() {
        this.saveBill(this.newbill);
      },
      getUser(wallet) {
        const ind = (this.friends || []).find(urs => usr.wallet === wallet);
        return (ind || {}).name || 'Участник';
      },
      add() {
        this.news.push({
          wallet: null,
          amount: 0,
          confirmed: false
        });
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