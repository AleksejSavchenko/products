<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="id"
      label="ID"
      required
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
      @click="submit"
    >
      submit
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
    }),

    methods: {
      initialize () {
        this.products = JSON.parse(localStorage.getItem ('products'));
        this.productId = this.$route.params.productId;
        
        for(let product of this.products) {
          if(+product.id === +this.productId) {
            this.id = product.id
            this.name = product.name
            this.description = product.description
          }
        }
        
      },
      submit () {
        if (this.$refs.form.validate()) {
          
        }
      },
      cancel () {
        this.$refs.form.reset()
        router.push('/')
      }
    }
  }
</script>

<style>

</style>
