// Viloyatni tanlash uchun select elementi
const regionSelect = document.getElementById('region-select');

// Tugmalar funksiyalari
document.getElementById('today-btn').addEventListener('click', () => loadPrayerTimes('day'));
document.getElementById('week-btn').addEventListener('click', () => loadPrayerTimes('week'));
document.getElementById('month-btn').addEventListener('click', () => loadPrayerTimes('monthly'));

// Ma'lumotlarni yuklash funksiyasi
function loadPrayerTimes(period) {
    const region = regionSelect.value;
    let apiUrl = '';

    if (period === 'day') {
        apiUrl = `https://islomapi.uz/api/present/day?region=${region}`;
    } else if (period === 'week') {
        apiUrl = `https://islomapi.uz/api/present/week?region=${region}`;
    } else if (period === 'monthly') {
        const month = new Date().getMonth() + 1; // Joriy oyni olish
        apiUrl = `https://islomapi.uz/api/monthly?region=${region}&month=${month}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (period === 'day') {
                displayTimes([data]);
            } else {
                displayTimes(data);
            }
            toggleButtons(false); // Ortga qaytish tugmasini ko'rsatish
        })
        .catch(error => console.error('Xato:', error));
}

// Namoz vaqtlarini ekranga chiqarish funksiyasi
function displayTimes(times) {
    const timesDiv = document.getElementById('times');
    timesDiv.innerHTML = '';  // Avvalgi ma'lumotlarni tozalash

    times.forEach(time => {
        const timeBox = document.createElement('div');
        timeBox.className = 'time-box';
        timeBox.innerHTML = `
            <p><strong>Sana:</strong> ${time.date}</p>
            <p><strong>Bomdod:</strong> ${time.times.tong_saharlik}</p>
            <p><strong>Quyosh:</strong> ${time.times.quyosh}</p>
            <p><strong>Peshin:</strong> ${time.times.peshin}</p>
            <p><strong>Asr:</strong> ${time.times.asr}</p>
            <p><strong>Shom:</strong> ${time.times.shom_iftor}</p>
            <p><strong>Xufton:</strong> ${time.times.hufton}</p>
        `;
        timesDiv.appendChild(timeBox);
    });
}

// Tugmalarni almashtirish funksiyasi
function toggleButtons(showMain) {
    document.querySelector('.buttons').style.display = showMain ? 'block' : 'none';
    document.getElementById('back-btn').style.display = showMain ? 'none' : 'block';
}

// Ortga qaytish tugmasi
document.getElementById('back-btn').addEventListener('click', () => {
    document.getElementById('times').innerHTML = '';  // Ma'lumotlarni tozalash
    toggleButtons(true); // Asosiy tugmalarni qaytarish
});
