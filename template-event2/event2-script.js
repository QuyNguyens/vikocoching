function renderPage(containerSelector, data) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = `
    <div class="left-container"></div>
    <div class="right-container"></div>
  `;

  const left = container.querySelector(".left-container");
  const right = container.querySelector(".right-container");

  // === LEFT ===
  // Title & desc
  const title = document.createElement("h1");
  title.textContent = data.left.title;
  left.appendChild(title);

  const desc = document.createElement("p");
  desc.classList.add("left-container-text");
  desc.textContent = data.left.description;
  left.appendChild(desc);

  // Info
  const infoBox = document.createElement("div");
  infoBox.classList.add("info-container");
  data.left.info.forEach((item) => {
    const row = document.createElement("div");
    row.classList.add("info-item");

    const iconWrapper = document.createElement("span");
    fetch(item.icon)
      .then((res) => res.text())
      .then((svg) => {
        iconWrapper.innerHTML = svg;
      });

    const text = document.createElement("span");
    text.textContent = item.text;

    row.appendChild(iconWrapper);
    row.appendChild(text);
    infoBox.appendChild(row);
  });
  left.appendChild(infoBox);

  // Rating
  const ratingBox = document.createElement("div");
  ratingBox.classList.add("info-rating");

  const ratingIcon = document.createElement("span");
  fetch(data.left.rating.icon)
    .then((res) => res.text())
    .then((svg) => {
      ratingIcon.innerHTML = svg;
    });

  const ratingText = document.createElement("p");
  ratingText.textContent = `${data.left.rating.value} (${data.left.rating.count} đánh giá)`;

  ratingBox.appendChild(ratingIcon);
  ratingBox.appendChild(ratingText);
  left.appendChild(ratingBox);

  // Learn
  const learnBox = document.createElement("div");
  learnBox.classList.add("learn-container");
  const learnTitle = document.createElement("h3");
  learnTitle.textContent = data.left.learn.title;
  learnBox.appendChild(learnTitle);

  const learnList = document.createElement("div");
  learnList.classList.add("learn-list");
  data.left.learn.items.forEach((text) => {
    const row = document.createElement("div");
    row.classList.add("learn-item");

    const iconWrapper = document.createElement("span");
    fetch(data.left.learn.icon)
      .then((res) => res.text())
      .then((svg) => {
        iconWrapper.innerHTML = svg;
      });

    const label = document.createElement("span");
    label.textContent = text;

    row.appendChild(iconWrapper);
    row.appendChild(label);
    learnList.appendChild(row);
  });
  learnBox.appendChild(learnList);
  left.appendChild(learnBox);

  // Requirements
  const reqBox = document.createElement("div");
  reqBox.classList.add("requirements-container");
  const reqTitle = document.createElement("h3");
  reqTitle.textContent = data.left.requirements.title;
  reqBox.appendChild(reqTitle);

  const ul = document.createElement("ul");
  data.left.requirements.items.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    ul.appendChild(li);
  });
  reqBox.appendChild(ul);
  left.appendChild(reqBox);

  // Lecturer
  const lecBox = document.createElement("div");
  lecBox.classList.add("lecturer-container");
  const lecTitle = document.createElement("h3");
  lecTitle.textContent = data.left.lecturer.title;
  lecBox.appendChild(lecTitle);

  const header = document.createElement("div");
  header.classList.add("lecturer-header");

  const avatar = document.createElement("img");
  avatar.src = data.left.lecturer.avatar;
  avatar.alt = data.left.lecturer.name;

  const name = document.createElement("span");
  name.textContent = data.left.lecturer.name;

  header.appendChild(avatar);
  header.appendChild(name);
  lecBox.appendChild(header);

  const lecDesc = document.createElement("p");
  lecDesc.textContent = data.left.lecturer.description;
  lecBox.appendChild(lecDesc);
  left.appendChild(lecBox);

  // === RIGHT ===
  const card = document.createElement("div");
  card.classList.add("workshop-card");

  const img = document.createElement("img");
  img.src = data.right.workshop.image;
  img.alt = "Workshop";
  card.appendChild(img);

  const priceBox = document.createElement("div");
  priceBox.classList.add("price-box");
  priceBox.innerHTML = `
    <span class="price">${data.right.workshop.price}</span>
    <span class="old-price">${data.right.workshop.oldPrice}</span>
  `;
  card.appendChild(priceBox);

  const slots = document.createElement("div");
  slots.classList.add("slots");
  slots.textContent = data.right.workshop.slots;
  card.appendChild(slots);

  const h4 = document.createElement("h4");
  h4.textContent = "Workshop bao gồm";
  card.appendChild(h4);

  const list = document.createElement("ul");
  list.classList.add("container-include-item");
  data.right.workshop.includes.forEach((text) => {
    const li = document.createElement("li");
    li.classList.add("include-item");

    const iconWrapper = document.createElement("span");
    iconWrapper.classList.add("icon");
    fetch("icons/check.svg")
      .then((res) => res.text())
      .then((svg) => {
        iconWrapper.innerHTML = svg;
      });

    const label = document.createElement("span");
    label.textContent = text;

    li.appendChild(iconWrapper);
    li.appendChild(label);
    list.appendChild(li);
  });
  card.appendChild(list);

  const btnBox = document.createElement("div");
  btnBox.classList.add("btn-box");
  data.right.workshop.actions.forEach((action) => {
    const btn = document.createElement("a");
    btn.textContent = action.label;
    btn.href = action.link;
    btn.classList.add(
      "btn",
      action.type === "primary" ? "btn-primary" : "btn-secondary"
    );
    btnBox.appendChild(btn);
  });
  card.appendChild(btnBox);

  right.appendChild(card);
}

fetch("event2-data.json")
  .then((res) => res.json())
  .then((data) => {
    renderPage(".container", data);
  })
  .catch((err) => console.error("Lỗi load data.json:", err));
