/*
PRAVIDLA HRY:

- Hra má dva hráče, kteří se střídají každé kolo
- V každém kole hází hráč kostkou kolikrát chce. Hodnota každého hodu se přičítá k jeho bodům v daném kole.
- Pokud na kostce padne 1, ztrácí všechny body v daném kole a na řadu se dostává hráč dvě.
- Hráč může zvolit "dost", což znamená, že všechny body nahrané v jeho kole se přičtou k jeho celkovým bodům. Poté je na řadě druhý hráč.
- Hra končí jakmile jeden z hráčů dosáhne dopředu určeného počtu bodů (typicky 30 bodů).

*/

let body;
let bodyVKole;
let aktivniHrac;
let kostka;
let koncoveBody;

init();

document.querySelector('.kostka').style.display  = 'none';
//document.querySelector('#soucasne-' + aktivniHrac).textContent = kostka;

document.querySelector('.tlacitko-hod').addEventListener('click',hazeni);
document.querySelector('.tlacitko-dost').addEventListener('click',function(){
  // Přidat současné body k celkovým bodům hráčelse
  body[aktivniHrac] += bodyVKole;
  //Aktualizovat uživatelské prostředí
  document.querySelector('#body-' + aktivniHrac).textContent = body[aktivniHrac];
  //Zkontrolovat, zda hráč již vyhrálegal
  if (body[aktivniHrac]>= koncoveBody) {
    document.querySelector('#jmeno-' + aktivniHrac).textContent = 'Vítěz';
    document.querySelector('.hrac-' + aktivniHrac + '-panel').classList.remove('aktivni');
    document.querySelector('.hrac-' + aktivniHrac + '-panel').classList.add('vitez');
    document.querySelector('.kostka').style.display='none';
    bodyVKole = 0;
    document.querySelector('.tlacitko-hod').removeEventListener('click',hazeni);

    document.querySelector('#soucasne-' + aktivniHrac).textContent=bodyVKole;
  } else {
    dalsiHrac();
  }
  // Přepnout hráče
});

document.querySelector('.tlacitko-novy').addEventListener('click', init);

// Start Definování funkcí------------------------------------------------------

function init(){
body = [0,0];
aktivniHrac = 0;
bodyVKole = 0;
koncoveBody = 30;
document.querySelector('.kostka').style.display  = 'none';
document.getElementById('body-0').textContent = '0';
document.getElementById('body-1').textContent = '0';
document.getElementById('soucasne-0').textContent = '0';
document.getElementById('soucasne-1').textContent = '0';
document.querySelector('#jmeno-0').textContent = 'Hráč-1';
document.querySelector('#jmeno-1').textContent = 'Hráč-2';
document.querySelector('.hrac-0-panel').classList.remove('aktivni');
document.querySelector('.hrac-0-panel').classList.remove('vitez');
document.querySelector('.hrac-1-panel').classList.remove('aktivni');
document.querySelector('.hrac-1-panel').classList.remove('vitez');
document.querySelector('.hrac-0-panel').classList.add('aktivni');
document.querySelector('.tlacitko-hod').addEventListener('click',hazeni);
};

function dalsiHrac() {
  aktivniHrac === 0 ? aktivniHrac = 1 : aktivniHrac = 0;
  bodyVKole = 0;
  document.getElementById('soucasne-0').textContent = '0';
  document.getElementById('soucasne-1').textContent = '0';

  document.querySelector('.hrac-0-panel').classList.toggle('aktivni');
  document.querySelector('.hrac-1-panel').classList.toggle('aktivni');
};

function hazeni() {
  //1. Náhodné číslo
  kostka = Math.floor(Math.random()*6)+1;
  //2.zobrazit v naší hřelse
  let kostkaDOM = document.querySelector('.kostka');
  kostkaDOM.style.display = 'block';
  kostkaDOM.textContent = kostka;
  //3. Aktualizovat body kola pokud padla/nepadla 1
  if (kostka !== 1) {
    // Přičti body
    bodyVKole += kostka;
    document.querySelector('#soucasne-' + aktivniHrac).textContent = bodyVKole;
  } else {
    // Přepni hráče
    //if (aktivniHrac === 0) {
    //  aktivniHrac = 1
    //} else {
    //  aktivniHrac = 0
    //}
    dalsiHrac();
  }
};
// Konec Definování funkcí------------------------------------------------------
