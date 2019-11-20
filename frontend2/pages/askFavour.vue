<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-sheet v-model="valid" elevation="12" class="pa-12">
          <h1> Ask a favour</h1><br>
          <v-card
            class="mx-auto"
            color="gray"
            width="500px"
          >
            <v-card-text>
              <h3>Title</h3>
              <v-text-field
                v-model="askFavour.Title"
                label="Be specific, include keyword, be concise"
                :clearable="true"
                :outlined="true"
                :rules="[rules.required]"
              />
            </v-card-text>
            <v-card-text>
              <h3>Body</h3>
              <v-text-field
                v-model="askFavour.Body"
                label="Include all the information someone would need to help you"
                height="250px"

                :outlined="true"
                :rules="[rules.required]"
              />
            </v-card-text>
            <v-card-text>
              <h3>Tags</h3>
              <v-text-field
                v-model="askFavour.Tags"
                label="Add up tags that describe what your favour is about"
                :clearable="true"
                :outlined="true"
                :rules="[rules.required]"
              />
            </v-card-text>
          </v-card>
        </v-sheet>
      </v-col>
      <v-col cols="4" md="4">
        <v-sheet v-model="valid" elevation="12" class="pa-12">
          <h1>Tips</h1><br>
          <ol>
            <li>Summarize your problem</li>
            <div class="description">
              Add up tags that describe what your favour is about. Include:
              <ul>
                <li>What is your goal</li>
                <li>What you think the problem is</li>
                <li>What is about</li>
              </ul>
            </div>
            <li>Describe what you have done</li>
            <div class="description">
              Tell your coworkers what have you tried so far and what is the result
            </div>
            <li>Show some information</li>
            <div class="description">
              Why you choosed the tags to describe the problem
            </div>
          </ol>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      askFavour: {},
      rules: {
        required: value => !!value || 'Required'
      }
    }
  }
}
</script>
<style scoped>
.description{
    font-size: 60%;
}
ol{
    font-size: 120%;
}
</style>
