<template>
  <v-card>
    <v-card-title>
      Favors-List
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="(favor,index) in favors"
          :key="index"
        >
          {{ favor | json }}
        </v-list-item>
        <v-list-item v-if="favors.length===0">
          {{ emptyMessage }}
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    favors: {
      type: Array,
      default: Array
    },
    emptyMessage: {
      type: String,
      default: () => 'No favors yet'
    }
  }
}
</script>
<style scoped>
</style>
