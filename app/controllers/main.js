const productList = new ProductList();

function getProductList() {
  const promise = productList.getList();
  promise.then(function (result) {
    result.data.map(function (product, index) {
      productList.ArrayP[index] = product;
    });
    showProductList(result.data);
  });
  promise.catch(function (error) {
    console.log(error);
  });
}
function showProductList(list) {
  var contentShop = "";
  var contentDetail1 = "";
  var contentDetail2 = "";
  list.map(function (product) {
    contentShop += `
      <div class="watch__item" data-toggle="modal" data-target="#exampleModal${product.id}">
        <div class="watch__img">
          <img src="${product.img}" alt="">
        </div>
        <div class="watch__text">
          <h4>${product.name}</h4>
          <p>-${product.price} $-</p>
        </div>
      </div>
    `;
    contentDetail1 = `
    <div class="modal fade " id="exampleModal${product.id}" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="detail">
              <div class="detail__left">
                <div class="swiper mySwiper2${product.id} big__img">
                  <div id="big_img${product.id}" class="swiper-wrapper">
                  </div>
                  <div class="swiper-button-next"></div>
                  <div class="swiper-button-prev"></div>
                </div>
                <div class="swiper mySwiper${product.id} small__img">
                  <div id="small_img${product.id}" class="swiper-wrapper">
                  </div>
                </div>
              </div>
            <div class="detail__right">
                <div class="detail__text">
                    <p>Tên: ${product.name} </p>
                    <p>Hãng: ${product.brand} </p>
                    <p>Giá: ${product.price}</p>
                    <p>Kích cỡ: ${product.size}</p>
                    <p>Loại máy: ${product.model}</p>
                    <p>Loại dây: ${product.strap}</p>
                    <p>Mô tả: ${product.desc}</p>
                </div>
                <div class="detail__Add">
                  <button class="btn btn-info" onclick="renderCart(
                    '${product.img}',
                    '${product.name}',
                    '${product.price}')">
                    Add
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
                <button type="button" class="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    contentDetail2 = printImagesItem(product.imgDetail);


    document.getElementById("detail_watch").innerHTML += contentDetail1;
    document.getElementById(`big_img${product.id}`).innerHTML = contentDetail2;
    document.getElementById(`small_img${product.id}`).innerHTML = contentDetail2;
    renderSwiper(product.id);
  })
  document.getElementById('shop_watch').innerHTML = contentShop;
  
}
function printImagesItem(link) {
  var n = 0;
  var content = ""
  for (let i = 0; i <= link.length; i++) {
    var str = "";

    if (link[i] == ';' || link[i] == undefined) {

      for (let a = n; a < i; a++) {

        str += link[a];

      }
      n = ++i;
      content += `<div class="swiper-slide">
                  <img src="${str}"/>
                </div>
      `
    }
  }
  return content;
}
function renderSwiper(id) {
  for(var i = 1; i<= id; i++){
    var swiper = new Swiper(`.mySwiper${i}`, {
      spaceBetween: 20,
      slidesPerView: "auto",
    });
    var swiper2 = new Swiper(`.mySwiper2${i}`, {
      spaceBetween: 0,
      keyboard: {
          enabled: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      thumbs: {
        swiper: swiper,
        autoScrollOffset: 1,
      },
      
    });
  }
}

const cartItem = [];
function renderCart(img, name, price) {
  cartItem.push({
    img: img,
    name: name,
    price: price,
  });
  var ele = "";
  cartItem.map(function (product) {
    ele += `
        <tr style="width: 100%">
            <td><img style="width: 50px" src= "${product.img}"></td>
            <td>${product.name}</td>
            <td>
                <input id="abc" style="width: 30px" type="number" value="1" min="0"/>
            </td>
            <td>${product.price}</td>
            <td>
                <button class="btn btn-danger">Xóa</button>
            </td>
        </tr>
        `;
    console.log(document.getElementById('abc'));

  }
  );
  document.getElementById("mytbody").innerHTML = ele;
}



getProductList();

