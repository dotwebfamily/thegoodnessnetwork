<template>
  <v-card>
    <v-card-title>
      <slot name="title" />
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="(favor,index) in favors"
          :key="index"
        >
          <v-card class="pa-4 mt-4" width="100%">
            <v-card-title class="text-capitalize">
              <h3> {{ favor.title }} </h3> &nbsp;
            </v-card-title>
            <v-card-subtitle>
              <h5> ${{ favor.coins }} coins</h5>
            </v-card-subtitle>
            <v-card-text>
              <p> {{ favor.description }}</p>
              <small class="text-right">
                {{ favor.creator }} needs it before {{ favor.deadline }}
              </small>
            </v-card-text>
            <v-card-actions v-if="actions.length>0">
              <v-btn
                v-for="(btn,actionIndex) in actions"
                :key="actionIndex"
                @click="btn.action(favor)"
              >
                {{ btn.title }}
              </v-btn>
            </v-card-actions>
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
    actions: {
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
