<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      :value="this.id"
      label="ID"
      disabled
    ></v-text-field>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="description"
      :rules="descriptionRules"
      label="Description"
      required
    ></v-text-field>
    <v-btn
      :disabled="!valid"
      @click="save"
    >
      save
    </v-btn>
    <v-btn @click="cancel">Cancel</v-btn>
  </v-form>
  </v-container>
</template>

<script>
  import router from '../../router'
  export default {
    created() {
      this.initialize();
    },
    data: () => ({
      valid: true,
      id: '',
      name: '',
      nameRules: [
        v => !!v || 'Name is required'
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length >= 5) || 'Description must be more than 5 characters'
      ],
      products: [],
      productId: null,
      productIndex: null,
    }),

    methods: {
      initialize () {
        const products = this.products = JSON.parse(localStorage.getItem ('products')); //get product from Storage
        this.productId = this.$route.params.productId; //get product id from query
        
        products.forEach((product, index) => {
          if(+product.id === +this.productId) {
            this.id = product.id
            this.name = product.name
            this.description = product.description
            this.productIndex = index; //save index for update modal of products
          }
        });
        
      },
      save () {
        if (this.$refs.form.validate()) {
          const updatedProduct = { //make obj with updated data
            id: this.id,
            name: this.name,
            description: this.description,
          }
          
          this.products[this.productIndex] = updatedProduct //update modal of products
          this.updateStorage()
              .then(router.push('/')) //redirect to table of products
        }
      },
      cancel () {
        this.$refs.form.reset() //reset data form
        router.push('/') // redirect to products table
      },
      updateStorage() { //update data in LocalStorage
        const promise = new Promise((resolve) => {
          localStorage.removeItem ('products')
          localStorage.setItem ('products', JSON.stringify(this.products))
          resolve()
        })
        return promise
      }
    }
  }
</script>

<style>

</style>
