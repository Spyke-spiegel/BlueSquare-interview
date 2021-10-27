<template>
    <div>
        {{roomId}}
    </div>
</template>

<script>
export default {
    created() {
    this.roomId = this.$route.params.id;
    this.userUid = this.$store.state.user.uid;
  },
}
</script>

<style lang="scss" scoped>

</style>