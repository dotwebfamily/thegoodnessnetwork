<template>
  <v-app class="background">
    <nuxt />
  </v-app>
</template>
<script>
export default {
}
</script>
<style scoped>
.theme--dark.v-application {
  background-color: #263238;
}
::v-deep .theme--dark.v-btn:not(.v-btn--flat):not(.v-btn--text):not(.v-btn--outlined) {
  color: #263238;
  background-color: #acdff9;
}
</style>
