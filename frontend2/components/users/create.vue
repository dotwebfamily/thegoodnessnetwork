<template>
  <v-form
    v-model="valid"
    class="pa-4"
    @submit="submit"
  >
    <h4> Create User</h4>
    <v-text-field
      v-model="user.email"
      placeholder="Email"
      :rules="[rules.required, rules.email]"
    />
    <v-text-field
      v-model="user.password"
      placeholder="Password"
      :rules="[rules.required, rules.min]"
      type="password"
    />
    <v-btn :disabled="!valid" type="submit">
      Submit
    </v-btn>
  </v-form>
</template>
<script>
export default {
  data () {
    return {
      valid: false,
      user: {},
      rules: {
        required: value => !!value || 'Required.',
        min: v => v ? v.length >= 8 || 'Min 8 characters' : false,
        email: v => /.+@.+\..+/.test(v) || 'Invalid Email address'
      }
    }
  },
  methods: {
    submit (e) {
      e.preventDefault()
      this.$emit('submit', Object.assign({}, this.user))
      this.user = {}
    }
  }
}
</script>
<style scoped>
</style>
