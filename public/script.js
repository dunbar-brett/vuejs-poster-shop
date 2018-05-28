new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [],
        cart: [],
        search: '',
        lastSearch: '',
        showSearchAmount: false,
        loading: false,
        loadingGif: 'lg.pie-chart-loading-gif.gif'
    },
    filters: {
        toCurrency: function(price) {
            return '$'.concat(price.toFixed(2));
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
                    price: item.price,
                    qty: 1
                });
                this.total += item.price;
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
    }
});