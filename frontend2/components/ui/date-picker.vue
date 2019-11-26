<template>
  <v-menu
    offset-y
    width="auto"
    min-width="auto"
  >
    <template v-slot:activator="{ on }">
      <v-text-field
        ref="field"
        :label="label"
        :placeholder="placeholder"
        :value="dateFormatted"
        :rules="rules"
        read-only
        v-on="on"
      />
    </template>
    <v-date-picker
      :value="value"
      :min="min"
      @input="$emit('input',$event)"
    />
  </v-menu>
</template>
<script>
import moment from 'moment'
export default {
  inject: {
    form: { default: null }
  },
  props: {
    rules: {
      type: Array,
      default: Array
    },
    iconPlace: {
      type: String,
      default: 'append'
    },
    label: {
      type: String,
      default: String
    },
    placeholder: {
      type: String,
      default: String
    },
    value: {
      type: String,
      default: String
    },
    min: {
      type: String,
      default: String
    },
    formatting: {
      type: Function,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    dateFormatted () {
      if (this.formatting) { return this.value ? this.formatting(this.value) : null }
      return this.value ? this.formatDate(this.value) : null
    }
  },
  created () {
    this.form && this.form.register(this)
  },
  beforeDestroy () {
    this.form && this.form.unregister(this)
  },
  methods: {
    formatDate (dateString) {
      return moment(dateString).format('MM/DD/YYYY')
    },
    defaultDateFormatted () {
      return this.value ? this.formatDate(this.value) : null
    },
    validate () {
      this.$refs.field.validate()
    },
    reset () {
      this.$refs.field.reset()
    },
    resetValidation () {
      this.$refs.field.resetValidation()
    }
  }
}
</script>
<style scoped>
</style>
