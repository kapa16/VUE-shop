const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('product-list', {
  data() {
    return {
      products: [],
      filtered: []
    }
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json());
    },
    addToCart(id) {
      console.log(id);
    }
  },
  mounted() {
    this.getJson(`${API}/catalogData.json`)
      .then(data => {
        this.products = [...this.products, ...data];
        this.filtered = [...this.filtered, ...data];
      })
      .catch(err => {
        console.log(err);
      });
  },
  template: `<div>
                <div v-for="product of filtered" :key="product.id_product">
                    <product-item :product="product"></product-item>
                </div>
            </div>`
});

Vue.component('product-item', {
  props: [
    'product'
  ],
  template: `<div>
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}}</p>
                <button @click="$parent.addToCart(product.id_product)">buy</button>
            </div>`
});