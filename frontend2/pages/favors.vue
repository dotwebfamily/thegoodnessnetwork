<template>
  <v-container>
    Favors
    <nuxt-link to="/home">
      home
    </nuxt-link>
    <v-list>
      <v-list-item v-for="(item,index) in favors" :key="index">
        <v-card>
          <v-card-title>
            <h3> title: {{ item.title }}</h3>
          </v-card-title>
          <v-card-subtitle>
            <br>
            <p>
              descripcion: {{ item.description }}<br>
              deadline: {{ item.deadline }}
            </p>
          </v-card-subtitle>
        </v-card>
      </v-list-item>
    </v-list>
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
