// @todo: Темплейт карточки
const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// Profile information
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Forms
const formEditProfile = document.forms["edit-profile"];
formEditProfile.addEventListener("submit", submitProfileEdit);

const formAddCard = document.forms["new-place"];
formAddCard.addEventListener("submit", submitAddCard);

function submitProfileEdit(evt) { // handler
    evt.preventDefault();
    profileTitle.textContent = formEditProfile.elements.name.value;
    profileDescription.textContent = formEditProfile.elements.description.value;
    togglePopup(profilePopup);
}

function submitAddCard(evt) { // handler
    evt.preventDefault();
    const name = formAddCard.elements.placename.value;
    const link = formAddCard.elements.link.value;
    const newCard = createCard({ name : name, link : link });
    cardsContainer.prepend(newCard);
    togglePopup(cardPopup);
}

// Buttons
const editProfileButton = document.querySelector(".profile__edit-button");
editProfileButton.addEventListener('click', openEditProfile);

function openEditProfile(evt) { // handler
    formEditProfile.elements.name.value = profileTitle.textContent;
    formEditProfile.elements.description.value = profileDescription.textContent;
    togglePopup(profilePopup);
}

const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener('click', openAddCard);

function openAddCard(evt) { // handler
    formAddCard.reset();
    togglePopup(cardPopup);
}

const closePopup = document.querySelectorAll(".popup__close");
closePopup.forEach(function (closeCross) {
    closeCross.addEventListener('click', function () {
        const popup = closeCross.closest('.popup');
        togglePopup(popup);
    });
});


// @todo: Функция создания карточки
function createCard(cardData) {
    const card = cardTemplate.querySelector(".places__item").cloneNode(true);
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");
    const likeButton = card.querySelector(".card__like-button");
    const deleteButton = card.querySelector(".card__delete-button");

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    return card;
}



// @todo: Функция удаления карточки
function removeCard() {

}

function togglePopup(popup) {
    popup.classList.toggle("popup_is-opened");
}

initialCards.forEach(function(item){
    cardsContainer.append(createCard(item));
});


// @todo: Вывести карточки на страницу



