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
    this.sapXepTangDan = function (mangSapXep) {
        // var mangSapXep = [];
        for (var i = 0; i < mangSX.length; i++) {
            mangSapXep.push(mangSX[i]);
        }
        for (var i = 0; i < mangSapXep.length; i++) {
            for (var j = 0; j < mangSapXep.length - 1; j++) {
                if (Number(mangSapXep[j].price) > Number(mangSapXep[j + 1].price)) {
                    var temp = mangSapXep[j];
                    mangSapXep[j] = mangSapXep[j + 1];
                    mangSapXep[j + 1] = temp;
                }
            }
        }
        return mangSapXep;
    };
    this.sapXepGiamDan = function (mangSapXep) {
        for (var i = 0; i < mangSX.length; i++) {
            mangSapXep.push(mangSX[i]);
        }
        for (var i = 0; i < mangSapXep.length; i++) {
            for (var j = 0; j < mangSapXep.length - 1; j++) {
                if (Number(mangSapXep[j].price) < Number(mangSapXep[j + 1].price)) {
                    var temp = mangSapXep[j];
                    mangSapXep[j] = mangSapXep[j + 1];
                    mangSapXep[j + 1] = temp;
                }
            }
        }
        return mangSapXep;
    };


}