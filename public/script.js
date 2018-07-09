var PRICE = 9.99;
new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        search: 'anime',
        lastSearch: '',
        showSearchAmount: false,
        loading: false,
        loadingGif: 'public/lg.pie-chart-loading-gif.gif',
        price: PRICE
    },
    filters: {
        toCurrency: function(num) {
            return '$'.concat(num.toFixed(2));
        }
    },
    methods: {
        onSubmit: function () {
            this.items = [];
            this.loading = true;
            this.$http
                .get('/search/'.concat(this.search))
                    .then(function(res) {
                        this.lastSearch = this.search;
                        this.items = res.data;
                        this.showSearchAmount = true;
                        this.loading = false;
                    });
            
        },
        addItem: function (index) {
            var item = this.items[index];
            var isItemInCart = this.cart.some(f => f.id == item.id);

            if(!isItemInCart){
                this.cart.push({
                    id: item.id,
                    title: item.title,
                    price: PRICE,
                    qty: 1
                });
                this.total += PRICE;
            } else {
                this.inc(item);
            }
        },
        inc: function(item) {
            this.cart.filter(function(e) {
                if (e.id == item.id) {
                    e.qty += 1;
                }                    
            });
            this.total += item.price;
        },
        dec: function(item, index) {
            this.cart.filter(function(e) {
                if (e.id == item.id) {
                    e.qty -= 1;
                }                     
            });
            if(item.qty == 0) {
                this.cart.splice(index, 1);
            }
            this.total -= item.price;
        }
    },
    mounted: function() {
        this.onSubmit();
    }
});