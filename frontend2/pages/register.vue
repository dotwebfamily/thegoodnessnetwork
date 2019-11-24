<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="4" md="8" class="image">
        <img src="~/assets/img/background.jpg">
      </v-col>
      <v-col
        v-show="!confirmOrganization"
        cols="8"
        md="4"
      >
        <h2>CREATE ACCOUNT</h2>
        <v-form ref="form" v-model="valid">
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
      <v-col
        v-show="confirmOrganization"
        cols="8"
        md="4"
      >
        <h2>CONFIRM ORGANIZATION CREATION</h2>
        <small>
          The organization is not yet created.
          if you create it, your email will be the admin.
        </small>
        <v-form v-model="valid">
          <v-text-field
            v-model="organization"
            placeholder="Organization Name"
            :rules="[rules.required]"
          />
        </v-form>
        <v-btn
          @click="reset"
        >
          Or login with another account
        </v-btn>
        <v-btn
          :disabled="!valid"
          @click="registerOrganization()"
        >
          Create
        </v-btn>
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
      organization: null,
      eye: mdiEye,
      eye_off: mdiEyeOff,
      confirmOrganization: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v ? v.length >= 8 || 'Min 8 characters' : false,
        email: v => /.+@.+\..+/.test(v) || 'Invalid Email address'
      }
    }
  },
  methods: {
    reset () {
      this.confirmOrganization = false
      this.$refs.form.reset()
    },
    async register () {
      const data = {
        email: this.email,
        password: this.password
      }
      try {
        const response = await this.$axios.post(
          `/auth/register`,
          data
        )
        if (!response.data.confirm) {
          this.login()
        } else {
          this.confirmOrganization = true
        }
      } catch (e) {
        this.$alert(e.response.data, 'error')
      }
    },
    async registerOrganization () {
      try {
        const data = {
          organization: this.organization,
          admin: {
            email: this.email,
            password: this.password
          }
        }
        await this.$axios.post(
          `/auth/register/organization`,
          data
        )
        this.login()
      } catch (e) {
        this.$alert(e.response.data, 'error')
      }
    },
    async login () {
      const data = {
        email: this.email,
        password: this.password
      }
      await this.$axios.post(
        `/auth/login`,
        data
      )
      this.$store.commit('login')
      this.$router.push({
        path: '/favors'
      })
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
