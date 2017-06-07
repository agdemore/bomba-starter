<style lang="sass">
  .current {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    overflow-y: auto;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    .spinner {
      align-self: center;
      margin-top: 11px;
      width: 150px;
      height: 150px;
      cursor: pointer;

      position: relative;
    }

    .double-bounce1, .double-bounce2 {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #2ecc71;
      opacity: 0.6;
      position: absolute;
      top: 0;
      left: 0;
      
      -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
      animation: sk-bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
      -webkit-animation-delay: -1.0s;
      animation-delay: -1.0s;
    }

    @-webkit-keyframes sk-bounce {
      0%, 100% { -webkit-transform: scale(0.0) }
      50% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bounce {
      0%, 100% { 
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
      } 50% { 
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
    }

  }
  
</style>
<template>
  <div class="current">
    <div class="wrapper">
      <div v-if="(bills || []).length === 0" class="spinner">
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>
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