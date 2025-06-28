/* تحميل البيانات المحفوظة من localStorage */
let checkpointsData = {
  "نابلس": [
    { name: "حاجز صرة", entry: "سالك", exit: "أزمة", lastUpdate: "2025-06-28 09:00" },
    { name: "طريق 17 عصيرة", entry: "سالك", exit: "سالك", lastUpdate: "2025-06-28 09:10" },
    { name: "المساكن عصيرة", entry: "أزمة", exit: "سالك", lastUpdate: "2025-06-28 08:45" },
    { name: "حاجز المربعة", entry: "مغلق", exit: "مغلق", lastUpdate: "2025-06-28 08:30" },
    { name: "حاجز عورتا", entry: "سالك", exit: "سالك", lastUpdate: "2025-06-28 08:50" },
    { name: "حاجز دير شرف", entry: "أزمة", exit: "أزمة", lastUpdate: "2025-06-28 09:20" },
    { name: "حاجز الحمرا", entry: "مغلق", exit: "مغلق", lastUpdate: "2025-06-28 08:00" },
    { name: "حاجز تياسير", entry: "سالك", exit: "أزمة", lastUpdate: "2025-06-28 07:50" },
    { name: "مفرق جيت", entry: "سالك", exit: "سالك", lastUpdate: "2025-06-28 09:30" },
    { name: "دوار الطنيب", entry: "أزمة", exit: "سالك", lastUpdate: "2025-06-28 09:15" },
    { name: "مدخل بزاريا", entry: "سالك", exit: "سالك", lastUpdate: "2025-06-28 08:55" },
    { name: "حاجز شافي شمرون", entry: "مغلق", exit: "مغلق", lastUpdate: "2025-06-28 08:20" },
    { name: "حاجز بيت فوريك", entry: "أزمة", exit: "أزمة", lastUpdate: "2025-06-28 08:10" },
    { name: "بوابة بورين", entry: "سالك", exit: "سالك", lastUpdate: "2025-06-28 08:35" },
    { name: "مدخل بيتا", entry: "سالك", exit: "أزمة", lastUpdate: "2025-06-28 09:05" },
    { name: "مدخل يتما قبلان", entry: "أزمة", exit: "سالك", lastUpdate: "2025-06-28 07:40" },
    { name: "مدخل قبلان من جهة الساوية", entry: "سالك", exit: "سالك", lastUpdate: "2025-06-28 08:25" },
    { name: "حاجز حوارة", entry: "سالك", exit: "أزمة", lastUpdate: "2025-06-28 09:35" },
    { name: "بوابات حوارة", entry: "مغلق", exit: "مغلق", lastUpdate: "2025-06-28 09:00" },
    { name: "الباذان", entry: "سالك", exit: "سالك", lastUpdate: "2025-06-28 08:10" },
    { name: "مدخل عقربا", entry: "أزمة", exit: "سالك", lastUpdate: "2025-06-28 07:50" },
    { name: "مدخل مجدل بني فاضل", entry: "سالك", exit: "أزمة", lastUpdate: "2025-06-28 09:25" },
    { name: "خط يتسهار", entry: "مغلق", exit: "مغلق", lastUpdate: "2025-06-28 09:10" },
    { name: "زواتا الالتفافي", entry: "سالك", exit: "سالك", lastUpdate: "2025-06-28 08:40" },
    { name: "اشارات زعترة", entry: "أزمة", exit: "أزمة", lastUpdate: "2025-06-28 09:45" }
  ]
};

  "طولكرم"  [
    { name: "حاجز عناب", entry: "سالك", exit: "سالك", lastUpdate: "2025-06-25 11:00" },
    { name: "حاجز جبارة", entry: "مغلق", exit: "مغلق", lastUpdate: "2025-06-25 08:45" }
  ]


/* حفظ التعديلات */
function saveData() {
  localStorage.setItem("checkpointsData", JSON.stringify(checkpointsData));
}

/* تحديد لون الحالة */
function colorFor(status) {
  if (status === "سالك") return "green";
  if (status === "مغلق") return "red";
  return "orange"; // أزمة
}

/* عرض الحواجز عند اختيار المحافظة */
function loadCheckpoints() {
  const gov = document.getElementById("governorateSelect").value;
  const list = checkpointsData[gov] || [];
  const div = document.getElementById("checkpointsContainer");

  let html = "";
  list.forEach(cp => {
    html += `
      <div class="card">
        <strong>${cp.name}</strong><br>
        الدخول: <span style="color:${colorFor(cp.entry)}">${cp.entry}</span><br>
        الخروج: <span style="color:${colorFor(cp.exit)}">${cp.exit}</span><br>
        🕒 آخر تحديث: ${cp.lastUpdate}
      </div>
    `;
  });

  div.innerHTML = html || "<em>لا توجد بيانات بعد</em>";
}

/* البحث داخل الحواجز */
function searchCheckpoints() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll("#checkpointsContainer .card");

  cards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(input)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}
function toggleDarkMode() {
  const body = document.body;
  const button = document.getElementById('darkModeToggle');

  body.classList.toggle('dark-mode');

  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'on' : 'off');

  // غيّر الأيقونة
  button.textContent = isDark ? '☀️' : '🌙';
}

window.onload = function () {
  const isDark = localStorage.getItem('darkMode') === 'on';
  const body = document.body;
  const button = document.getElementById('darkModeToggle');

  if (isDark) {
    body.classList.add('dark-mode');
    button.textContent = '☀️';
  } else {
    button.textContent = '🌙';
  }
};
messaging
  .requestPermission()
  .then(() => {
    console.log("🔔 Notification permission granted.");
    return messaging.getToken();
  })
  .then((token) => {
    console.log("📲 Token:", token);
    // احفظ هذا التوكن في قاعدة البيانات أو في سيرفرك
  })
  .catch((err) => {
    console.error("🚫 Unable to get permission to notify.", err);
  });

messaging.onMessage((payload) => {
  alert(`📢 ${payload.notification.title}: ${payload.notification.body}`);
});
