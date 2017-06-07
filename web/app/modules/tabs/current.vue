<style lang="sass">
  .current {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    overflow-y: auto;
  }
  .wrapper {
  }
</style>
<template>
  <div class="current">
    <div class="wrapper">
      <bill v-for="bill in bills"
            :key="bill.id"
            :bill="bill"
            v-on:click.native="billClick(bill)">
      </bill>
    </div>
  </div>
</template>
<script type="text/babel">
  import { mapActions, mapState } from 'vuex'
  export default {
    props: {
    },
    data() {
      return {
      };
    },
    components: {
      bill: require('modules/bills/bill.vue')
    },
    computed: {
      ...mapState({
        bills: state => state.tabs.bills
      })
    },
    methods: {
      ...mapActions({
        getBills: 'getBills',
        getInfo: 'getInfo',
        getBillbyId: 'getBillbyId'
      }),
      billClick(bill) {
        this.getBillbyId(bill).then(() => {
          this.$router.push({ name: 'bill' });
        });
      }
    },
    mounted() {
    }
  };
</script>