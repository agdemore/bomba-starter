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
      flex-shrink: 0;
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

      flex-shrink: 0;

      &--wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &.disabled {
          .save {
            opacity: 0.5;
          }
        }
      }

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
        background-color: #647273;
        border: 2px solid #647273;
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

    &--receiver {
      button {
        margin-top: -5px;
      }
      
    }
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
        <input v-if="isNew" class="input-modern" v-model="newbill.title" :disabled="newbill.type !== 'open' ? true : false"/>
        <div v-if="!isNew">{{ newbill.title || 'Счет' }}</div>
      </div>
      <div class="pay">
        <div>Сумма:</div>
        <input v-if="isNew" :disabled="newbill.type !== 'open' ? true : false" type="number" size="6" name="num" min="0" max="1000000" class="input-modern" v-model.number="newbill.pay"/>
        <div v-if="!isNew">{{ newbill.pay || 0 }}</div>
      </div>
      <div class="receiver">
        <div>Получатель:</div>
        <!--<input v-if="isNew" class="input-modern" v-model="newbill.receiver"/>-->

        <div class="dropdown dropdown--receiver">
          <button :disabled="newbill.type !== 'open' ? true : false" @click="opened = 'rece'" class="dropbtn">{{ getName(newbill.receiver) }}</button>
          <div :id="'myDropdown3'" class="dropdown-content" :class="{ 'show': 'rece' === opened }">
            <div class="dd-item" v-for="fr in mappedFriends"
            @click="clickedRec(fr)">{{ fr.name }}</div>
          </div>
        </div>

        <div v-if="!isNew">{{ getReceiver(newbill.receiver) }}</div>
      </div>
    </div>




    <div class="plus-btn" @click="add">Добавить друга</div>
    <div class="bill-editor__fields">
      <div v-for="(payer, index) in news" class="bill-editor__fields--items">

        <div class="dropdown">
          <button :disabled="newbill.type !== 'open' ? true : false" @click="opened = 'n' + index" class="dropbtn">{{ getName(payer.wallet) }}</button>
          <div :id="'myDropdown' + index" class="dropdown-content" :class="{ 'show': 'n' + index === opened }">
            <div class="dd-item" v-for="fr in mappedFriends"
            @click="clickedFr(fr, index)">{{ fr.name }}</div>
          </div>
        </div>

        <input :disabled="newbill.type !== 'open' ? true : false" type="number" size="6" name="num" min="0" max="1000000" class="items__value input-modern" v-model.number="payer.amount" placeholder="Сумма"/>
        <div class="items__status" :class="{ 'ready': payer.confirmed }">{{ payer.confirmed ? 'оплачено' : 'ожидание' }}</div>
      </div>
      <div v-for="(payer, index) in newbill.payers" class="bill-editor__fields--items">
        <!--<div class="items__title">{{ getUser(payer.wallet) }}</div>-->
        <div class="dropdown">
          <button :disabled="newbill.type !== 'open' ? true : false" @click="opened = 'ex' + index" class="dropbtn">{{ getName(payer.wallet)}}</button>
          <div :id="'myDropdown2' + index" class="dropdown-content" :class="{ 'show': 'ex' + index === opened }">
            <div class="dd-item" v-for="fr in mappedFriends"
            @click="clickedFrEx(fr, index)">{{ fr.name }}</div>
          </div>
        </div>

        <input type="number" :disabled="newbill.type !== 'open' ? true : false" size="6" name="num" min="0" max="1000000" class="items__value input-modern" v-model.number="payer.amount" placeholder="Сумма"/>
        <div class="items__status" :class="{ 'ready': payer.confirmed }">{{ payer.confirmed ? 'оплачено' : 'ожидание' }}</div>
      </div>
    </div>
    <div class="bill-editor__footer">
      <div class="bill-editor__footer--wrapper" :class="{ 'disabled': !summCheck }" v-if="newbill.type === 'open'">
        <div class="bill-editor__footer--btn back" @click="back">Назад</div>
        <div class="bill-editor__footer--btn save" @click="save()">Сохранить</div>
      </div>
      <div class="bill-editor__footer--wrapper" v-if="newbill.type === 'closing'">
        <div class="bill-editor__footer--btn back" @click="cancel">Отклонить</div>
        <div class="bill-editor__footer--btn save" @click="approve">Подтвердить</div>
      </div>
      <div class="bill-editor__footer--wrapper" v-if="newbill.type === 'dead'">
        <div class="bill-editor__footer--btn back" @click="back">Назад</div>
      </div>
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
        friendsall: state => state.auth.friends || [],
        mywallet: state => state.auth.wallet,
        myname: state => state.auth.name
      }),
      friends() {
        return [...this.friendsall, { name: this.myname, wallet: this.mywallet }];
      },
      mappedFriends() {
        return this.friends;
        // .filter(elem => {
        //   return this.news.findIndex(e => e.wallet === elem.wallet) === -1 && 
        //         this.newbill.payers.findIndex(e => e.wallet === elem.wallet) === -1;
        // });
      },
      summCheck() {
        let sum = 0;
        this.newbill.payers.forEach(pay => {
          sum += pay.amount;
        });
        this.news.forEach(pay => {
          sum += pay.amount;
        });
        return this.newbill.pay >= sum;
      }
    },
    methods: {
      ...mapActions({
        saveBill: 'saveBill'
      }),
      getName(wal) {
        console.log(this.friends, wal);
        const my = this.mywallet === wal ? { name: this.myname } : {};
        return (this.friends.find(f => f.wallet === wal) || my).name || "не задан";
      },
      clickedRec(fr) {
        this.newbill.receiver = fr.wallet;
        this.opened = null;
      },
      getReceiver(rec) {
        const ind = this.friends.findIndex(fr => fr.wallet === rec);
        if (ind === -1)
          return 'Получатель не задан';
        return this.friends[ind].name;
      },
      clickedFr(fr, index) {
        this.news[index].wallet = fr.wallet;
        this.opened = null;
      },
      clickedFrEx(fr, index) {
        this.newbill.payers[index].wallet = fr.wallet;
        this.opened = null;
      },
      cancel(){
        this.$router.push({ name: 'current' });
      },
      approve() {
        // if (!this.summCheck)
        //   return;
        const me = this.newbill.payers.findIndex(el => el.wallet === this.mywallet);
        console.log(this.mywallet, this.newbill.payers);
        if (me !== -1)
          this.newbill.payers[me].confirmed = true;
        this.save(true);
        // this.$router.push({ name: 'current' });
      },
      back() {
        this.$router.push({ name: 'current' });
      },
      save(flag) {
        if (!flag && !this.summCheck)
          return;
        if (!this.newbill.payers)
          this.newbill.payers = [];
        this.news.forEach(payer => {
          if (payer.wallet)
            this.newbill.payers.push(payer);
        });
        this.news = [];
        console.log('this.newbill', this.newbill);
        this.saveBill({
          clientData: this.newbill,
          id: (this.bill || {}).id,
          type: (this.bill || {}).type || 'open', // ?????,
          summ: this.newbill.pay,
          payers: this.newbill.payers.map(el => el.wallet),
          receiver: this.newbill.receiver
        });
        this.$router.push({ name: 'current' });
      },
      kill() {
        
      },
      getUser(wallet) {
        const ind = (this.friends || []).find(urs => usr.wallet === wallet);
        return (ind || {}).name || 'Участник';
      },
      add() {
        if (this.newbill.type === 'open')
          this.news.push({
            wallet: null,
            amount: 0,
            confirmed: false
          });
      }
    },
    watch: {
      bill() {
        if (this.bill === null) {
          this.isNew = true;
          this.newbill = {
            title: 'Новый счет 1',
            pay: 100,
            type: 'open',
            payers: [],
            complete: false,
            receiver: ''
          };
          return;
        }
        this.newbill = cloneDeep(this.bill.clientData);
      }
    },
    mounted() {
      if (this.bill === null) {
        this.isNew = true;
        this.newbill = {
          title: 'Новый счет 1',
          pay: 100,
          type: 'open',
          payers: [],
          complete: false,
          receiver: ''
        };
        return;
      }
      this.newbill = cloneDeep(this.bill.clientData);
      this.newbill.type = this.bill.type;
      console.log('mounteeeed', this.newbill);
    }
  };
</script>