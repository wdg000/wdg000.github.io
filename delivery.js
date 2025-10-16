document.addEventListener("DOMContentLoaded", function () {
  const orderCompleted = localStorage.getItem("orderCompleted");
  if (!orderCompleted) {
    alert("아직 주문이 완료되지 않았습니다. 주문 후 이용해주세요.");
    window.location.href = "main.html";
    return;
  }

  const table = document.getElementById("trackingTable");
  const stages = [
    { location: "물류센터 입고", status: "상품 준비 중" },
    { location: "물류센터 출발", status: "배송 중" },
    { location: "중간 거점 도착", status: "배송 중" },
    { location: "배송 지역 도착", status: "배송 중" },
    { location: "배송 완료", status: "고객님께 배송 완료" }
  ];

  let trackingData = JSON.parse(localStorage.getItem("trackingData")) || [];
  let currentStage = trackingData.length;

  if (currentStage > 0 && currentStage === stages.length) {
    localStorage.removeItem("trackingData");
    localStorage.removeItem("orderCompleted");
    trackingData = [];
    currentStage = 0;
  }

  function getRandomTemp() {
    return (Math.random() * 3 + 2).toFixed(1); // 2~5℃
  }

  function getRandomHumidity() {
    return (Math.random() * 15 + 80).toFixed(0); // 80~95%
  }

  function getFreshness(temp, humidity) {
    temp = parseFloat(temp);
    humidity = parseFloat(humidity);

    if (temp >= 2 && temp <= 5 && humidity >= 80 && humidity <= 95)
      return { status: "신선함", color: "green" };
    else if (temp <= 8)
      return { status: "보통", color: "orange" };
    else
      return { status: "주의", color: "red" };
  }

  trackingData.forEach(data => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${data.time}</td>
      <td>${data.location}</td>
      <td>${data.status}</td>
      <td>${data.temp}</td>
      <td>${data.humidity}</td>
      <td style="color:${data.freshness.color}; font-weight:bold;">${data.freshness.status}</td>
    `;
    table.appendChild(row);
  });

  function addTrackingRow() {
    if (currentStage >= stages.length) {
      console.log("배송 완료! 주문 상태 초기화됨.");
      localStorage.removeItem("orderCompleted");
      localStorage.removeItem("trackingData");
      alert("배송이 완료되었습니다! 다음 주문을 위해 초기화됩니다.");
      return;
    }

    const now = new Date().toLocaleTimeString("ko-KR", { hour12: false });
    const { location, status } = stages[currentStage];
    const temp = getRandomTemp();
    const humidity = getRandomHumidity();
    const freshness = getFreshness(temp, humidity);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${now}</td>
      <td>${location}</td>
      <td>${status}</td>
      <td>${temp}</td>
      <td>${humidity}</td>
      <td style="color:${freshness.color}; font-weight:bold;">${freshness.status}</td>
    `;
    table.appendChild(row);

    trackingData.push({ time: now, location, status, temp, humidity, freshness });
    localStorage.setItem("trackingData", JSON.stringify(trackingData));

    currentStage++;
    if (currentStage < stages.length) {
      setTimeout(addTrackingRow, 10000); // 10초마다 다음 단계
    }
  }

  // 배송 시작
  if (currentStage < stages.length) {
    setTimeout(addTrackingRow, 1000); // 1초 후 시작
  }
});
