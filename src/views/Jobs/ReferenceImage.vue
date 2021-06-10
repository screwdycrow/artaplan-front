<template>
  <v-card dark>
    <v-card-title> {{link.title}} </v-card-title>
    <v-card-text>
      <v-row>
        <v-col lg="2">
          <v-form>
            <v-text-field dense v-model="link.url" outlined
                          label="Url"></v-text-field>
            <v-text-field dense  v-model="link.title" outlined
                          label="Title"></v-text-field>
            <v-textarea auto-grow  row-height="80"  dense  v-model="link.description" outlined
                        label="Description"></v-textarea>
          </v-form>
        </v-col>
        <v-col lg="10">
          <v-img
              max-height="800px"
              contain
              v-if="link.type === 'imageUrl'" :src="link.url"></v-img>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
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
