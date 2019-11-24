<template>
  <v-card>
    <v-card-title>
      <h3>Organization</h3>
    </v-card-title>
    <v-divider />
    <v-card-text>
      <li><b>Name:</b> {{organization.name}}</li>
      <li><b>Domain:</b> {{organization.domain}}</li>
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
</style>
