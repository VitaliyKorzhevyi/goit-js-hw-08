import throttle from 'lodash.throttle';

let obj ={
    email: "",
    message: "",
};
const STORAGE_KEY = "feedback-form-state";
const mainFormEl = document.querySelector(".feedback-form");

// 1.Створити функцію для зберігання данних
function saveKey(e) {
    obj[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
};

// 2.Створити функцію для виклику данних зі сховища
const load = key => {
    try { 
        const readingData = localStorage.getItem(key); 
        return readingData === null? undefined : JSON.parse(readingData) 
    } catch (error) {
        console.error(error.message);
    }
};

// 3. Очищення форми та сховища
function remove(e) {
    e.preventDefault();
    console.log(obj)  //вивід введених данних консоль при відправці
    mainFormEl.reset();
    localStorage.removeItem(STORAGE_KEY); 
    for (const key in obj) {obj.key='';} // очищаєм обєкт
}

// 4. Запис данних зі сховища у форми
function getDataFromStorage(){
    if(localStorage.getItem(STORAGE_KEY)!==null){  // якщо у сховищі є цей ключ, то
      obj = load(STORAGE_KEY);   // у обєкт записується ті данні які ввели раніше
      for (const key in obj) {
          mainFormEl.elements[key].value=obj[key]; // у форму записуються данні з обєкту
    }
  }}

getDataFromStorage();

mainFormEl.addEventListener('submit', remove);
mainFormEl.addEventListener('input', throttle(saveKey),500);