<template>
  <v-container ma-4>
    <v-row>
      <v-col>
        <v-text-field
          v-model="search"
          label="Search"
        />
        <Favors :favors="favors" />
          <template slot="title">
            {{ search }} Favors
          </template>
        </Favors>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  components: {
    Favors: () => import('@/components/favors/list')
  },
  data () {
    return {
      search: null
    }
  },
  async asyncData ({ app }) {
    const result = await app.$axios.get(
      `favor`
    )
    return {
      favors: result.data
    }
  }
}
</script>
<style>
</style>
