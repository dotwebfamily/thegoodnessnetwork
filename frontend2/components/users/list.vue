<template>
  <v-card>
    <v-card-title>
      Members
    </v-card-title>
    <v-list>
      <v-list-item
        v-for="(user,index) in users"
        :key="index"
      >
        <h4>{{ index+1 }}.- {{ user.email }}</h4>
      </v-list-item>
      <v-list-item v-if="users.length===0">
        {{ emptyMessage }}
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  props: {
    users: {
      type: Array,
      default: Array
    },
    emptyMessage: {
      type: String,
      default: () => 'No users yet'
    }
  }
}
</script>
<style scoped>
</style>
