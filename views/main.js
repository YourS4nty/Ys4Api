document.querySelectorAll('.menu a[data-menu]').forEach(function (element) {
    element.addEventListener('click', function () {
      var menu = this.getAttribute('data-menu');
      document.querySelector('.menu a.active').classList.remove('active');
      this.classList.add('active');
      document.querySelector('.active[data-page]').classList.remove('active');
      document.querySelector('[data-page="' + menu + '"]').classList.add('active');
    });
  });
  
  function view() {
    const activeDiv = document.querySelector('.dialog');
    activeDiv.classList.add('active1'); // Alternar la clase para mostrar/ocultar el div
    const activeDiv2 = document.querySelector('.dialog-block');
    activeDiv2.classList.add('active2'); // Alternar la clase para mostrar/ocultar el div
  }
  function hide() {
    const activeDiv = document.querySelector('.dialog');
    activeDiv.classList.remove('active1'); // Alternar la clase para mostrar/ocultar el div
    const activeDiv2 = document.querySelector('.dialog-block');
    activeDiv2.classList.remove('active2'); // Alternar la clase para mostrar/ocultar el div
  }
  
  // Welcome
  welcomeTxt = "";
  var now = new Date();
  var hours = now.getHours();
  if (hours >= 17 || hours <= 2) {
    welcomeTxt += "Good evening 🌚"
  } else if (hours >= 3 && hours <= 10) {
    welcomeTxt += "Good morning 🌝"
  } else if (hours >= 11 && hours <= 14) {
    welcomeTxt += "Good afternoon 🌞"
  } else if (hours >= 13 && hours <= 16) {
    welcomeTxt += "Good evening 🌜"
  }
  
  document.querySelector('.wText').innerHTML = "Welcome To My Rest Api 😍" + " (" + welcomeTxt + ") ";
  // Welcome
  
  // Info
  window.setTimeout("getip()", 100);
  function getip() {
    var xhr = new XMLHttpRequest();
    var url = 'https://api.ipify.org?format=json';
    xhr.onloadend = function () {
      data = JSON.parse(this.responseText);
      document.getElementById("ipAdd").textContent = data.ip
      document.getElementById("ipAdd2").textContent = navigator.vendor || "Navigator Not Supported"
      document.getElementById("ipAdd3").textContent = navigator.cookieEnabled
    };
    xhr.open("GET", url, true);
    xhr.send();
  }
  // Info
  
  // Battery
  window.setTimeout("getBattery()", 100);
  async function getBattery() {
    try {
      const battery = await navigator.getBattery();
      let newBattery = Math.round(battery.level * 100) + "%";
      document.getElementById("battery1").textContent = newBattery;
  
      let acidH = document.querySelector('.acid');
      let newH = `calc(${newBattery} - 3%)`;
      acidH.style.height = newH;
    } catch (error) {
      console.error('Error accessing Battery Status API:', error);
      let newBattery = "OOPS, Navigator Not Supported!!";
      document.getElementById("battery1").textContent = newBattery;
  
      let acidH = document.querySelector('.acid');
      acidH.style.background = '#E32636';
      acidH.style.height = '97%';
    }
  }
  
  // Battery
  
  // Calendar
  // Función para obtener la fecha actual
  function getCurrentDate() {
    const currentDate = new Date();
    return {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
      day: currentDate.getDate()
    };
  }
  
  // Función para crear y mostrar el calendario
  function createCalendar() {
    const currentDate = getCurrentDate();
    const calendarDiv = document.getElementById('calendar');
    const daysInMonth = new Date(currentDate.year, currentDate.month, 0).getDate();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    let calendarHTML = '<table border="1">';
  
    // Add Day Names To The Table
    calendarHTML += '<tr>';
    for (const day of daysOfWeek) {
      calendarHTML += '<th>' + day + '</th>';
    }
    calendarHTML += '</tr>';
  
    let dayCounter = 1;
  
    for (let i = 0; i < 5; i++) {
      calendarHTML += '<tr>';
      for (let j = 0; j < 7; j++) {
        if (dayCounter <= daysInMonth) {
          calendarHTML += '<td';
          if (dayCounter === currentDate.day) {
            calendarHTML += ' style="background-color: darkCyan;"'; // Make Different The Actual Day
          }
          calendarHTML += '>' + dayCounter + '</td>';
          dayCounter++;
        } else {
          calendarHTML += '<td></td>';
        }
      }
      calendarHTML += '</tr>';
    }
  
    calendarHTML += '</table>';
    calendarDiv.innerHTML = calendarHTML;
  }
  
  createCalendar();
  // Calendar
  
  // Time
  window.setTimeout("setTime()", 1000);
  function setTime() {
    var d = new Date();
    const Hrs = d.getHours();
    let Mts = d.getMinutes();
    if (Mts <= 10) {
      var MtsF = "0" + d.getMinutes()
    } else {
      MtsF = d.getMinutes()
    }
    const Secs = d.getSeconds();
    setTimeout("setTime()", 1000);
    document.getElementById("Clock").innerHTML = Hrs + " : " + MtsF + " : " + Secs;
  }
  // Time
  
  
  // Info Section
  txt = "";
  txt += "<p><b>Version Browser</b>: <br><br>" + navigator.appVersion + "</p>";
  txt += "<p><b>Language</b>: " + navigator.language + "</p>";
  txt += "<p><b>User Agent</b>: <br>" + navigator.userAgent + "</p>";
  
  document.getElementById("Statistic").innerHTML = txt;
  // Info Section