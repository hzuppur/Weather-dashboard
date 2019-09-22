function checkTime(i) {
  if (i < 10) {
    i = "0" + i
  }
  return i;
}

const kuuNimed = ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni",
  "Juuli", "August", "September", "Oktoober", "November", "Detsember"];
const paevNimi = [ "Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];
const ilmaNimed_test = ["0","Selge_1","Selge_2","Osaliselt pilves_3","Pilves_4","Vihm_5","Vihm ja äike_6","Lörts_7","Lumesadu_8","Vihm_9","Vihm_10","Vihm ja äike_11","Rahe_12","Lumesadu_13","Lumesadu ja äike_14","Udu_15","Lörts ja äike_16","Lumesadu ja äike_17","Vihm ja äike_18","Rahe ja äike_19","Vihm ja äike_20","Vihm ja äike_21","Lörts ja äike_22","Vihm ja äike_23","Vihm ja äike_24","Lörts ja äike_25","Lörts ja äike_26","Lumesadu ja äike_27","Lumesadu ja äike_28","Vihm ja äike_29","Rahe ja äike_30","Rahe ja äike_31","Lörts_32","Lörts_33","Lumesadu_34","Lumesadu_35","Vihm_36","Rahe_37","Rahe_38","Lumesadu_39","Lumesadu_40"];
const ilmaNimed = ["0","Selge","Selge","Osaliselt pilves","Pilves","Vihm","Vihm ja äike","Lörts","Lumesadu","Vihm","Vihm","Vihm ja äike","Rahe","Lumesadu","Lumesadu ja äike","Udu","Lörts ja äike","Lumesadu ja äike","Vihm ja äike","Rahe ja äike","Vihm ja äike","Vihm ja äike","Lörts ja äike","Vihm ja äike","Vihm ja äike","Lörts ja äik","Lörts ja äike","Lumesadu ja äike","Lumesadu ja äike","Vihm ja äike","Rahe ja äike","Rahe ja äike","Lörts","Lörts","Lumesadu","Lumesadu","Vihm","Rahe","Rahe","Lumesadu","Lumesadu"];
const videoTaustad = [
    "Meedia/Selge%20video.mp4",
    "Meedia/Pilved%20video.mp4",
    "Meedia/Vihm%20video.mp4",
    "Meedia/Lumi%20video.mp4"
];

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
      //document.getElementById('Taust').src = videoTaustad[taust];
      //document.getElementById('Taust').alt = videoTaustad[taust];
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