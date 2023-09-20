"use strict";



// form variables
const setsayi = document.querySelector('#setsayi');
const tekrar = document.querySelector('#tekrar');
const mola = document.querySelector('#mola');

const antrenman_tur = document.querySelector('#antrenman-tur');
const hareket_tur = document.querySelector('#hareket-tur');

const gun_secimi = document.querySelector('#gunsec');
const gonderbuton = document.querySelector('#gonder');


let benchpress = document.querySelector('#benchpress');
let squat = document.querySelector('#squat');
let deadlift = document.querySelector('#deadlift');
let barbellcurl = document.querySelector('#barbellcurl');
let barbellrow = document.querySelector('#barbellrow');
let neckpress = document.querySelector('#neckpress');








// list group variables

const daybaslik = document.querySelector('#day--baslik');
const daytarih = document.querySelector('#day--tarih');
const days = document.querySelector('#days');
const antrenman_list = document.querySelector('.antrenmanlar');
const gunismi = document.querySelector('#gunismi');

// app control and ... variables
let day;
let html;
let html2;
let antrenmanici;
let d = new Date();
let gunler = [];
let id;
let x;
let gunkontrol;
let sonuc;

const imgbox = document.querySelector('.resimbox');
const img = document.querySelector('.hareketresmi');




gonderbuton.addEventListener('click', function () {
    id = Math.floor(Math.random() * 10000);


    if (gunler.length > 0) {

        x = false;

        // gün karşılaştırması girilen gün mevcut mu diye arama yapılıyor.
        sonuc = gunler.findIndex(gun => gun.day === gun_secimi.value);
        if (sonuc >= 0) {
            x = false;
            gunkontrol = true;
        } else {
            x = true;
            gunkontrol = false;
        }


        if (gunkontrol) {
            gunler[sonuc].hareketler.push({ mola: mola.value, tekrar: tekrar.value, tur: antrenman_tur.value, hareket: hareket_tur.value, set: setsayi.value })
            kontrol(gunler[sonuc].id)



        }


        if (x) {
            x = false;
            go(id);
        }

    } else {
        go(id);

    }

});



antrenman_tur.addEventListener('change', function () {
    degisiklik(antrenman_tur.value, hareket_tur)
});

hareket_tur.addEventListener('change', function () {
    resimgoster(hareket_tur.value);
});


function resimgoster(hareketverisi) {
    if (hareketverisi === 'benchpress') {
        imgbox.classList.remove('disable');
        img.src = 'img/benchpress.jpg';
    } else if (hareketverisi === 'squat') {
        imgbox.classList.remove('disable');
        img.src = 'img/squat.jpg';
    } else if (hareketverisi === 'deadlift') {
        imgbox.classList.remove('disable');
        img.src = 'img/deadlift.jpg';
    } else if (hareketverisi === 'barbellcurl') {
        imgbox.classList.remove('disable');
        img.src = 'img/barbellcurl.jpg';
    } else if (hareketverisi === 'barbellrow') {
        imgbox.classList.remove('disable');
        img.src = 'img/barbellrow.jpg';
    } else if (hareketverisi === 'neckpress') {
        imgbox.classList.remove('disable');
        img.src = 'img/neckpress.jpg';
    } else {
        imgbox.classList.add('disable');
    }
}

function degisiklik(veri, hareketverisi) {
    if (veri === 'bacak') {
        benchpress.classList.add('disable');
        barbellcurl.classList.add('disable');
        neckpress.classList.add('disable');
        deadlift.classList.add('disable');
        barbellrow.classList.add('disable');
        squat.classList.remove('disable');
        hareketverisi.value = 'bos';
        imgbox.classList.add('disable');
    } else if (veri === 'sirt') {
        squat.classList.add('disable');
        benchpress.classList.add('disable');
        barbellcurl.classList.add('disable');
        neckpress.classList.add('disable');
        deadlift.classList.remove('disable');
        barbellrow.classList.remove('disable');
        hareketverisi.value = 'bos';
        imgbox.classList.add('disable');

    } else if (veri === 'omuz') {
        squat.classList.add('disable');
        benchpress.classList.add('disable');
        barbellcurl.classList.add('disable');
        neckpress.classList.remove('disable');
        deadlift.classList.add('disable');
        barbellrow.classList.add('disable');
        hareketverisi.value = 'bos';
        imgbox.classList.add('disable');

    } else if (veri === 'gogus') {
        squat.classList.add('disable');
        benchpress.classList.add('disable');
        neckpress.classList.add('disable');
        deadlift.classList.add('disable');
        barbellrow.classList.add('disable');
        benchpress.classList.remove('disable');
        hareketverisi.value = 'bos';
        imgbox.classList.add('disable');



    } else if (veri === 'kol') {
        squat.classList.add('disable');
        benchpress.classList.add('disable');
        neckpress.classList.add('disable');
        deadlift.classList.add('disable');
        barbellrow.classList.add('disable');
        barbellcurl.classList.remove('disable');
        hareketverisi.value = 'bos';
        imgbox.classList.add('disable');
    };


}

function go(id) {
    let yedekid = id;
    if (mola.value != '' && setsayi.value != '' && tekrar.value != '' && gun_secimi.value != '' && hareket_tur.value != 'bos' && antrenman_tur.value != 'bos') {

        if (id == yedekid) {
            id = Math.floor(Math.random() * 10000);
        }

        html = `
                <div class="day" id="${id}" onclick="kontrol(${id})">
                <div class="day__baslik">
                    <h1 id="day--baslik">${gun_secimi.value}</h1>
                    <span id="day--tarih">${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}</span>
                </div>
            </div>
                `;

        gunler.push({ id: id, day: gun_secimi.value, date: d.getDate(), hareketler: [{ mola: mola.value, tekrar: tekrar.value, tur: antrenman_tur.value, hareket: hareket_tur.value, set: setsayi.value }] })

        days.insertAdjacentHTML("beforeend", html);


        // mola.value = '';
        // setsayi.value = '';
        // tekrar.value = '';
        // antrenman_tur.value = '';
        // hareket_tur.value = '';
        // gun_secimi.value = '';
    }
    else {
        alert('Boş Alanları Doldurunuz!!');
    }
}

function kontrol(id) {
    for (let i of gunler) {
        if (i.id == id) {
            antrenman_list.innerHTML = '';
            for (let j = 0; j < i.hareketler.length; j++) {

                html2 = `
                     <div class="antrenman">
                     <span class="antrenmanici">Set Sayısı <p>${i.hareketler[j].set}</p></span>
                     <span class="antrenmanici">Tekrar <p>${i.hareketler[j].tekrar}</p></span>
                     <span class="antrenmanici">Set arası Mola(DK) <p>${i.hareketler[j].mola}</p></span>
                     <span class="antrenmanici">Hareket Türü <p>${i.hareketler[j].hareket}</p></span>
                     <span class="antrenmanici">Antrenman Faydası <p>${i.hareketler[j].tur}</p></span>
                 </div>
                     `;
                gunismi.classList.remove('disable');
                gunismi.innerHTML = i.day;
                antrenman_list.insertAdjacentHTML('beforeend', html2);
            }


        }
    }


}

