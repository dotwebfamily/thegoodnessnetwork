<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="8" md="6">
        <v-sheet color="blue-grey darken-4" elevation="12" class="pa-12">
          <h1>LOGIN</h1>
          <v-form v-model="valid">
            <v-text-field
              v-model="loginForm.email"
              label="Email"
              :rules="[rules.required, rules.email]"
            />
            <v-text-field
              v-model="loginForm.password"
              label="Password"
              :append-icon="show1 ? eye : eye_off"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
              @click:append="show1 = !show1"
            />
          </v-form>
          <v-btn
            :disabled="!valid"
            @click="login"
          >
            Login
          </v-btn>
        </v-sheet>
        <br>
        <nuxt-link to="/register">
          Or Register your domain
        </nuxt-link>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mdiEyeOff, mdiEye } from '@mdi/js'

export default {
  layout: 'empty',
  data () {
    return {
      valid: false,
      show1: false,
      loginForm: {},
      eye: mdiEye,
      eye_off: mdiEyeOff,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v ? v.length >= 8 || 'Min 8 characters' : false,
        email: v => /.+@.+\..+/.test(v) || 'Invalid Email address'
      }
    }
  },
  methods: {
    async login () {
      try {
        const response = await this.$axios.post(
          `/auth/login`,
          this.loginForm
        )
        this.$store.commit('login')
        this.$store.commit('setUser', response.data.user)
        this.$router.push({
          path: '/favors'
        })
      } catch (e) {
        this.$alert(e.response.data, 'error')
      }
    }
  }
}
</script>
<style scoped>
.row {
  height:100vh;
  text-align:center;
}
.container {
  background: url(../assets/img/background.png);
  background-size: cover;
  background-attachment: fixed;
}
</style>
