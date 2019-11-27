<template>
  <v-card class="border">
    <v-card-title>
      <slot name="title"/>
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
            <v-card-text>
              <p class="text"> {{ favor.description }}</p>
              <small class="text-left text">
                <div>
                  {{ favor.creator }} needs it before {{ favor.deadline }}
               </div>
              </small>
               <div class="text">
                  ${{ favor.coins }} coins
                </div>
            </v-card-text>
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
.field{
  background-color: #4B4B4B;
  border-radius: 5px;
  padding: 5%;
  margin-bottom: 7.5%;
}
.background{
  background-color: #B3B3B3;
  color: black;
}
.text{
  color: black;
}
.border{
  border-style: solid;
  border-color: #5F5F5F;
  border-width: 5px;
}
</style>
