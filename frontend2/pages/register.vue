<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="4" md="8" class="image">
        <img src="~/assets/img/background.jpg" />
      </v-col>
      <v-col cols="8" md="4">
        <h2>CREATE ACCOUNT</h2>
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
          @click="register()"
        >
          Create
        </v-btn>
        <br>
        <br>
        <nuxt-link to="/login">
          Or login
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
    async register () {
      const data = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$axios.post(
          `${this.$url}/auth/register`,
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
img {
  width: 100%;
  height: 100%;
}
.row {
  height: 100vh;
}
.image {
  height: 100%;
}
.container,.image {
  padding: 0;
}
</style>
