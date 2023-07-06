const cardSection = document.querySelector("#digimons-container");
const form = document.querySelector("#characters-form");

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
    .then((digimon) => createNewCards(digimon));
}

function createNewCards(digimon) {
  cardSection.replaceChildren();
  const { name, images, levels, attributes, types, fields, descriptions } =
    digimon;
  const div = document.createElement("div");
  div.classList.add("digimon-card-2");
  // Name
  const names = document.createElement("h2");
  names.textContent = name;

  // Image
  const img = document.createElement("img");
  img.src = images[0].href;
  img.alt = `${name} picture`;

  //  div-info-container
  const divInfo = document.createElement("div");
  divInfo.classList.add("info-details-container");

  // level
  const level = levelContainerInfo(levels);

  //  Attribute
  const attribute = attributeInfoContainer(attributes);

  // Type
  const type = typeInfoContainer(types);

  // Fields
  const field = fieldInfoContainer(fields);

  divInfo.append(level, attribute, type, field);

  //  Description
  const descriptionContainer = document.createElement("div");
  const descriptionTitle = document.createElement("h2");
  descriptionTitle.textContent = "Description";
  const description = document.createElement("p");
  description.textContent = filterDescription(descriptions);
  descriptionContainer.append(descriptionTitle, description);

  // back to main button
  const btn = document.createElement("button");
  btn.textContent = "X";

  btn.addEventListener("click", (e) => {
    backBtn();
  });
  div.append(names, img, divInfo, descriptionContainer, btn);
  cardSection.append(div);
}

//  Filter Functions
function levelContainerInfo(levels) {
  const levelContainer = document.createElement("div");
  levelContainer.classList.add("info-container");
  const h3 = document.createElement("h3");
  h3.textContent = "Level";
  const level = document.createElement("ul");
  levelContainer.append(h3, level);
  if (levels.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No more info";
    level.append(li);
    return levelContainer;
  } else {
    levels.forEach((element) => {
      const li = document.createElement("li");
      li.textContent = element.level;
      level.append(li);
    });
    return levelContainer;
  }
}

function attributeInfoContainer(attributes) {
  const attributesContainer = document.createElement("div");
  attributesContainer.classList.add("info-container");
  const h3 = document.createElement("h3");
  h3.textContent = "Attribute";
  const attribute = document.createElement("ul");
  attributesContainer.append(h3, attribute);
  if (attributes.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No more info";
    attribute.append(li);
    return attributesContainer;
  } else {
    attributes.forEach((element) => {
      const li = document.createElement("li");
      li.textContent = element.attribute;
      attribute.appendChild(li);
    });
    return attributesContainer;
  }
}

function typeInfoContainer(types) {
  const typeContainer = document.createElement("div");
  typeContainer.classList.add("info-container");
  const h3 = document.createElement("h3");
  h3.textContent = "Type";
  const type = document.createElement("ul");
  typeContainer.append(h3, type);
  if (types.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No more info";
    type.append(li);
    return typeContainer;
  } else {
    types.forEach((element) => {
      const li = document.createElement("li");
      li.textContent = element.type;
      type.append(li);
    });
    return typeContainer;
  }
}

function fieldInfoContainer(fields) {
  const fieldContainer = document.createElement("div");
  fieldContainer.classList.add("info-container");
  const h3 = document.createElement("h3");
  h3.textContent = "Field";
  const field = document.createElement("ul");
  fieldContainer.append(h3, field);
  if (fields.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No more info";
    field.append(li);
    return fieldContainer;
  } else {
    fields.forEach((element) => {
      const li = document.createElement("li");
      li.textContent = element.field;
      field.append(li);
    });
    return fieldContainer;
  }
}

function filterDescription(descriptionArr) {
  for (let index = 0; index < descriptionArr.length; index++) {
    if (descriptionArr[index].language === "en_us") {
      return descriptionArr[index].description;
    }
  }
  return "no description";
}

//  Back callback Function
function backBtn() {
  cardSection.replaceChildren();
  fetch("https://digimon-api.com/api/v1/digimon?pageSize=20")
    .then((response) => response.json())
    .then((digimons) => createDigimonCard(digimons.content));
  form.style.display = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  cardSection.replaceChildren();
  const characterName = e.target[0].value;
  fetch(`https://digimon-api.com/api/v1/digimon/${characterName}`)
    .then((response) => response.json())
    .then((digimon) => createNewCards(digimon))
    .catch((error) => {
      form.style.display = "none";
      errorForm();
    });
  form.reset();
});

function errorForm() {
  const div = document.createElement("div");
  div.classList.add("error-container");
  const errorMessage = document.createElement("h3");
  errorMessage.textContent = "Digimon no found!";
  const btn = document.createElement("button");
  btn.textContent = "Back";
  btn.addEventListener("click", backBtn);
  div.append(errorMessage, btn);
  cardSection.append(div);
}
