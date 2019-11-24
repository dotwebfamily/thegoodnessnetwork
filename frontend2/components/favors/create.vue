<template>
  <v-form
    v-model="valid"
    class="pa-4"
    @submit="submit"
  >
    <h4> Create Favor</h4>
    <v-text-field
      v-model="favor"
      label="favor"
    />
    <v-btn :disabled="!valid">
      Submit
    </v-btn>
  </v-form>
</template>
<script>
export default {
  data () {
    return {
      valid: false,
      favor: null
    }
  },
  methods: {
    submit () {
      this.$alert('Not yet implemented!')
    }
  }
}
</script>
<style scoped>
</style>
