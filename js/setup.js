'use strict';

var firstName = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var secondName = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var coatColor = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var eyesColor = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var fireballColor = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var popupInputFocused = false;
var popupInput = setup.querySelector('.setup-user-name');

var wizardCoat = setup.querySelector('.wizard-coat');
var wizardCoatInput = document.getElementsByName('coat-color');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardEyesInput = document.getElementsByName('eyes-color');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardFireballInput = document.getElementsByName('fireball-color');
var startCount = 0;

var similarListElement = setup.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizardsAmount = 4;
var wizardsArray = [];

var getRandom = function (arr) {
  var randomItem = arr[Math.floor(Math.random() * arr.length)];
  return randomItem;
};

for (var i = 1; i <= wizardsAmount; i++) {
  wizardsArray.push({
    name: getRandom(firstName) + ' ' + getRandom(secondName),
    coatColor: getRandom(coatColor),
    eyesColor: getRandom(eyesColor)
  });
}

var renderWizards = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizardsArray.length; i++) {
  fragment.appendChild(renderWizards(wizardsArray[i]));
}
similarListElement.appendChild(fragment);

setup.querySelector('.setup-similar').classList.remove('hidden');

// Оживление UI

// Закрытие окна .setup по нажатию клавиши Esc
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !popupInputFocused) {
    closePopup();
  }
};
var setPopupInputListeners = function () {
  popupInput.addEventListener('focus', function () {
    popupInputFocused = true;
  });
  popupInput.addEventListener('blur', function () {
    popupInputFocused = false;
  });
};
setPopupInputListeners();

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Открытие окна .setup
setupOpen.addEventListener('click', function () {
  openPopup();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// Закрытие окна .setup
setupClose.addEventListener('click', function () {
  closePopup();
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// Изменения цветов волшебника по клику
wizardCoat.addEventListener('click', function () {
  if (startCount < coatColor.length - 1) {
    startCount++;
  } else {
    startCount = 0;
  }
  wizardCoat.style.fill = coatColor[startCount];
  wizardCoatInput[0].value = coatColor[startCount];
});

wizardEyes.addEventListener('click', function () {
  if (startCount < eyesColor.length - 1) {
    startCount++;
  } else {
    startCount = 0;
  }
  wizardEyes.style.fill = eyesColor[startCount];
  wizardEyesInput[0].value = eyesColor[startCount];
});

wizardFireball.addEventListener('click', function () {
  if (startCount < fireballColor.length - 1) {
    startCount++;
  } else {
    startCount = 0;
  }
  wizardFireball.style.backgroundColor = fireballColor[startCount];
  wizardFireballInput[0].value = fireballColor[startCount];
});
