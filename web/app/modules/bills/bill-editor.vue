<style lang="sass">
  .bill-editor {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    &__title {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
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
    <div class="bill-editor__title"></div>
    <div class="bill-editor__fields">
      <div class="bill-editor__fields--users">
      {{ 'Участники: ' + newbill.users.join(', ') }}
      </div>
      <div v-for="payer in newbill.payers" class="bill-editor__fields--items">
        <div class="items__title">{{  }}</div>
        <input class="items__value"/>
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
        newbill: null
      };
    },
    computed: {
      ...mapState({
        bill: state => state.tabs.currentBill
      })
    },
    methods: {
      ...mapActions({
      }),
      back() {
        this.$router.push({ name: 'current' });
      },
      save() {
        this.saveBill(this.newbill);
      }
    },
    mounted() {
      this.newbill = cloneDeep(this.bill);
    },
    watch: {
      bill(newVal) {
        this.newbill = cloneDeep(newVal);
      }
    }
  };
</script>