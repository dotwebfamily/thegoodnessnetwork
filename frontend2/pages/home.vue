<template>
  <v-container ma-4>
    <v-row>
      <v-col>
        <v-tabs v-model="tab">
          <v-tab href="#services">
           Services
          </v-tab>
          <v-tab href="#favors">
            Favors
          </v-tab>
          <v-tab-item value="favors" class="pa-4">
            <template v-if="!add">
              <v-btn @click="add = true" class="mb-4">
                Add Favor
              </v-btn>
              <v-text-field
                v-model="search"
                label="Search"
                @input="searchFavors"
              />
              <Favors :favors="favors">
                <template slot="title">
                  <span class="text-capitalize">
                    {{ search }} favors
                  </span>
                </template>
              </Favors>
            </template>
            <template v-if="add">
              <v-btn @click="add = false" class="mb-4">
                return
              </v-btn>
              <CreateFavor @submit="addFavor" />
            </template>
          </v-tab-item>
          <v-tab-item value="services" class="pa-4">
            <template v-if="!add">
              <v-btn @click="add = true" class="mb-4">
                Add Service
              </v-btn>
              <v-text-field
                v-model="search"
                label="Search"
                @input="searchFavors"
              />
              <Favors :favors="favors">
                <template slot="title">
                  <span class="text-capitalize">
                    {{ search }} services
                  </span>
                </template>
              </Favors>
            </template>
            <template v-if="add">
              <v-btn @click="add = false" class="mb-4">
                return
              </v-btn>
              <CreateFavor @submit="addFavor" />
            </template>
          </v-tab-item>
          <v-tab-item value="services">
          </v-tab-item>
        </v-tabs>
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
      search: null
    }
  },
  async asyncData ({ app }) {
    try {
      const result = await app.$axios.get(
        `favor`
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
            `favor`
          )
          this.favors = response.data
        } catch (e) {
          this.$alert('empty load failed', 'error')
        }
        return
      }
      const results = await this.updateFavors(this.search)
      this.favors = results === undefined ? this.favors : results
    }
  }
}
</script>
<style>
</style>
