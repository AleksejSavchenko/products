<template>
  <v-container>
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
            @click="modalMethodForDelete(props.item.id)"
          >
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <v-layout row wrap justify-center>
      <div class="text-xs-center pt-3">
        <v-btn color="primary" to="/create">Create</v-btn>
      </div>
    </v-layout>
  <modal-condition 
    :show="this.showModal"
    v-on:confirmToDelete="deleteProduct()"
    v-on:cancelToDelete="cancelToDelete()"
  ></modal-condition>  
  </v-container>
</template>

<script>
  import router from '../../router'
  import ModalCondition from '../../components/helpers/ModalCondition'
  export default {
    components: {
      ModalCondition
    },
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
      showModal: false,
      productIdForDelete: null
    }),

    methods: {
      initialize () {
        this.products = JSON.parse(localStorage.getItem ('products')); //get products from Storage
      },
      updateProduct(productId) {
        router.push(`/update/${productId}`) //make url with product id for update
      },

      cancelToDelete() {
        this.productIdForDelete = null
        this.showModal = false
      },

      modalMethodForDelete(productId){ //method for showing modal window with condition
        this.showModal = true;
        this.productIdForDelete = productId;
      },
      deleteProduct() {
        this.products.forEach((product, index) => {
          if(+product.id === +this.productIdForDelete) {
            this.products.splice(+index, 1) //find and remove product from array of products
          }
        });

        this.updateStorage().then( //after update array of products close modal window and clean model with product id for deleting
          this.showModal = false,
          this.productIdForDelete = null
        )
      },
      updateStorage() {
        const promise = new Promise((resolve) => { //update LocalStorage
          localStorage.removeItem ('products')
          localStorage.setItem ('products', JSON.stringify(this.products))
        })
        return promise
      }
    }
  }
</script>

<style>

</style>
