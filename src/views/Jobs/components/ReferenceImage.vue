<template>

      <v-row no-gutters>

        <v-col lg="10">
          <v-img 
              style="background: #333"
              max-height="900"
              contain
              v-if="link.type === 'imageUrl'" :src="link.url"></v-img>
        </v-col>
        <v-col lg="2">
          <v-card class="fill-height" >
            <v-card-title> {{link.title}} </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field dense v-model="link.url" outlined
                              label="Url"></v-text-field>
                <v-text-field dense  v-model="link.title" outlined
                              label="Title"></v-text-field>
                <v-textarea auto-grow  row-height="80"  dense  v-model="link.description" outlined
                            label="Description"></v-textarea>
              </v-form>
            </v-card-text>
          </v-card>

        </v-col>
      </v-row>

</template>

<script>
export default {
name: "ReferenceImage",
  props: {
    link: {type: Object, default: null, required: false}
  }
}
</script>

<style scoped>

</style>
