<template>
  <v-container ma-4>
    <v-row>
      <v-col>
        <template v-if="!add">
          <v-text-field
            v-model="search"
            label="Search"
            @input="searchFavors"
          />
          <v-btn class="mb-4" @click="add = true">
            Add Favor
          </v-btn>
          <Favors :favors="favors" :actions="favorActions">
            <template slot="title">
              <span class="text-capitalize">
                {{ search }} favors
              </span>
            </template>
          </Favors>
        </template>
        <template v-if="add">
          <v-btn class="mb-4" @click="add = false">
            return
          </v-btn>
          <CreateFavor @submit="addFavor" />
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  components: {
    Favors: () => import('@/components/favors/list'),
    CreateFavor: () => import('@/components/favors/create')
  },
  data () {
    return {
      add: false,
      search: '',
      favorActions: [{
        title: 'accept',
        action: this.acceptFavor
      }]
    }
  },
  async asyncData ({ app }) {
    try {
      const result = await app.$axios.get(
        `favor/open`
      )
      const updateFavors = (() => {
        const CancelToken = axios.CancelToken
        let request
        return async function (search) {
          try {
            if (request) {
              request.cancel()
            }
            request = CancelToken.source()
            const results = await app.$axios.get(
              `favor/search/${search}`,
              { cancelToken: request.token }
            )
            return results.data
          } catch (e) {
            if (!axios.isCancel(e)) {
              app.$alert('Search Request failed', 'error')
            }
          }
        }
      })()

      return {
        favors: result.data,
        updateFavors
      }
    } catch (e) {
      app.$alert('Initial load failed', 'error')
    }
  },
  methods: {
    async searchFavors () {
      if (this.search === '') {
        try {
          const response = await this.$axios.get(
            `favor/open`
          )
          this.favors = response.data
        } catch (e) {
          this.$alert('empty load failed', 'error')
        }
        return
      }
      const results = await this.updateFavors(this.search)
      this.favors = results === undefined ? this.favors : results
    },
    async addFavor (favor) {
      // implement
      this.add = false
      try {
        const response = await this.$axios.post(
          '/favor',
          favor
        )
        if (response) {
          this.searchFavors()
        }
      } catch (e) {
        console.log(e)
        this.$alert(e.response.data, 'error')
      }
    },
    async addService (service) {
      this.add = false
      try {
        await this.$axios.post(
          '/service',
          service
        )
        this.services.push(service)
      } catch (e) {
        this.$alert('Couldn\'t add service', 'error')
      }
    },
    async acceptFavor (favor) {
      try {
        console.log(favor._id)
        await this.$axios.get(
          `/favor/accept/${favor._id}`
        )
        this.searchFavors()
      } catch (e) {
        this.$alert('Couldn\'t accept favor', 'error')
      }
    }
  }
}
</script>
<style>
</style>
