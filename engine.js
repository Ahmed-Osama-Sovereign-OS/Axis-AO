// 1. تهيئة قاعدة البيانات (نظام التخزين المحلي)
let db;
const request = indexedDB.open("AhmedOsamaSystemDB", 1);

request.onupgradeneeded = (e) => {
    db = e.target.result;
    db.createObjectStore("userData", { keyPath: "id" });
};

request.onsuccess = (e) => {
    db = e.target.result;
    console.log("System DB Initialized");
};

// 2. دالة حفظ البيانات (تستخدمها لحفظ أي شيء في تطبيقك)
function saveData(key, value) {
    const transaction = db.transaction(["userData"], "readwrite");
    const store = transaction.objectStore("userData");
    store.put({ id: key, data: value });
    console.log("Data Saved: " + key);
}

// 3. دالة استرجاع البيانات
function loadData(key, callback) {
    const transaction = db.transaction(["userData"], "readonly");
    const store = transaction.objectStore("userData");
    const request = store.get(key);
    request.onsuccess = () => callback(request.result ? request.result.data : null);
}

// 4. نظام التحميل والواجهة
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1500);
});

// 5. زر التشغيل الفعلي
function enterSystem() {
    alert("نظام Ahmed Osama متصل بقاعدة البيانات المحلية.");
    saveData("last_access", new Date().toLocaleString());
    document.querySelector('.hero').innerHTML = `
        <h2>تم تفعيل النظام</h2>
        <input type="text" id="userInput" placeholder="اكتب ملاحظة ليتم حفظها...">
        <button onclick="saveMyData()">حفظ في ذاكرة الهاتف</button>
        <div id="statusOutput"></div>
    `;
}

function saveMyData() {
    const val = document.getElementById('userInput').value;
    saveData("user_note", val);
    document.getElementById('statusOutput').innerText = "تم الحفظ بنجاح داخل نظامك.";
}
