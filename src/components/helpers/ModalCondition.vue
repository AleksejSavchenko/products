<template>
  <v-container>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Remove product?</v-card-title>
        <v-card-text>If you delete a product, it cannot be restored.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false; $emit('cancelToDelete')">Cancel</v-btn>
          <v-btn color="green darken-1" flat @click="dialog = false; $emit('confirmToDelete')">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    data: () => ({}),
    computed: {
      dialog() {
        return this.show
      }
    }
  }
</script>

<style>

</style>
