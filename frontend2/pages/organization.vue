<template>
  <v-container ma-4>
    <v-row>
      <v-col>
        <organization-info :organization="organization" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-tabs v-model="tab" class="border">
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
                  <CreateFavor @submit="addFavor" />
                </v-col>
                <v-col cols="12" md="8">
                  <Favors :favors="favors">
                    <template slot="title">
                      Organization Requested Favors
                    </template>
                  </Favors>
                </v-col>
              </v-row>
            </v-container>
          </v-tab-item>
          <v-tab-item value="users">
            <v-container>
              <v-row>
                <v-col cols="12" md="4" :order="formOrder">
                  <CreateUser @submit="addMember" />
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
    try {
      // get organization information
      const response = await Promise.all([
        app.$axios.get(`organization/${domain}`),
        // get favors
        app.$axios.get(`organization/${domain}/favors`),
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
    } catch (e) {
      app.$alert('No se pudieron hacer los requests', 'error')
    }
  },
  methods: {
    async addFavor (favor) {
      const domain = this.$store.state.user.organization
      try {
        await this.$axios.post(`organization/${domain}/favors`, { favor })
        this.favors.push(favor)
        this.$alert('Agregado exitosamente')
      } catch (e) {
        this.$alert('No se pudo agregar', 'error')
      }
    },
    async addMember (member) {
      try {
        await this.$axios.post(`auth/register`, { ...member })
        console.log(this.$store.state.user)
        member.creator = this.$store.state.user.email
        this.users.push(member)
        this.$alert('Agregado exitosamente')
      } catch (e) {
        this.$alert('No se pudo agregar', 'error')
      }
    }
  }
}
</script>
<style scoped>
.border{
  border-style: solid;
  border-color: #5F5F5F;
  border-width: 5px;
}
</style>
