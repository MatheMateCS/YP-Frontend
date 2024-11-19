// @todo: Темплейт карточки
const cardsContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template");

// @todo: DOM узлы
const profilePopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");

// Profile information
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Forms
const formProfile = document.forms["edit-profile"];
formProfile.addEventListener("submit", submitProfileEdit);

function submitProfileEdit(evt) { // handler
    evt.preventDefault();
    profileTitle.textContent = formProfile.elements.name.value;
    profileDescription.textContent = formProfile.elements.description.value;
    togglePopup(profilePopup);
}

// Buttons
const profileButton = document.querySelector(".profile__edit-button");
profileButton.addEventListener('click', editProfile);

const closePopup = profilePopup.querySelectorAll(".popup__close");
closePopup.forEach(function (popup) {
    popup.addEventListener('click', function () {
        const pop = popup.closest('.popup');
        togglePopup(pop);
    });
});


// @todo: Функция создания карточки
function createCard(cardData) {
    const card = document.querySelector(".places__item").cloneNode(true);
    const cardTitle = card.querySelector(".card__title");
    const cardImage = card.querySelector(".card__image");
    const likeButton = card.querySelector(".card__like-button");
    const deleteButton = card.querySelector(".card__delete-button");

    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    return card
}


// @todo: Функция удаления карточки
function removeCard() {

}

function togglePopup(popup) {
    popup.classList.toggle("popup_is-opened");
}

function editProfile(popup) { // handler
    formProfile.elements.name.value = profileTitle.textContent;
    formProfile.elements.description.value = profileDescription.textContent;
    togglePopup(profilePopup);
}



// @todo: Вывести карточки на страницу



