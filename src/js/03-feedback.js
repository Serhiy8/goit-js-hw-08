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
  const { name, value } = evt.target;
  formData[name] = value;
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
  const { email, message } = savedData;
  if (savedData) {
    if (email) {
      refs.input.value = email;
      formData.email = email;
    }
    if (message) {
      refs.textarea.value = message;
      formData.message = message;
    }
  }
}
