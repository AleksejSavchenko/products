<template>
  <v-container>
    <v-layout
      wrap
      justify-center
    >
      <v-data-table
        :headers="headers"
        :items="products"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">{{ props.item.id }}</td>
          <td class="text-xs-left">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="updateProduct(props.item.id)"
            >
              edit
            </v-icon>
            <v-icon
              small
              @click="deleteProduct(props.item.id)"
            >
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </v-layout>
    <v-layout row wrap justify-center>
      <div class="text-xs-center pt-2">
        <v-btn color="primary" to="/create">Create</v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script>
  import router from '../../router'
  export default {
    created() {
      this.initialize();
    },
    data: () => ({
      headers: [
        { 
          text: 'ID', 
          align: 'center',
          sortable: false,
          value: 'id' 
          },
        {
          text: 'Name',
          align: 'center',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Description',
          align: 'center',
          sortable: false,
          value: 'description'
        },
        { text: 'Actions', value: 'name', sortable: false }
      ],
      products: [],
    }),

    methods: {
      initialize () {
        this.products = JSON.parse(localStorage.getItem ('products'));
      },
      updateProduct(productId) {
        router.push(`/update/${productId}`)
      },
      deleteProduct(productId) {
        alert(`Product id to delete ${productId}`)
      }
    }
  }
</script>

<style>

</style>
