Vue.component('cart', {
  data() {
    return {
      cartProducts: [],
      isVisible: true,
      img: 'https://placehold.it/50x80'
    }
  },
  methods: {
    addToCart(product) {
      const find = this.cartProducts.find((el) => el.id_product === product.id_product);
      if (find) {
        find.quantity++;
      } else {
        this.cartProducts.push(Object.assign({quantity: 1}, product));
      }
    },
    removeItem(product) {
      const index = this.cartProducts.indexOf(product);
      this.cartProducts.splice(index, 1);
    }
  },
  template: `<div class="cart">
                <p class="cart__header" @click="isVisible = !isVisible">Корзина</p>
                <span class="cart__count">{{ cartProducts.length }}</span>
                <div class="cart__items">
                  <cart-item 
                    v-show="isVisible"
                    v-for="cartItem of cartProducts" 
                    :cartItem="cartItem" 
                    :img="img"
                    :key="cartItem.id_product"
                    @remove-item="removeItem"
                  >
                  </cart-item>
                </div>
            </div>`
});

Vue.component('cart-item', {
  props: ['cartItem', 'img'],
  template: `<div class="cart__item">
                <img :src="img" alt="">
                <div class="cart__item_info">
                  <div>{{cartItem.product_name}}</div>
                  <div class="cart__item_sum">
                    <div>{{cartItem.price}}</div>
                    x
                    <div>{{cartItem.quantity}}шт.</div>
                    =
                    <div>{{cartItem.price * cartItem.quantity}}</div>                
                  </div>                
                </div>
                <button @click="$emit('remove-item', cartItem)" class="btn cart__item_close">&times;</button>
            </div>`
});