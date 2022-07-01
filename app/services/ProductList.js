function ProductList() {
    this.ArrayP = [];
    this.getList = function () {
        return axios({
            method: 'get',
            url: 'https://62a8007ca89585c1770aba5e.mockapi.io/watch-list'
        });
    };
    this.searchName = function (tenTK) {
        var mangTK = [];

        var tenTKThuong = tenTK.toLowerCase();
        this.ArrayP.map(function (sp) {
            var tenSPThuong = sp.name.toLowerCase();
            if (tenSPThuong.indexOf(tenTKThuong) > -1) {
                mangTK.push(sp);
            }
        });
        return mangTK;
    };
}