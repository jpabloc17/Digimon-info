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
  const { id, name, images, levels, attributes, types, fields } = digimon;
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

  div.append(digimonId, names, img, divInfo);
  cardSection.append(div);
  console.log(div);
}

function levelContainerInfo(levels) {
  const levelContainer = document.createElement("div");
  levelContainer.classList.add("info-container");
  const h4 = document.createElement("h4");
  h4.textContent = "Level";
  const level = document.createElement("ul");
  levelContainer.append(h4, level);
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
  const h4 = document.createElement("h4");
  h4.textContent = "Attribute";
  const attribute = document.createElement("ul");
  attributesContainer.append(h4, attribute);
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
  const h4 = document.createElement("h4");
  h4.textContent = "Type";
  const type = document.createElement("ul");
  typeContainer.append(h4, type);
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
  const h4 = document.createElement("h4");
  h4.textContent = "Field";
  const field = document.createElement("ul");
  fieldContainer.append(h4, field);
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
