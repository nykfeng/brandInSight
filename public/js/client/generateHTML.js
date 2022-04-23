function homeTrendingList(brand) {
  const html = `
    <li class="brand-list__brand">
                        <img src="${brand.logo.url || ""} " alt="${
    brand.name
  } logo" class="brand-list__brand-logo">
                        <div class="brand-list__text">
                            <a href="/brands/${
                              brand._id || "/home"
                            }" class="brand-list__brand-title">${brand.name}</a>
                            <p class="brand-list__brand-industry">${
                              brand.description || ""
                            }</p>
                        </div>
                    </li>`;
  return html;
}

function pagination(name, totalPages) {
  let pageNumberHtml =
    '<li><button class="pagination-number-btn active-pagination-btn" data-id="1">1</button></li>';

  // i to start at 1 because first page is defined above
  for (let i = 1; i < totalPages; i++) {
    pageNumberHtml += `<li><button class="pagination-number-btn" data-id="${
      i + 1
    }">${i + 1}</button></li>`;
  }

  const html = `
  <div class="pagination ${name}-pagination flex">
    <button class="prev-page pagination-btn">Previous</button>
        <ul class="pagination-numbers flex">
          ${pageNumberHtml}
        </ul>
    <button class="next-page pagination-btn">Next</button>
  </div>
  `;
  return html;
}

function contactList(contact) {
  const html = `
  <li class="contacts-item">
  <div class="contacts-basics flex">
      <a href="${contact.linkedin}" class="contacts-name"><span
              class="contacts-linkedin"><i class="fa-brands fa-linkedin"></i> </span>${contact.name}</a>
      <p class="contacts-title">${contact.position}</p>
      <p class="contacts-rank">${contact.rank}</p>
  </div>
  <div class="contacts-info flex">
      <p class="contacts-email">
          <a href="mailto:${contact.email}">
              <i class="fa-solid fa-envelope"></i>${contact.email}
          </a>
      </p>
      <p class="contacts-phone">
          <a href="tel:${contact.phoneNumber}">
              <i class="fa-solid fa-square-phone"></i>${contact.phoneNumber}
          </a>
      </p>
  </div>
  <div class="contact-save">
      <div class="contacts-save-button">
          <i class="fa-solid fa-circle-plus"></i> SAVE
      </div>
  </div>
</li>
  `;
  return html;
}

export default {
  homeTrendingList,
  pagination,
  contactList
};
