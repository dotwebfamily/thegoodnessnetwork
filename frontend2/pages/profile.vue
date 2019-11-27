<template>
  <v-container ma-4>
    <v-row>
      <v-col>
        <h3> Profile </h3>
        <!-- tabs -->
        <v-tabs>
          <v-tab href="#porHacer">
            Por hacer
          </v-tab>
          <v-tab href="#encargados">
            Encargados
          </v-tab>
          <v-tab-item value="porHacer">
            <v-tabs>
              <template
                v-for="(tab,index) in porHacerTabs"
              >
                <v-tab :key="index">
                  {{ tab.title }}
                </v-tab>
                <v-tab-item :key="index">
                  <Favors
                    :favors="tab.list"
                    :actions="tab.actions"
                    :empty-message="`No ${tab.title} favors yet`"
                  />
                </v-tab-item>
              </template>
            </v-tabs>
          </v-tab-item>
          <v-tab-item value="encargados">
            <v-tabs>
              <template
                v-for="(tab,index) in encargadosTabs"
              >
                <v-tab :key="index">
                  {{ tab.title }}
                </v-tab>
                <v-tab-item :key="index">
                  <Favors
                    :favors="tab.list"
                    :actions="tab.actions"
                    :empty-message="`No ${tab.title} favors yet`"
                  />
                </v-tab-item>
              </template>
            </v-tabs>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  components: {
    Favors: () => import('@/components/favors/list')
  },
  computed: {
    porHacerTabs () {
      return [
        // aceptados
        {
          title: 'To do',
          list: this.porHacerAceptados,
          actions: [{
            title: 'mark as done',
            action: this.markAsDone
          }]
        },
        // por revisar
        {
          title: 'On review',
          list: this.porHacerReview
        },
        // completados
        {
          title: 'Completed',
          list: this.porHacerCompleted
        }
      ]
    },
    encargadosTabs () {
      return [
        // pending
        {
          title: 'Open',
          list: this.encargadosOpen
        },
        // aceptados
        {
          title: 'On going',
          list: this.encargadosOnGoing
        },
        // por revisar
        {
          title: 'Pending revision',
          list: this.encargadosPending,
          actions: [{
            title: 'confirm',
            action: this.confirmCompleted
          }, {
            title: 'not done yet',
            action: this.notDone
          }]
        },
        // completados
        {
          title: 'Completed',
          list: this.encargadosCompleted
        }
      ]
    },
    porHacerAceptados () {
      return this.porHacer.filter(x => x.status === 'accepted')
    },
    porHacerReview () {
      return this.porHacer.filter(x => x.status === 'done')
    },
    porHacerCompleted () {
      return this.porHacer.filter(x => x.status === 'completed')
    },
    encargadosOpen () {
      return this.encargados.filter(x => x.status === 'open')
    },
    encargadosOnGoing () {
      return this.encargados.filter(x => x.status === 'accepted')
    },
    encargadosPending () {
      return this.encargados.filter(x => x.status === 'done')
    },
    encargadosCompleted () {
      return this.encargados.filter(x => x.status === 'completed')
    }
  },
  async asyncData ({ app }) {
    try {
      const [
        porHacerResponse,
        encargadosResponse
      ] = await Promise.all([
        app.$axios.get(`/favor/me/porHacer`),
        app.$axios.get(`/favor/me/encargados`)
      ])
      return {
        porHacer: porHacerResponse.data,
        encargados: encargadosResponse.data
      }
    } catch (e) {
      app.$alert('Couldn\'t load initial data')
    }
  },
  methods: {
    async markAsDone (favor) {
      try {
        await this.$axios.get(`/favor/done/${favor._id}`)
        this.update()
      } catch (e) {
        this.$alert('Couldn\'t mark as done')
      }
    },
    async notDone (favor) {
      try {
        await this.$axios.get(`/favor/notDone/${favor._id}`)
        this.update()
      } catch (e) {
        this.$alert('Couldn\'t mark as not done')
      }
    },
    async confirmCompleted (favor) {
      try {
        await this.$axios.get(`/favor/confirm/${favor._id}`)
        this.update()
      } catch (e) {
        this.$alert('Couldn\'t mark as completed')
      }
    },
    async update () {
      try {
        const [
          porHacerResponse,
          encargadosResponse
        ] = await Promise.all([
          this.$axios.get(`/favor/me/porHacer`),
          this.$axios.get(`/favor/me/encargados`)
        ])
        this.porHacer = porHacerResponse.data
        this.encargados = encargadosResponse.data
      } catch (e) {
        this.$alert('Couldn\'t update')
      }
    }
  }
}
</script>
<style scoped>
</style>
