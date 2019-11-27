<template>
  <v-container ma-4 fluid>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
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
    <div>
      <footer class="w3-container w3-padding-32 w3-dark-grey">
        <div class="w3-row-padding">
          <div class="w3-third">
            <h3>The Good Network</h3>
            <p>Caring for everyone, The Good Network has created a platform that sees the future of the company and that of all the members in it. Contact us:</p>
            <p>Via web: <a href="https://mitec.itesm.mx" target="_blank">info.thegoodnet.mx</a></p>
            <p>Via e-mail: <a href="https://mitec.itesm.mx" target="_blank">info-portal@tgnet.mx</a></p>
          </div>
          <div class="w3-third">
            <h3>BLOG POSTS</h3>
            <ul class="w3-ul w3-hoverable">
              <li class="w3-padding-16">
                <img src="../assets/img/david-garza.png" class="w3-left w3-margin-right" style="width:50px">
                <span class="w3-large">Dispatch</span><br>
                <span>From Enrique Estremadoyro.</span>
              </li>
              <li class="w3-padding-16">
                <img src="../assets/img/students.jpg" class="w3-left w3-margin-right" style="width:50px">
                <span class="w3-large">Proud for our co-workers</span><br>
                <span>News...</span>
              </li>
            </ul>
          </div>
          <div class="w3-third">
            <h3>POPULAR TAGS</h3>
            <p>
              <span class="w3-tag w3-black w3-margin-bottom">The Good Network</span> <span class="w3-tag w3-grey w3-small w3-margin-bottom">Help</span> <span class="w3-tag w3-grey w3-small w3-margin-bottom">Opportunities</span>
              <span class="w3-tag w3-grey w3-small w3-margin-bottom">Other Places</span> <span class="w3-tag w3-grey w3-small w3-margin-bottom">Job Opportunities</span> <span class="w3-tag w3-grey w3-small w3-margin-bottom">Our Work</span>
              <span class="w3-tag w3-grey w3-small w3-margin-bottom">Coins</span> <span class="w3-tag w3-grey w3-small w3-margin-bottom">Best employees</span> <span class="w3-tag w3-grey w3-small w3-margin-bottom">Our Mission</span>
              <span class="w3-tag w3-grey w3-small w3-margin-bottom">News</span> <span class="w3-tag w3-grey w3-small w3-margin-bottom">Bylaw</span> <span class="w3-tag w3-grey w3-small w3-margin-bottom">Store</span>
              <span class="w3-tag w3-grey w3-small w3-margin-bottom">Sports</span> <span class="w3-tag w3-grey w3-small w3-margin-bottom">More</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
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
.container{
  padding-right: 3%;
}
</style>
