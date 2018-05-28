new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            { id: 1, title: 'Item 1', price: 9.99 },
            { id: 2, title: 'Item 2', price: 19.99 },
            { id: 3, title: 'Item 3', price: 29.91 }
        ],
        cart: [],
        search: ''
    },
    filters: {
        toCurrency: function(price) {
            return '$'.concat(price.toFixed(2));
        }
    },
    methods: {
        onSubmit: function () {
            // TODO filter to what the search passes using vue-resource or some shit
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
                inc(item);
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