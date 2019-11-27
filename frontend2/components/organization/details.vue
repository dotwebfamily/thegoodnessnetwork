<template>
  <v-card>
    <v-card-title class="title">
      <h3>Organization</h3>
    </v-card-title>
    <v-divider />
    <v-card-text class="background">
      <li><b>Name:</b> {{ organization.name }}</li>
      <li><b>Domain:</b> {{ organization.domain }}</li>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    organization: {
      type: Object,
      default: Object
    }
  }
}
</script>
<style scoped>
li{
  font-size: 125%;
  color: black;
}
.title{
  font-size: 125%;
  background-color: #181818;
  color: white;
}
.background{
  background-color: #B3B3B3;
  color: black;
}
</style>
