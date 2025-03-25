const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
  };

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "Val"
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
    alt: "Restaurant"
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
    alt: "Cafe"
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
    alt: "Bridge"
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
    alt: "Tunnel"
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
    alt: "House"
  },
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
    alt: "Golden Gate Bridge",
  }
];

// Profile elements
const profileEditButton = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Form elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["edit-profile"];
const editModalCloseButton = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector("#profile-description-input");

// Card Elements
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardSubmitBtn = cardModal.querySelector(".modal__submit-btn")
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

//Select the modal
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const closeModalBtn = document.querySelector(".modal__close-btn_preview");

// Card related elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");
const cardElement = cardTemplate.content;

function handleAddCardSubmit(item, method = "prepend") {
  const cardEl = getCardElement(item);
  cardsList[ method ](cardEl);
  disableButton(cardSubmitBtn, settings);
  closeModal(cardModal);
  setTimeout(() => {
    cardForm.reset();
  }, 100);
}

function getCardElement(data) {
  const element = cardElement.querySelector(".card").cloneNode(true);
  const cardNameEl = element.querySelector(".card__title");
  const cardImageEl = element.querySelector(".card__image");

  const cardLikeBtn = element.querySelector(".card__like-btn");

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  const cardDeleteBtn = element.querySelector(".card__delete-btn");
  cardDeleteBtn.addEventListener("click", () => {
    element.remove();
  });

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.alt;

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.alt;
    previewModalCaptionEl.textContent = data.name;
  });

  return element;
}

function fillProfileForm() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalOnEscape); // add
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalOnEscape); // remove
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

function closeModalOnOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
      closeModal(evt.target);
  }
 }

 const allModals = document.querySelectorAll(".modal")

 allModals.forEach((modal) => {
  modal.addEventListener("click", closeModalOnOverlayClick);
});

function closeModalOnEscape(evt) {
  if (evt.key === 'Escape') {
      const openModal = document.querySelector('.modal_opened');
      if (openModal) {
          closeModal(openModal);
      }
  }
}

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  openModal(editModal);
});

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

const closeButtons = document.querySelectorAll('.modal__close-btn');
closeButtons.forEach((button) => {
  const modal = button.closest('.modal');
  button.addEventListener('click', () => closeModal(modal));
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", function(evt) {
  const item = { name: cardNameInput.value, link: cardLinkInput.value };
  handleAddCardSubmit(item);
  evt.preventDefault();
  evt.target.reset();
}); 

initialCards.forEach((item, i, arr) => {
  const card = getCardElement(item);
  cardsList.prepend(card);
});

enableValidation(settings);