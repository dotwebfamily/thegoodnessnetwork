<template>
  <v-container ma-4>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <h3>Favors</h3>
          </v-card-title>
          <v-list>
            <v-list-item v-for="(item,index) in favors" :key="index">
              <v-card-title>
                <h3> {{ item.title }}</h3>
              </v-card-title>
              <v-card-subtitle>
                <br>
                <p>
                  {{ item.description }}<br>
                  : {{ item.deadline }}
                </p>
              </v-card-subtitle>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  async asyncData ({ app }) {
    const result = await app.$axios.get(
      `/favors`
    )
    return {
      favors: result.data
    }
  }
}
</script>
<style>
</style>
