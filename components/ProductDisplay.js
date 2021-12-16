app.component("product-display", {
  props: {
    premium: { type: Boolean, required: true },
  },
  template:
    /*html*/
    `
     <div class="product-display">
     <div class="product-container">
        <div class="product-image">
          <!-- image goes here -->
          <!-- <img
            v-bind:src="image"
            alt="im"
            :class="{ 'out-of-stock-img': !inStock }"
          /> -->
          <!-- short expression -->
          <img
            :src="image"
            :alt="alt"
            :class="{ 'out-of-stock-img': !inStock }"
          />
        </div>
        <div class="product-info">
          <!-- <h1>{{brand + ' ' + product}}</h1> -->
          <h1>{{title}}</h1>
          <p v-if="onSale">{{MessageSale}}</p>
          <p v-if="inventory > 10">In stock</p>
          <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out!</p>
          <p v-else>Out stock</p>
          <!-- Simply use  -->
          <p v-show="inStock">In stock</p>
          <!-- otherwise -->
          <p v-if="inventory>10">In stock</p>
          <!-- List rendreing -->
          <p>Shipping:{{shipping}}</p>
            <!-- product-details component -->
        <product-details :details="details"></product-details>
         <!-- product-details component -->
          
          <div
            v-for="(variant,index) in variants"
            :key="variant.id"
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{backgroundColor:variant.color}"
          >
            <!-- :style="{'background-color':variant.color}" -->
          </div>
          <!-- <button class="button" v-on:click="cart+=1">Add first method</button> -->
          <button
            class="button"
            @click="addToCart()"
            :disabled="!inStock"
            :class="{disabledButton:!inStock}"
          >
            <!-- if the class is always true -->
            <!-- :class="[disable ? disabledButton : '']" -->
            <!-- :class="{disabledButton:disable}" -->

            Add
          </button>
          <button
            class="button"
          :class="{ disabledButton: !inStock }" 
        :disabled="!inStock" 
            @click="removeFromCart()"
          >
            Remove
          </button>
        </div>
      </div>
     <review-list v-if="reviews.length" :reviews="reviews"></review-list>
      <review-from @review-submitted="addReview"></review-from>
     </div>
     `,
  data() {
    return {
      product: "Socks",
      brand: "Vue Ecommerce",
      onSale: true,
      //   image: "./assets/images/sock-1.jpg",
      selectedVariant: 0,
      alt: "image",
      //   inStock: false,
      inventory: 10,
      details: ["50% cotton", "30% wool", "20% polyester"],
      variants: [
        {
          id: Math.random(),
          color: "white",
          image: "./assets/images/sock-1.jpg",
          quantity: 50,
        },
        {
          id: Math.random(),
          color: "pink",
          image: "./assets/images/sock-2.jpg",
          quantity: 0,
        },
      ],
      cart: 0,
      disable: true,
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      //   this.cart += 1;
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    removeFromCart() {
      this.$emit("remove-from-cart", this.variants[this.selectedVariant].id);
    },
    // updateImage(variantImage) {
    //   this.image = variantImage;
    // },
    updateVariant(index) {
      this.selectedVariant = index;
    },
    addReview(review) {
      this.reviews.push(review);
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    MessageSale() {
      return this.brand + " " + this.product + "is on sale!";
    },
    image() {
      return this.variants[this.selectedVariant].image;
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return 2.99;
    },
  },
});
