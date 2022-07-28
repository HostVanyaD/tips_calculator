'use strict';

const billInput = document.getElementById('bill');
const tipButtons = document.querySelectorAll('.grid-item');
const error = document.getElementById('error');
const peopleInput = document.getElementById('people');
const tipValue = document.querySelector('.tip-value');
const totalValue = document.querySelector('.total-value');
const resetBtn = document.querySelector('.btn-reset');

let billValue = 0;
let peopleNumber = 0;
let tipPercent = 0.05;

const setTipValue = (e) => {
  e.preventDefault();
  const btn = e.target;
  const siblings = btn
    .closest('.select-grid-container')
    .querySelectorAll('.grid-item');

  siblings.forEach((sib) => sib.classList.remove('btn--selected'));

  btn.classList.remove('active');

  if (e.target.innerHTML === btn.innerHTML) {
    btn.classList.add('active');
    btn.classList.add('btn--selected');
    tipPercent = parseFloat(btn.value) / 100;
  }
};

const calcTip = () => {
  if (peopleNumber > 0) {
    let totalTip = billValue * tipPercent;
    let tip = totalTip / peopleNumber;
    let total = (billValue + totalTip) / peopleNumber;

    console.log(totalTip, tip, total);

    tipValue.textContent = `\$${tip.toFixed(2)}`;
    totalValue.textContent = `\$${total.toFixed(2)}`;
  }
};

billInput.addEventListener('input', (e) => {
  e.preventDefault();
  billValue = Number(e.target.value);
});

tipButtons.forEach((btn) => {
  if (btn.classList.contains('custom-item')) {
    btn.addEventListener('input', setTipValue);
  } else {
    btn.addEventListener('click', setTipValue);
  }
});

peopleInput.addEventListener('input', (e) => {
  if (peopleInput.value <= 0) {
    error.textContent = "Can't be zero";

    setTimeout(() => {
      error.textContent = '';
    }, 2000);
  }

  peopleNumber = Number(peopleInput.value);
});

document.onchange = () => {
  calcTip();
};
