<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="8" md="6">
        <v-sheet elevation="12" class="pa-12">
          <h1>LOGIN</h1>
          <v-form v-model="valid">
            <v-text-field
              v-model="email"
              placeholder="Email"
              :rules="[rules.required, rules.email]"
            />
            <v-text-field
              v-model="password"
              placeholder="Password"
              :append-icon="show1 ? eye : eye_off"
              :rules="[rules.required, rules.min]"
              :type="show1 ? 'text' : 'password'"
            />
          </v-form>
          <v-btn
            :disabled="!valid"
            @click="login()"
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
      email: null,
      password: null,
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
      const data = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$axios.post(
          `${this.$url}/auth/login`,
          data,
          { withCredentials: true }
        )
      } catch (e) {
        alert(e)
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
