
const productList = new ProductList();

function renderSlick(){
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: true,
            centerMode: true,
            focusOnSelect: true
        });
}

function getProductList() {
    const promise = productList.getList();
    promise.then(function (result) {
        result.data.map(function(product,index){
            productList.ArrayP[index] = product;
        })
        showProductList(result.data)
    })
    promise.catch(function (error) {
        console.log(error);
    })
}

function showProductList(list) {
    var content = "";
    var content2 = "";
    document.getElementById('shopWatch').innerHTML = `
    <div id="bigIMG" class="slider-for"></div>
    <div id="smallIMG" class="slider-nav"></div>
    `

    list.map(function (product) {
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
    renderSlick();
}
getProductList();
console.log(productList);
console.log(productList.ArrayP)
