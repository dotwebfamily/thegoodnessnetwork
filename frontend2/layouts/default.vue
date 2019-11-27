<template>
  <v-app>
    <v-navigation-drawer
      app
      permanent
      :mini-variant="$vuetify.breakpoint.smAndDown"
      :expand-on-hover="$vuetify.breakpoint.smAndDown"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="title">
              <div>
                <img src="../assets/img/student_icon.png" style="width:45%;">
              </div>
              <div>{{ $store.state.user.email }}</div>
            </v-list-item-title>
            <v-list-item-subtitle>
              From {{ $store.state.user.organization }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider />
      <v-list>
        <v-list-item
          v-for="item in menu"
          :key="item.title"
          link
          :to="item.link"
          @click="item.action"
        >
          <v-list-item-icon>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
export default {
  middleware: 'authenticated',
  data () {
    const menu = [
      {
        title: 'Organization',
        icon: 'mdi-domain',
        link: '/organization'
      },
      {
        title: 'Home',
        icon: 'mdi-home',
        link: '/home'
      },
      {
        title: 'Profile',
        icon: 'mdi-account',
        link: '/profile'
      },
      {
        title: 'Logout',
        icon: 'mdi-logout',
        action: this.logout
      }
    ]
    if (!this.$store.state.user.admin) {
      menu.shift()
    }
    return {
      menu
    }
  },
  methods: {
    async logout () {
      try {
        await this.$axios.get(
          `/auth/logout`
        )
        this.$router.push({
          path: '/login'
        })
        this.$store.commit('logout')
      } catch (e) {
        this.$alert('Couldn\'t log out', 'error')
      }
    }
  }
}
</script>
