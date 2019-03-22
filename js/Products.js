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
    filter(userInput) {
      const regExp = new RegExp(`${userInput}`, 'i');
      this.filtered = this.products.filter((product) => regExp.test(product.product_name));
    }
  },
  mounted() {
    this.$parent.getJson(`${API}/catalogData.json`)
      .then(data => {
        this.products = [...this.products, ...data];
        this.filtered = [...this.filtered, ...data];
      })
      .catch(err => {
        console.log(err);
      });
      this.$parent.getJson(`./products.json`)
      .then(data => {
        this.products = [...this.products, ...data];
        this.filtered = [...this.filtered, ...data];
      })
      .catch(err => {
        console.log(err);
      });
  },
  template: `<div class="products catalog-container container" >
                <div v-for="product of filtered" :key="product.id_product">
                    <product-item :product="product" :img="img" @add-to-cart="$parent.$refs.cart.addToCart"></product-item>
                </div>
            </div>
`
});

Vue.component('product-item', {
  props: [
    'product',
    'img'
  ],
  // language=HTML
  template: `
<div class="product-card" data-id="9" data-name="Mango People T-shirt" data-price="52">
    <a class="product-card-link" href="single-page.html">
        <div class="product-img-wrap">
            <img class="product-img" :src="img" :alt="product.product_name">
            <div class="product-img-mask"></div>
        </div>

        <div class="product-card-info">
            <p class="product-name">{{product.product_name}}</p>

            <div class="product-bottom">
                <p class="product-price">$ {{product.price}}</p>
                <div class="product-rating">
                    <i class="fas fa-star rating-star"></i>
                    <i class="fas fa-star rating-star"></i>
                    <i class="fas fa-star rating-star"></i>
                    <i class="fas fa-star rating-star"></i>
                    <i class="far fa-star rating-star"></i>
                </div>
            </div>
        </div>
    </a>
    <div class="parent-product-card">
        <div class="add-cart-wrap" @click="$emit('add-to-cart',product)">
            <a href="#" class="product-card-hover">Add to Cart</a>
        </div>
        <div class="product-card-hover-buttons">
            <a href="#" class="product-card-hover reload"></a>
            <a href="#" class="product-card-hover favorite"></a>
        </div>
    </div>
</div>
`
});