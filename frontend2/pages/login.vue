<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="8" md="6">
        <v-sheet elevation="12" class="pa-12">
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
        await this.$axios.post(
          `/auth/login`,
          this.loginForm
        )
        this.$store.commit('login')
        this.$router.push({
          path: '/favors'
        })
      } catch (e) {
        alert(e.response.data)
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
</style>
