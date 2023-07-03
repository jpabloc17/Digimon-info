const cardSection = document.querySelector("#digimons-container");
console.log(cardSection);
fetch("https://digimon-api.com/api/v1/digimon?pageSize=20")
  .then((response) => response.json())
  .then((digimonData) => createDigimonCard(digimonData.content));

function createDigimonCard(digimons) {
  digimons.forEach((digimon) => {
    const div = document.createElement("div");
    div.classList.add("digimon-card");
    const digimonId = document.createElement("span");
    digimonId.textContent = `#${digimon.id}`;
    const name = document.createElement("h3");
    name.textContent = digimon.name;
    const img = document.createElement("img");
    img.src = digimon.image;
    img.alt = `${digimon.name} Picture`;
    const moreInfo = document.createElement("button");
    moreInfo.textContent = "More Info";
    moreInfo.addEventListener("click", (e) => {
      showMoreInfo(digimon.name);
    });
    div.append(digimonId, name, img, moreInfo);
    cardSection.appendChild(div);
  });
}

function showMoreInfo(digimon) {
  fetch(`https://digimon-api.com/api/v1/digimon/${digimon}`)
    .then((response) => response.json())
    .then((digimon) => createNewCards(digimon))
    .catch((error) => console.log(error));
}

function createNewCards(digimon) {
  cardSection.replaceChildren();
  console.log(digimon);
  const { id, name, images } = digimon;
  const div = document.createElement("div");
  div.classList.add("digimon-card-2");
  // Id
  const digimonId = document.createElement("span");
  digimonId.textContent = `#${id}`;
  // Name
  const names = document.createElement("h3");
  names.textContent = name;

  // Image
  const img = document.createElement("img");
  img.src = images[0].href;
  img.alt = `${name} picture`;

  div.append(digimonId, names, img);
  cardSection.append(div);
  console.log(div);
}
