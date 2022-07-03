const productList = new ProductList();
const cartList = new CartList();
function getProductList() {
  const promise = productList.getList();
  promise.then(function (result) {
    result.data.map(function (product, index) {
      productList.ArrayP[index] = product;
    });
    showProductList(result.data);
    renderSortBrand();
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
          <p>- ${Number(product.price).toLocaleString()} $ -</p>
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
                    <p>Giá: ${Number(product.price).toLocaleString()} $</p>
                    <p>Kích cỡ: ${product.size}</p>
                    <p>Loại máy: ${product.model}</p>
                    <p>Loại dây: ${product.strap}</p>
                    <p>Mô tả: ${product.desc}</p>
                </div>
                <div class="detail__button">
                  <button class="btn btn-info button-36" onclick="addToCart('${product.id}')" data-dismiss="modal">
                    <i class="fa fa-plus"></i>
                    Thêm vào giỏ
                  </button>
                  <button class="btn btn-info button-36 button-37" data-dismiss="modal" data-toggle = "modal" data-target="#exampleModal">
                    <i class="fa fa-search"></i>
                    Xem giỏ hàng
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

var cart = JSON.parse(localStorage.getItem("CART")) || [];

renderCart();

function addToCart(id) {
  if (
    cart.some(function (product) {
      return product.id === id;
    })
  ) {
    alert("Sản phẩm đã tồn tại trong giỏ hàng");
  } else {
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
}

function renderCart() {
  renderCartItem();
  renderTotal();

  // lưu vào local storage

  localStorage.setItem("CART", JSON.stringify(cart))
}
// Tính tiền tổng tiền
function renderTotal() {
  var totalPrice = 0;
  var totalItem = 0;
  cart.forEach(function (product) {
    totalPrice += (product.price * product.quantity);
    totalItem += product.quantity;
  });
  document.querySelector("#price").innerHTML = `Tổng tiền: $${totalPrice}`
  document.querySelector(".total__item").innerHTML = totalItem;
}
// Hiển thị giỏ hàng
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
                <button class="btn btn-danger" onclick= "removeProduct(${product.id})">
                <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
  });
  document.querySelector("#mytbody").innerHTML = ele;
}
// Thay đổi số lượng sản phẩm
function changeQuatily(action, id) {
  cart = cart.map(function(product) {
    var quantity = product.quantity;

    if (product.id == id) {
      if (action === "sub" && quantity > 1) {
        quantity--;
      } else if (action === "add" && quantity < 10) {
        quantity++;
      }
    }
    return {
      id: product.id,
      img: product.img,
      name: product.name,
      quantity,
      price: product.price,
    };
  });

  renderCart();
}
// Xóa sản phẩm
function removeProduct(id) {
  cart = cart.filter(function (product) {
    return product.id != id;
  })
  renderCart();
}

function clearAllProduct() {
  cart = [];
  renderCart();
}

document.querySelector("#removeAll").onclick = clearAllProduct;
document.querySelector("#purchase").onclick = clearAllProduct;

function sortProduct() {
  var sortList = [];
  locSanPham(sortList);
  sapXepSanPham(sortList);
  showProductList(sortList);
}
function renderSortBrand() {
  var brandList = [];
  brandList.push(productList.ArrayP[0].brand);
  productList.ArrayP.map(function(product){
    var count = 0;
    for(var i = 0; i<brandList.length;i++){
      if(brandList[i] == product.brand) count++;
    }
    if(count == 0) brandList.push(product.brand)
  })
  brandList.map(function(brand){
    document.getElementById("locSP").innerHTML += `
    <option value="${brand}">${brand}</option>`
  })
}

// Lọc sản phẩm theo Nhãn hiệu
function locSanPham(list) {
  var selectELE = document.getElementById("locSP").value;
  if(selectELE == "Lọc Nhãn Hiệu"){
    productList.ArrayP.map(function (product,index) {
      list[index] = product;
    })
  }else timKiem(selectELE,list);
}
function timKiem(value,list) {
  productList.ArrayP.map(function (product) {
    if (product.brand == value) {
      list.push(product);
    }
  });
}
// Sắp xếp Giá
function sapXepSanPham(list) {
  var sxPriceELE = document.getElementById("sxPrice").value;
  var mangSX = [];
  var mangSXCopy = [];
  list.map(function(product,index){
      mangSX[index] = product
  })
  switch (sxPriceELE) {
    case "Tăng dần":
      for (var i = 0; i < mangSX.length; i++) {
        mangSXCopy.push(mangSX[i]);
      }
      for (var i = 0; i < mangSXCopy.length; i++) {
        for (var j = 0; j < mangSXCopy.length - 1; j++) {
          if (Number(mangSXCopy[j].price) > Number(mangSXCopy[j + 1].price)) {
            var temp = mangSXCopy[j];
            mangSXCopy[j] = mangSXCopy[j + 1];
            mangSXCopy[j + 1] = temp;

          }
        }
      }
      list.length = 0;
      mangSXCopy.map(function(product){
        list.push(product);
      })
      break;
    case "Giảm dần":
      for (var i = 0; i < mangSX.length; i++) {
        mangSXCopy.push(mangSX[i]);
      }
      for (var i = 0; i < mangSXCopy.length; i++) {
        for (var j = 0; j < mangSXCopy.length - 1; j++) {
          if (Number(mangSXCopy[j].price) < Number(mangSXCopy[j + 1].price)) {
            var temp = mangSXCopy[j];
            mangSXCopy[j] = mangSXCopy[j + 1];
            mangSXCopy[j + 1] = temp;

          }
        }
      }
      list.length = 0;
      mangSXCopy.map(function(product){
        list.push(product);
      })
      break;

    default: ;
      break;
  }
}

