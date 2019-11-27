<template>
  <v-card class="border">
    <v-card-title>
      Members
    </v-card-title>
    <hr>
    <v-list class="field">
      <v-list-item
        v-for="(user,index) in users"
        :key="index"
      >
        <h4 class="text">{{ index+1 }}.- {{ user.email }}</h4>
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
.field{
  padding-top: 5%;
  padding-bottom: 5%;
}
.text{
}
.border{
  border-style: solid;
  border-color: #5F5F5F;
  border-width: 5px;
}
</style>
