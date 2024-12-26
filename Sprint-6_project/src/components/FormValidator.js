export class FormValidator {
  constructor(validationSettings, form) {
    this._popupInput = validationSettings.inputSelector;
    this._popupSubmit = validationSettings.submitButtonSelector;
    this._popupSubmitDisabled = validationSettings.inactiveButtonClass;
    this._popupInputTypeError = validationSettings.inputErrorClass;
    this._popupErrorVisible = validationSettings.errorClass;
    this._formToValidate = form;
    this._submitButton = this._formToValidate.querySelector(this._popupSubmit);
    this._inputArray = this._formToValidate.querySelectorAll(this._popupInput);
  }

  _showInputError(input, message) {

    const error = this._formToValidate.querySelector(`#${input.id}-error`);

    error.textContent = message;

    input.classList.add(this._popupInputTypeError);
    error.classList.add(this._popupErrorVisible);
  }

  _hideInputError(input) {
    const error = this._formToValidate.querySelector(`#${input.id}-error`);
    error.textContent = "";
    input.classList.remove(this._popupInputTypeError);
    error.classList.remove(this._popupErrorVisible);
  }

  _validateInput(input) {
    !input.validity.valid ? this._showInputError(input, input.validationMessage) : this._hideInputError(input);
  }

  switchSubmitButton() {
    if (Array.from(this._inputArray).filter(input => !input.validity.valid).length === 0) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._popupSubmitDisabled);
    } else {
      this._submitButton.disabled = true;
      this._submitButton.classList.add(this._popupSubmitDisabled);
    }
  }

  validateInputs() {
    this._inputArray.forEach((input) => {
      this._validateInput(input);
      this._hideInputError(input);
    });
  }

  _setInputEvtListeners() {
    this._formToValidate.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._inputArray.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);

        this.switchSubmitButton();
      });
    });
  }

  enableValidation() {
    this._setInputEvtListeners(this._formToValidate);
  }
}