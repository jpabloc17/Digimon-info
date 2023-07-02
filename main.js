const cardSection = document.querySelector("#digimons-container");
console.log(cardSection);
fetch("https://digimon-api.com/api/v1/digimon?pageSize=20")
  .then((response) => response.json())
  .then((digimonData) => createDigimonCard(digimonData.content));

function createDigimonCard(digimons) {
  digimons.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("digimon-card");
    cardSection.appendChild(div);
  });
}
