//시계
const clock = document.querySelector(".clock");
//로그인
const loginForm = document.querySelector("#login-form");
const userName = document.querySelector("#userName");
const beLogin = document.querySelector(".beLogin");
const afLogin = document.querySelector(".afLogin");
const user = document.querySelector("#user");
const HIDDEN_CLASSNAME = "hidden";
//랜덤 배경 이미지
const colors = [
    "#F2EEE5",
    "#E5C1C5",
    "#C3E2DD",
    "#6ECEDA",
    "#FEF5D4",
    "#FFD6AA",
    "#EFBAD6",
    "#DADAFC",
    "#BFC8D7",
    "#E2D2D2",
    "#E3E2B4",
    "#A2B59F",
    "#EDEEF0",
    "#EDE1E3",
    "#D1DFE8",
    "#909FA6"
];
const body = document.querySelector("body");

//로그인
function login(event){
    event.preventDefault();
    beLogin.classList.add(HIDDEN_CLASSNAME);
    localStorage.setItem("userName", userName.value);
    user.innerText = `${userName.value}`;
    afLogin.classList.remove(HIDDEN_CLASSNAME);
}

const savedUserName = localStorage.getItem("userName");
loginForm.addEventListener("submit", login);

if(savedUserName === null){
    beLogin.classList.remove(HIDDEN_CLASSNAME); 
    loginForm.addEventListener("submit", login);
}else{
    afLogin.classList.remove(HIDDEN_CLASSNAME);
}

//날씨와 위치
const API_KEY = "2b794a50865c2f68837eb729e0a01dcb";
const weather = document.querySelector(".weather span:first-child");
const city = document.querySelector(".weather span:last-child");

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
      city.innerText = data.name;
      weather.innerText = `${data.weather[0].main}`;
    });
}

function onGeoError(){
    alert("현재 위치 확인 불가, 다시 확인해주세요.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

//랜덤 배경 이미지
function randomColor(){
    const color1 = Math.floor(Math.random() * colors.length);
    const color2 = Math.floor(Math.random() * colors.length);

    body.style.background = `linear-gradient(to left, ${colors[color1]}, ${colors[color2]}) 70.71%`;
}

randomColor();
setInterval(randomColor, 5000);

//투두
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

let toDos = [];

function saveToDos() {
  localStorage.setItem("todos", JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
  }

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "❌";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem("todos");

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

function realClock(){
    const time = new Date();
    clock.innerText = `${String(time.getHours()).padStart("2",0)} : ${String(time.getMinutes()).padStart("2",0)}`;
}
realClock();
setInterval(realClock, 1000);