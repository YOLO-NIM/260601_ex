console.log("script 확인");

// DOM
const form = document.querySelector("#searchForm");
const result = document.querySelector("#searchResult");

// Event
form.addEventListener("submit", searchFormHandler);

// Event Handler
async function searchFormHandler(event) {
  event.preventDefault();
  console.log("searchFormHandler 확인");
  const search = getFormData(event).get("search");
  console.log("search", search);
  const pokeData = await getPokeData(search);
  console.log("pokeData", pokeData);
  drawPoke(pokeData);
}

function drawPoke(data) {
  console.log("drawPoke");
  console.log("result", result);
  result.innerHTML = `
  <div style = "text-align:center">
    <img src="${data.sprites.front_default}">
    <h4>${data.korName}</h4>
    <p>도감번호 : ${data.id}</p>
    <p>영문명 : ${data.name}</p>
    <audio src="${data.cries.latest}" controls></audio>
  </div>`;
}

function getFormData(event) {
  const formData = new FormData(event.target);
  console.log("formData", ...formData);
  return formData;
}

// 데이터 조회
// https://pokeapi.co/
// GET https://pokeapi.co/api/v2/pokemon/{id or name}/
// form을 통해서 '번호'나 '영어이름' -> API로 호출

async function getPokeData(search) {
  console.log("getPokeData 확인");
  const apiURL = `https://pokeapi.co/api/v2/pokemon/${search}`;
  console.log("apiURL", apiURL);

  // fetch/axios
  const response = await axios.get(apiURL);
  console.log("response", response);
  const data = response.data;
  console.log("data", data);

  const response2 = await axios.get(data.species.url);
  console.log("response2", response2);
  const korName = response2.data.names.find(
    (item) => item.language.name === "ko",
  ).name;
  console.log("korName", korName);
  data.korName = korName;
  return data;
}
