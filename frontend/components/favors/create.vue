<template>
  <v-expansion-panels>
    <v-expansion-panel color="blue-grey darken-3">
      <v-expansion-panel-header class="background">
        <h4> Create Favor</h4>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="background">
        <v-form
          v-model="valid"
          class="pa-4"
          @submit="submit"
        >
          <v-text-field
            v-model="favor.title"
            label="Title"
            placeholder="This is what people will first see!"
            class="field"
          />
          <v-text-field
            v-model="favor.coins"
            label="Coins"
            placeholder="0"
            prefix="$"
            suffix=".00"
            class="field"
          />
          <date-picker
            v-model="favor.deadline"
            label="Deadline"
            placeholder="DD/MM/YY"
            class="field"
          />
          <v-textarea
            v-model="favor.description"
            label="Description"
            placeholder="Tell us more details! Acceptance criteria, the story behind it"
            class="field"
          />
          <v-btn :disabled="!valid" type="submit">
            Submit
          </v-btn>
        </v-form>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  components: {
    DatePicker: () => import('@/components/ui/date-picker')
  },
  data () {
    return {
      valid: false,
      favor: {},
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
      this.$emit('submit', Object.assign({}, this.favor))
      this.favor = {}
    }
  }
}
</script>
<style scoped>
.field{
  border-radius: 5px;
}
</style>
