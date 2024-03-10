const getTimes = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; 
    const day = today.getDate();

    return {today, day, month, year};
}

const placeTimes = () => {
    const placeDatas = [{"id":"11","name":"ACEH"},{"id":"12","name":"SUMATERA UTARA"},{"id":"13","name":"SUMATERA BARAT"},{"id":"14","name":"RIAU"},{"id":"15","name":"JAMBI"},{"id":"16","name":"SUMATERA SELATAN"},{"id":"17","name":"BENGKULU"},{"id":"18","name":"LAMPUNG"},{"id":"19","name":"KEPULAUAN BANGKA BELITUNG"},{"id":"21","name":"KEPULAUAN RIAU"},{"id":"31","name":"DKI JAKARTA"},{"id":"32","name":"JAWA BARAT"},{"id":"33","name":"JAWA TENGAH"},{"id":"34","name":"DI YOGYAKARTA"},{"id":"35","name":"JAWA TIMUR"},{"id":"36","name":"BANTEN"},{"id":"51","name":"BALI"},{"id":"52","name":"NUSA TENGGARA BARAT"},{"id":"53","name":"NUSA TENGGARA TIMUR"},{"id":"61","name":"KALIMANTAN BARAT"},{"id":"62","name":"KALIMANTAN TENGAH"},{"id":"63","name":"KALIMANTAN SELATAN"},{"id":"64","name":"KALIMANTAN TIMUR"},{"id":"65","name":"KALIMANTAN UTARA"},{"id":"71","name":"SULAWESI UTARA"},{"id":"72","name":"SULAWESI TENGAH"},{"id":"73","name":"SULAWESI SELATAN"},{"id":"74","name":"SULAWESI TENGGARA"},{"id":"75","name":"GORONTALO"},{"id":"76","name":"SULAWESI BARAT"},{"id":"81","name":"MALUKU"},{"id":"82","name":"MALUKU UTARA"},{"id":"91","name":"PAPUA BARAT"},{"id":"94","name":"PAPUA"}];
    const selects = document.getElementById('staticSelect');
    placeDatas.forEach(data => {
        selects.innerHTML += 
        `<optgroup><option value="${data.name}">${data.name}</option></optgroup>`;
    })
}

const selectedPlace = () => {
    const selects = document.getElementById('staticSelect');
    // Menetapkan nilai awal dari localStorage saat halaman dimuat
    const initialPlace = localStorage.getItem('place');
    selects.value = initialPlace;
  
    // Menambahkan event listener untuk perubahan pada elemen <select>
    selects.addEventListener('change', () => {
      const selected = selects.value;
  
      // Mengubah nilai di localStorage saat ada perubahan
      localStorage.setItem('place', selected);
  
      // Memperbarui tampilan pada halaman
      location.reload(true);
    });
}

const getDataFromAPI = () => {
    const time = getTimes();
    const place = localStorage.getItem('place');
    const loadingTextElement = document.getElementById('loadingText');
    loadingTextElement.classList.remove('hidden');
    return fetch('https://api.aladhan.com/v1/calendarByCity/' + time.year + '/' + time.month + '?city=' + place + '&country=Indonesia&method=20')
    .then(response => response.json())
    .then(data => {
        const prayerTimes = data.data[time.day].timings;
        const prayerData = {
            shubuh: prayerTimes.Fajr,
            imsak: prayerTimes.Imsak,
            sunrise: prayerTimes.Sunrise,
            dzuhur: prayerTimes.Dhuhr,
            ashar: prayerTimes.Asr,
            maghrib: prayerTimes.Maghrib,
            isya: prayerTimes.Isha,
        }
        loadingTextElement.classList.add('hidden');
        return prayerData;
    })
    .catch(err => {
      console.error(err);
      loadingTextElement.classList.add('hidden');
    });
}

const displayPrayerTimes = (data) => {
    const table = document.getElementById('table');
    table.innerHTML = 
    `<thead>
    <tr>
      <th class="border-b text-cyan-800 p-3">Sholat</th>
      <th class="border-b text-cyan-800 p-3">Jam</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td class="border-b text-cyan-800 font-semibold p-3 text-sm text-center xl:text-xl xxl:text-xxl">Imsak</td>
    <td class="border-b text-cyan-800 font-semibold p-3 text-sm text-center">${data.imsak}</td>
  </tr>
    <tr>
      <td class="border-b text-cyan-800 font-semibold p-3 text-sm xl:text-xl xxl:text-xxl text-center">Shubuh</td>
      <td class="border-b text-cyan-800 font-semibold p-3 text-sm text-center">${data.shubuh}</td>
    </tr>
    <tr>
      <td class="border-b text-cyan-800 font-semibold p-3 text-sm xl:text-xl xxl:text-xxl text-center">Terbit</td>
      <td class="border-b text-cyan-800 font-semibold p-3 text-sm text-center">${data.sunrise}</td>
    </tr>
    <tr>
      <td class="border-b text-cyan-800 font-semibold p-3 text-sm xl:text-xl xxl:text-xxl text-center">Dzuhur</td>
      <td class="border-b text-cyan-800 font-semibold p-3 text-sm text-center">${data.dzuhur}</td>
    </tr>
    <tr>
      <td class="border-b text-cyan-800 font-semibold p-3 text-sm xl:text-xl xxl:text-xxl text-center">Ashar</td>
      <td class="border-b text-cyan-800 font-semibold p-3 text-sm text-center">${data.ashar}</td>
    </tr>
    <tr>
      <td class="border-b text-cyan-800 font-semibold p-3 text-sm xl:text-xl xxl:text-xxl text-center">Maghrib</td>
      <td class="border-b text-cyan-800 font-semibold p-3 text-sm text-center">${data.maghrib}</td>
    </tr>
    <tr>
      <td class="text-cyan-800 font-semibold p-3 text-sm xl:text-xl xxl:text-xxl text-center">Isya</td>
      <td class="text-cyan-800 font-semibold p-3 text-sm text-center">${data.isya}</td>
    </tr>
    </tbody>`;
}

const displayDate = () => {
    const dataTimes = getTimes();
    const informationDate = document.querySelector('#information-date');
    const dayName = dataTimes.today.toLocaleDateString('id-ID', { weekday: 'long' });
    const options = { month: 'long' };
    const monthName = new Intl.DateTimeFormat('id-ID', options).format(dataTimes.today);

    informationDate.textContent = `${dayName}, ${dataTimes.day} ${monthName} ${dataTimes.year}`;
}

getDataFromAPI()
.then(data => {
    displayPrayerTimes(data);
    displayDate();
    placeTimes();
    selectedPlace();
})





