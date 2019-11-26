<template>
  <v-container ma-4>
    <v-row>
      <v-col>
        <organization-info :organization="organization" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-tabs v-model="tab">
          <v-tab href="#users">
            Users
          </v-tab>
          <v-tab href="#favors">
            Favors
          </v-tab>
          <v-tab-item value="favors">
            <v-container>
              <v-row>
                <v-col cols="12" md="4" :order="formOrder">
                  <CreateFavor />
                </v-col>
                <v-col cols="12" md="8">
                  <Favors :favors="favors" />
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item value="users">
            <v-container>
              <v-row>
                <v-col cols="12" md="4" :order="formOrder">
                  <CreateUser />
                </v-col>
                <v-col cols="12" md="8">
                  <Users :users="users" />
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  components: {
    OrganizationInfo: () => import('@/components/organization/details'),
    Users: () => import('@/components/users/list'),
    Favors: () => import('@/components/favors/list'),
    CreateFavor: () => import('@/components/favors/create'),
    CreateUser: () => import('@/components/users/create')
  },
  computed: {
    formOrder () {
      return this.$vuetify.breakpoint.smAndDown ? 0 : 1
    }
  },
  async asyncData ({ app, store }) {
    const domain = store.state.user.organization
    // get organization information
    const response = await Promise.all([
      app.$axios.get(`organization/${domain}`),
      // get favors
      app.$axios.get('favor'),
      // get users
      app.$axios.get(`organization/${domain}/users`)
    ])
    const [
      organization,
      favors,
      users
    ] = response.map(x => x.data)
    return {
      organization,
      favors,
      users
    }
  }
}
</script>
<style scoped>
</style>
