const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

Vue.component('product-list', {
  data() {
    return {
      products: [],
      filtered: [],
      img: 'https://placehold.it/300x200'
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
  template: `<div class="product__catalog container">
                <div v-for="product of filtered" :key="product.id_product">
                    <product-item :product="product" :img="img"></product-item>
                </div>
            </div>`
});

Vue.component('product-item', {
  props: [
    'product',
    'img'
  ],
  template: `<div class="product__card">
                <img :src="img" alt="photo">
                <h3>{{product.product_name}}</h3>
                <p>Цена: {{product.price}}</p>
                <button @click="$parent.addToCart(product.id_product)" class="product__btn">buy</button>
            </div>`
});