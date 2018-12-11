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
    }),

    methods: {
      initialize () {
        const products = this.products = JSON.parse(localStorage.getItem ('products'));
        if(products.length > 0){
          this.id = +products[products.length - 1].id + 1;
        } else {
          this.id = 1
        }
        
      },
      save () {
        if (this.$refs.form.validate()) {
          const newProduct = {
            id: this.id,
            name: this.name,
            description: this.description,
          }          
          this.products.push(newProduct)

          this.updateStorage()
              .then(router.push('/'))
        }
      },
      cancel () {
        this.$refs.form.reset()
        router.push('/')
      },
      updateStorage() {
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
