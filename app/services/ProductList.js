function ProductList (){
    this.Array = [];
    this.getList = function(){
        return axios({
            method : 'get',
            url : 'https://62a8007ca89585c1770aba5e.mockapi.io/phone-list'
        })
    }
}