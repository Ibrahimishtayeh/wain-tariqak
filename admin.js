let checkpointsData = JSON.parse(localStorage.getItem("checkpointsData")) || {};
if (!localStorage.getItem("checkpointsData")) {
  checkpointsData = {
    "نابلس": [
      { name: "حاجز حوارة", entry: "سالك", exit: "أزمة", lastUpdate: "2025-06-25 11:30" },
      { name: "حاجز بيت إيبا", entry: "أزمة", exit: "سالك", lastUpdate: "2025-06-25 09:15" }
    ],
    "طولكرم": [
      { name: "حاجز عناب", entry: "سالك", exit: "سالك", lastUpdate: "2025-06-25 11:00" },
      { name: "حاجز جبارة", entry: "مغلق", exit: "مغلق", lastUpdate: "2025-06-25 08:45" }
    ]
  };
  saveData(); // احفظها
}


function saveData() {
  localStorage.setItem("checkpointsData", JSON.stringify(checkpointsData));
}

function loadAdminCheckpoints() {
  const gov = document.getElementById("governorateAdmin").value;
  const list = checkpointsData[gov] || [];
  const container = document.getElementById("adminCheckpointsContainer");

  let html = "";
  list.forEach((cp, index) => {
    html += `
      <div class="card">
        <strong>${cp.name}</strong><br>
        الدخول:
        <select onchange="updateCheckpoint('${gov}', ${index}, 'entry', this.value)">
          <option value="سالك" ${cp.entry === 'سالك' ? 'selected' : ''}>سالك</option>
          <option value="أزمة" ${cp.entry === 'أزمة' ? 'selected' : ''}>أزمة</option>
          <option value="مغلق" ${cp.entry === 'مغلق' ? 'selected' : ''}>مغلق</option>
        </select>
        الخروج:
        <select onchange="updateCheckpoint('${gov}', ${index}, 'exit', this.value)">
          <option value="سالك" ${cp.exit === 'سالك' ? 'selected' : ''}>سالك</option>
          <option value="أزمة" ${cp.exit === 'أزمة' ? 'selected' : ''}>أزمة</option>
          <option value="مغلق" ${cp.exit === 'مغلق' ? 'selected' : ''}>مغلق</option>
        </select>
        <br>🕒 آخر تحديث: ${cp.lastUpdate}
      </div>
    `;
  });

  container.innerHTML = html || "<em>لا توجد حواجز في هذه المحافظة</em>";
}

function updateCheckpoint(gov, index, field, value) {
  checkpointsData[gov][index][field] = value;
  checkpointsData[gov][index].lastUpdate = new Date().toLocaleString('ar-EG');
  saveData();
  loadAdminCheckpoints(); // تحديث العرض
}
