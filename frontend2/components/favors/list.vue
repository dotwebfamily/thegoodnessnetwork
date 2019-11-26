<template>
  <v-card>
    <v-card-title>
      <slot name="title"/>
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="(favor,index) in favors"
          :key="index"
        >
          <v-card class="pa-4 mt-4" width="100%">
            <v-card-title>
              <h3> {{ favor.title }} </h3> &nbsp;
              <h5> ${{ favor.coins }}</h5>
            </v-card-title>
            <v-card-content>
              <p> {{ favor.description }}</p>
              <small class="text-right">
                {{ favor.creator }}: {{ favor.deadline }}
              </small>
            </v-card-content>
          </v-card>
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
