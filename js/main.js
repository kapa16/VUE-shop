new Vue({
  el: "#app",
  data: {
    title: 'Shop'
  },
  methods: {
    getJson(url) {
      return fetch(url)
        .then(result => result.json());
    }
  }
});