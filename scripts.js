function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  }
  return i;
}

const kuuNimed = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni",
  "Juuli", "August", "September", "Oktoober", "November", "Detsember"];
const paevNimi = [ "Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];
const ilmaNimed = ["0","Selge","Selge","Osaliselt pilves","Pilves","Vihm","Vihm ja äike","Lörts","Lumesadu","Vihm","Vihm","Vihm ja äike","Rahe","Lumesadu","Lumesadu ja äike","Udu","Lörts ja äike","Lumesadu ja äike","Vihm ja äike","Rahe ja äike","Vihm ja äike","Vihm ja äike","Lörts ja äike","Vihm ja äike","Vihm ja äike","Lörts ja äik","Lörts ja äike","Lumesadu ja äike","Lumesadu ja äike","Vihm ja äike","Rahe ja äike","Rahe ja äike","Lörts","Lörts","Lumesadu","Lumesadu","Vihm","Rahe","Rahe","Lumesadu","Lumesadu"];

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  E_kell.innerHTML = h + ":" + m;
  setTimeout(startTime, 500);
}

function kuupaev() {
  const today = new Date();
  const kuu = today.getMonth();
  const nadalapaev = today.getDay();
  const paev = today.getDate();
  E_kuupaev.innerHTML = paevNimi[nadalapaev] + " " + paev + " " + kuuNimed[kuu];
  setTimeout(kuupaev, 500);
}

function ilm() {
  const Http = new XMLHttpRequest();
  const proxy = "https://cors-anywhere.herokuapp.com/";
  const url = 'https://www.yr.no/place/Estonia/Tartumaa/Tartu_linn/forecast.xml';
  Http.open("GET", proxy + url);
  Http.send();

  let weatherXML;
  const parser = new DOMParser();
  let taust = 0;

  Http.onreadystatechange = () => {
    if (Http.readyState === 4 && Http.status === 200) {
      weatherXML = parser.parseFromString(Http.responseText, "text/xml");
      var degreesNow = weatherXML.getElementsByTagName("forecast")[0].children[0].children[0].getElementsByTagName("temperature")[0].getAttribute("value");
      var skyNow = weatherXML.getElementsByTagName("forecast")[0].children[0].children[0].getElementsByTagName("symbol")[0].getAttribute("number");
      E_ilm.innerHTML = ilmaNimed[skyNow] +" " + degreesNow + "°C";
      if (skyNow === 1) {taust = 1;}
    }
  };
  setTimeout(ilm, 1000 * 60 * 60);
}

let E_kell, E_kuupaev, E_ilm;

document.addEventListener("DOMContentLoaded", function () {
  E_kell = document.getElementById('kell');
  E_kuupaev = document.getElementById('kuupäev');
  E_ilm = document.getElementById('ilm');
  startTime();
  kuupaev();
  ilm();
});