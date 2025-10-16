document.addEventListener("DOMContentLoaded", () => {
  const cartList = document.getElementById("cartList");
  const cartTitle = document.getElementById("cartTitle");
  const cartIcon = document.querySelector(".CartIcon");
  const orderButton = document.getElementById("orderButton");

  let cartItems;
  try {
    cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (!Array.isArray(cartItems)) cartItems = [];
  } catch {
    cartItems = [];
  }

  render();

  if (orderButton) {
    orderButton.addEventListener("click", () => {
      const selectedDate = document.getElementById("selectedDate").textContent || "없음";

      if (!cartItems || cartItems.length === 0) {
        alert("장바구니가 비어 있습니다.");
        return;
      }

      if (selectedDate.includes("없음")) {
        alert("배송 날짜를 선택해주세요.");
        return;
      }

      alert("주문이 완료되었습니다");
      localStorage.setItem("orderCompleted", "true");
      localStorage.removeItem("cartItems");
      cartItems = [];
      render();
    });
  }

  function render() {
    cartList.innerHTML = "";
    let total = 0;

    cartItems.forEach((item, idx) => {
      const itemTotal = (item.price || 0) * (item.quantity || 1);
      total += itemTotal;

      const div = document.createElement("div");
      div.className = "cart-entry";
      div.style.display = "flex";
      div.style.gap = "1rem";
      div.style.marginBottom = "1rem";
      div.style.alignItems = "center";
      div.innerHTML = `
        <img src="${item.img}" style="width:80px; height:auto; border-radius:8px;">
        <div>
          <h3 style="margin:0;">${item.name}</h3>
          <p style="margin:0;">단가: ${Number(item.price).toLocaleString()}원</p>
          <p style="margin:0;">수량: ${item.quantity}</p>
          <p style="margin:0;">합계: ${itemTotal.toLocaleString()}원</p>
        </div>
        <div>
          <button data-idx="${idx}" class="removeBtn">삭제</button>
        </div>
      `;
      cartList.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.id = "totalDiv";
    totalDiv.style.marginTop = "1.5rem";
    totalDiv.style.fontWeight = "bold";
    totalDiv.textContent = `총 결제금액: ${total.toLocaleString()}원`;
    cartList.appendChild(totalDiv);

    const totalCount = cartItems.reduce((s, it) => s + (it.quantity || 0), 0);
    if (cartIcon) cartIcon.setAttribute("data-count", totalCount);
    if (cartTitle) cartTitle.textContent = `장바구니(${totalCount})`;

    document.querySelectorAll(".removeBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.idx);
        cartItems.splice(idx, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        render();
      });
    });
  }
});
