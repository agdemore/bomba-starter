
<template>
    <div class="auth">auth</div>
</template>

<script>
    import { mapState, mapActions, mapGetters } from 'vuex';
    export default {
        data () {
            return {}
        },
        components: {},
        created () {
        },
        mounted () {
        },
        props: {},
        computed: {
            ...mapGetters({}),
            ...mapState({})
        },
        methods: {
            ...mapActions({
                auth: 'auth'
            })
        }
    }
</script>

<style rel="stylesheet/scss" lang="sass"></style>