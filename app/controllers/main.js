const productList = new ProductList();



function getProductList(list) {
    list.getList().then(function (result) {
        list.Array = result.data;
        // showProductList(list.Array);
    }).catch(function (error) {
        console.log(error);
    })
}
getProductList(productList);
console.log(productList.Array)
function showProductList(list) {
    var content = "";
    var content2 = "";
    document.getElementById('shopWatch').innerHTML = `
    <div id="bigIMG" class="slider-for"></div>
    <div id="smallIMG" class="slider-nav"></div>
    `
    list.map(function (product) {
        console.log("chạy");
        content += `
        <div class="for__item">
            <div class="item__img">
                <img src="${product.img}"alt="">
            </div>
            <div class="item__text">
                <p>Tên: ${product.name} </p>
                <p>Hãng: ${product.brand} </p>
                <p>Giá: ${product.price}</p>
                <p>Kích cỡ: ${product.size}</p>
                <p>Loại máy: ${product.model}</p>
                <p>Loại dây: ${product.strap}</p>
                <p>Mô tả: ${product.desc}</p>
            </div>
        </div>
        `
        content2 += `
            <div class="nav__item">
                    <div class="nav__img">
                        <img src="${product.img}" alt="">
                    </div>
                </div>
        `
    });
    document.querySelector('#bigIMG').innerHTML = content;
    document.querySelector('#smallIMG').innerHTML = content2;
}