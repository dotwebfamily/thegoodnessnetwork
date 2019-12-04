<template>
  <v-card class="border">
    <v-card-title>
      <slot name="title" />
    </v-card-title>
    <v-card-text>
      <v-list>
        <v-list-item
          v-for="(favor,index) in favors"
          :key="index"
        >
          <v-card class="pa-4 mt-4 background" width="100%">
            <v-card-title class="text-capitalize">
              <h3> {{ favor.title }} </h3> &nbsp;
            </v-card-title>
            <v-card-subtitle>
              <h5> ${{ favor.coins }} coins</h5>
            </v-card-subtitle>
            <v-card-text>
              <p> {{ favor.description }}</p>
              <small class="text-left text">
                <div>
                  {{ favor.creator }} needs it before {{ favor.deadline }}
                </div>
              </small>
              <div class="text-align">
                ${{ favor.coins }} coins
              </div>
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
.field{
  background-color: #4B4B4B;
  border-radius: 5px;
  padding: 5%;
  margin-bottom: 7.5%;
}
.background{
  background-color: #374C56 !important;
  color: #ccc;
}
.text{
  color: #ccc;
}
.text-align{
  color:#ccc;
  text-align:right;
}
.border{
  border-style: solid;
  border-color: #5F5F5F;
  border-width: 5px;
}
</style>
