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
    div.append(digimonId, name, img);
    cardSection.appendChild(div);
  });
}
