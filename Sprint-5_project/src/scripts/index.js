import '../pages/index.css';
import { initialCards } from './cards.js';
import { enableValidation } from './validate.js';
import image1 from '../images/kusto.jpg';
import image2 from '../images/logo.svg';

const popupEditProfile = document.querySelector('.popup_type_profile');
const editProfileButton = document.querySelector('.profile__edit-buton');
const formProfileEdit = popupEditProfile.querySelector('.popup__form_type_profile');
const userName = document.querySelector('.profile-info__title');
const userJob = document.querySelector('.profile-info__intro');
const inputUserName = document.querySelector('.popup__input_type_name');
const inputUserJob = document.querySelector('.popup__input_type_job');
const popupAddPlace = document.querySelector('.popup_type_place');
const addPlaceButton = document.querySelector('.profile__add-button');
const formPlaceAdd = popupAddPlace.querySelector('.popup__form_type_place');
const inputPlaceTitle = popupAddPlace.querySelector('.popup__input_type_title');
const inputPlaceLink = popupAddPlace.querySelector('.popup__input_type_link');
const popupPreviewImage = document.querySelector('.popup_type_image');
const previewImage = document.querySelector('.popup__img');
const previewTitle = document.querySelector('.popup__name');
const closeButtons = document.querySelectorAll('.popup__button-close');
const popups = document.querySelectorAll('.popup');
const cardTemplateElement = document.querySelector('.template-card').content;
const cardList = document.querySelector('.elements');

const toggleLikeButton = (likeButton) => {
  likeButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('element__button_active');
  });
};

const attachDeleteCardListener = (deleteButton) => {
  deleteButton.addEventListener('click', (evt) => {
    evt.target.closest('.element').remove();
  });
};

const generateCard = (cardData) => {
  const cardElement = cardTemplateElement.cloneNode(true);
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__img');
  const likeButton = cardElement.querySelector('.element__button');
  const deleteButton = cardElement.querySelector('.element__basket');

  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.alt;

  attachImagePreviewListener(cardImage);
  toggleLikeButton(likeButton);
  attachDeleteCardListener(deleteButton);

  return cardElement;
};

const attachImagePreviewListener = (imageElement) => {
  imageElement.addEventListener('click', (evt) => {
    openModal(popupPreviewImage);
    previewImage.src = imageElement.src;
    previewImage.alt = imageElement.alt;
    previewTitle.textContent = evt.target.closest('.element').textContent;
  });
};

initialCards.forEach((cardData) => {
  cardList.append(generateCard(cardData));
});

const openModal = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKey);
};

const closeModal = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKey);
};

const handleEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    popups.forEach((popup) => {
      closeModal(popup);
    });
  }
};

editProfileButton.addEventListener('click', () => {
  openModal(popupEditProfile);
  inputUserName.value = userName.textContent;
  inputUserJob.value = userJob.textContent;
});

formProfileEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  userJob.textContent = inputUserJob.value;
  closeModal(popupEditProfile);
});

closeButtons.forEach((button) => {
  button.addEventListener('click', (evt) => {
    const closestPopup = findClosestPopup(evt);
    closeModal(closestPopup);
  });
});

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      const closestPopup = findClosestPopup(evt);
      closeModal(closestPopup);
    }
  });
});

addPlaceButton.addEventListener('click', () => {
  openModal(popupAddPlace);
  inputPlaceTitle.value = '';
  inputPlaceLink.value = '';
});

formPlaceAdd.addEventListener('submit', (evt) => {
  evt.preventDefault();

  addNewCard({
    name: inputPlaceTitle.value,
    link: inputPlaceLink.value,
  });

  evt.target.reset();
  closeModal(popupAddPlace);
});

const addNewCard = (card) => {
  cardList.prepend(generateCard(card));
};

const findClosestPopup = (evt) => {
  return evt.target.closest('.popup');
};

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

enableValidation(validationSettings);
