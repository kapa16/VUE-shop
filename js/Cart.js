Vue.component('cart', {
  data() {
    return {
      cartProducts: [],
      isVisible: false
    }
  },
  methods: {
    addToCart(product) {
      this.cartProducts.push(Object.assign({quantity: 1}, product));
    },
    removeItem(product) {
      const index = this.cartProducts.indexOf(product);
      this.cartProducts.splice(index, 1);
    }
  },
  template: `<div class="cart">
                <p class="cart__header" @click="isVisible = !isVisible">Корзина</p>
                <span class="cart__count">{{ cartProducts.length }}</span>
                <div class="cart__products">
                  <cart-item 
                    v-show="isVisible"
                    v-for="cartItem of cartProducts" 
                    :cartItem="cartItem" 
                    :key="cartItem.id_product"
                    @remove-item="removeItem"
                  >
                  </cart-item>
                </div>
            </div>`
});

Vue.component('cart-item', {
  props: ['cartItem', 'img'],
  template: `<div>
                <img :src="img" alt="">
                <div>{{cartItem.quantity}}</div>
                <div>{{cartItem.price * cartItem.quantity}}</div>
                <button @click="$emit('remove-item', cartItem)">&times;</button>
            </div>`
});