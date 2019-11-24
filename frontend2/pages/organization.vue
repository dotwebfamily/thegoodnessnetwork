<template>
  <v-container ma-4>
    <v-row>
      <v-col>
        <organization-info />
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
                  <Favors />
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
                  <Users />
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
  }
}
</script>
<style scoped>
</style>
