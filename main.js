document.addEventListener("DOMContentLoaded", () => {
  const cartButtons = document.querySelectorAll(".CartBtn");
  const cartIcon = document.querySelector(".CartIcon");
  const cartTitle = document.getElementById("cartTitle");

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  updateCartCount();

  cartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const product = {
        name: btn.dataset.name,
        price: parseInt(btn.dataset.price),
        img: btn.dataset.img,
        quantity: 1
      };

      const existingItem = cartItems.find(item => item.name === product.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.push(product);
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartCount();
    });
  });

  function updateCartCount() {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    if (cartIcon) cartIcon.setAttribute("data-count", count);
    if (cartTitle) cartTitle.textContent = `장바구니(${count})`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.getElementById("calendar");
  const selectedDateText = document.getElementById("selectedDate");

  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    const btn = document.createElement("button");
    btn.textContent = `${date.getMonth() + 1}/${date.getDate()}`;
    btn.style.padding = "0.5rem";
    btn.style.border = "1px solid #ccc";
    btn.style.borderRadius = "0.5rem";
    btn.style.cursor = "pointer";
    btn.style.background = "white";

    btn.addEventListener("click", () => {
      calendar.querySelectorAll("button").forEach(b => {
      b.style.background = "white";
      b.style.color = "black";
      b.style.border = "1px solid #ccc";
  });

  btn.style.background = "#4CAF50";
  btn.style.color = "white";
  btn.style.border = "2px solid #2E7D32";

  selectedDateText.textContent = `선택된 날짜: ${date.getMonth() + 1}월 ${date.getDate()}일 도착 예정`;
  });
    calendar.appendChild(btn);
  }
});
