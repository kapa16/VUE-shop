Vue.component('search', {
  data() {
    return {
      userInput: ''
    }
  },
  template: `<form action="" @submit.prevent="$parent.$refs.products.filter(userInput)">
                <input type="text" v-model="userInput">
                <button type="submit">Search</button>
            </form>`
});