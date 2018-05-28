new Vue({
    el: '#app',
    data: {
        total: 0,
        items: [
            {title: 'Item 1'},
            {title: 'Item 2'},
            {title: 'Item 3'}
        ],
        cart: []
    },
    methods: {
        addItem: function(index) {
            // TODO change this to update on movie.price
            this.total += 9.99;
            this.cart.push(this.items[index]);
        }
    }

    //template: ''
});