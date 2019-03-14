Vue.component('cart', {
  data() {
    return {
      cartProducts: [],
      isVisible: false
    }
  },
  methods: {
    addToCart(product) {
      this.cartProducts.push(product);
    }
  },
  template: `<div class="cart">
                <p class="cart__header">Корзина</p>
                <span class="cart__count">{{ cartProducts.length }}</span>
            </div>`
});