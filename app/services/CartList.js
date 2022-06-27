function CartList() {
  this.getCartItem = function (id) {
    return axios({
      method: "get",
      url: `https://62a8007ca89585c1770aba5e.mockapi.io/watch-list/${id}`,
    });
  };
}
