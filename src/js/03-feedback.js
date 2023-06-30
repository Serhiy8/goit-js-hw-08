import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  input: document.querySelector('.feedback-form input'),
  textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

let formData = {};

populateForm();

function onFormInput(evt) {
  const key = evt.target.name;
  const value = evt.target.value;
  formData[key] = value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (refs.input.value === '' || refs.textarea.value === '') {
    alert('У вас не заповнені всі поля');
    return;
  }
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
  formData = {};
}

function populateForm() {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedData) {
    if (savedData.email) {
      refs.input.value = savedData.email;
      formData.email = savedData.email;
    }
    if (savedData.message) {
      refs.textarea.value = savedData.message;
      formData.message = savedData.message;
    }
  }
}
