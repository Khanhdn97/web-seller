const productList = new ProductList();
const cartList = new CartList();
function getProductList() {
  const promise = productList.getList();
  promise.then(function (result) {
    result.data.map(function (product, index) {
      productList.ArrayP[index] = product;
    });
    showProductList(result.data);
    loading(false);
  });
  promise.catch(function (error) {
    console.log(error);
  });

}
function showProductList(list) {
  var contentShop = "";
  var contentDetail1 = "";
  var contentDetail2 = "";
  document.getElementById("detail_watch").innerHTML = "";
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
        <div class="watch__overlay"></div>
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
                  <button class="btn btn-info" onclick="addToCart('${product.id}')" data-dismiss="modal">
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
    document.getElementById(`small_img${product.id}`).innerHTML =
      contentDetail2;
    renderSwiper(product.id);
  });
  document.getElementById("shop_watch").innerHTML = contentShop;
}
function printImagesItem(link) {
  var n = 0;
  var content = "";
  for (let i = 0; i <= link.length; i++) {
    var str = "";

    if (link[i] == ";" || link[i] == undefined) {
      for (let a = n; a < i; a++) {
        str += link[a];
      }
      n = ++i;
      content += `<div class="swiper-slide">
                  <img src="${str}"/>
                </div>
      `;
    }
  }
  return content;
}
function renderSwiper(id) {
  for (var i = 1; i <= id; i++) {
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
function loading(boolean) {
  if (boolean) {
    document.getElementById('loading').style.opacity = 1;
    document.getElementById('loading').style.visibility = "visible";
  } else {
    document.getElementById('loading').style.opacity = 0;
    document.getElementById('loading').style.visibility = "hidden";
  }
}


getProductList();

var cart = [];
function addToCart(id) {
  const promise = cartList.getCartItem(id);
  promise
    .then(function (result) {
      var cartItem = {
        id: result.data.id,
        img: result.data.img,
        name: result.data.name,
        quantity: 1,
        price: result.data.price,
      };
      cart.push(cartItem);
      renderCart();
    })
    .catch(function (error) {
      console.log(error);
    });
}
function renderCart() {
  renderCartItem();
}

function renderCartItem() {
  var ele = "";
  cart.map(function (product) {
    ele += `
        <tr class = "cart__content">
            <td><img style="width: 50px" src= "${product.img}"></td>
            <td>${product.name}</td>
            <td>
                <div class="quantity">
                  <div class="quantity sub" onclick="changeQuatily('sub', ${product.id})"><</div>
                  <div class="number">${product.quantity}</div>
                  <div class="quantity add" onclick="changeQuatily('add', ${product.id})">></div>
                </div>
            </td>
            <td>${product.price}</td>
            <td>
                <button class="btn btn-danger">
                <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
  });
  document.querySelector("#mytbody").innerHTML = ele;
}

function changeQuatily(action, id) {
  cart = cart.map((product) => {
    var quantity = product.quantity;

    if (product.id === id) {
      if (action === "sub") {
        quantity--;
      } else if (action === "add") {
        quantity++;
      }
    }
    return {
      ...product,
      quantity,
    };
  });

  renderCart();
}
// Lọc sản phẩm theo Nhãn hiệu
function locSanPham() {
  var selectELE = document.getElementById("locSP").value;

  switch (selectELE) {
    case "Orient":
      var mangP = timKiem("Orient");
      var mangPCopy = [];
      for (var i = 0; i < mangP.length; i++) {
        mangPCopy.push(mangP[i]);
      }
      showProductList(mangPCopy);

      break;

    default:
      break;
  }
}
function timKiem(value) {
  var mangTK = [];
  productList.ArrayP.map(function (product) {
    if (product.brand == value) {
      mangTK.push(product);
      console.log(mangTK);
    }
    return mangTK;
  });
  showProductList(mangTK);
}
