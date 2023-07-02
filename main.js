fetch("https://digimon-api.com/api/v1/digimon?pageSize=20")
  .then((response) => response.json())
  .then((data) => createDigimonCard(data));

function createDigimonCard(data) {
  console.log(data);
}
