function homeTrendingList(brand, subscribed) {
  const html = `
    <li class="brand-list__brand" data-brand-id="${brand._id}">
      <img src="${brand.logo.url || ""} " alt="${brand.name} logo" class="brand-list__brand-logo">
      <div class="brand-list__text">
          <a href="/brands/${brand._id || "/home"}" class="brand-list__brand-title">${brand.name}</a>
          <p class="brand-list__brand-industry">${brand.industry || ""}</p>
      </div>
      <div class="brand-list__subscription-status">
          ${subscribed? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-solid fa-circle-plus"></i>'}
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

function leadershipList(leadership) {
  const html = `
  <li class="leadership-list-item flex">
    <div class="leadershipt-list-profile-block">
      <img src="${leadership.profilePicture.url}" alt="" class="leadership-profile">
    </div>
    <div class="leadership-detail flex">
      <p class="leadership-name">${leadership.name}</p>
      <p class="leadership-role">${leadership.position}</p>
    </div>
  </li>
  `;
  return html;
}

// search bar dropdown result list
function searchResultList(brand) {
  const html = `
  <li class="search-result__list-item flex">
      <a href="/brands/${brand._id}" class="flex search-item">
        <div class="result-logo"><img src="${brand.logo.url}" alt="" class="result-logo-img"></div>
          <div class="result-brand-info">
            <p class="result-brand__name flex">${brand.name}</p>
            <p class="result-brand__url flex">${brand.website}</p>
          </div>
      </a>
    </li>
  `;
  return html;
}

// search bar dropdown when no result was found
function searchResultListEmpty() {
  const html = `
  <li class="search-result__list-item flex">
    <p class="search-result__no-result search-item flex"> Not result was found </p>
  </li>
  `;
  return html;
}

// home right panel, subscribed brand list
function subscribedBrandList(brand) {
  // brand here does not have full brand info, only id, name, logo url
  const html = `
  <li class="right-brand-item">
      <img src="${brand.logo}" alt="" class="right-brand-logo">
      <a href="/brands/${brand.id}" class="right-brand-title">${brand.name}</a>

    <div class="right-brand-status">
      <i class="fa-solid fa-circle-check"></i>
      <span class="right-brand-status-text">Subscribed</span>
    </div>
  </li>
  `;
  return html;
}

// home right panel, viewed history brand list
function viewedHistoryBrandList(brand) {
  // brand here does not have full brand info, only id, name, logo url
  const html = `
  <li class="right-brand-item">
      <img src="${brand.logo}" alt="" class="right-brand-logo">
      <a href="/brands/${brand.id}" class="right-brand-title">${brand.name}</a>

    <div class="right-brand-status">
      <i class="fa-solid fa-circle-check"></i>
      <span class="right-brand-status-text">Subscribed</span>
    </div>
  </li>
  `;
  return html;
}

export default {
  homeTrendingList,
  pagination,
  contactList,
  leadershipList,
  searchResultList,
  searchResultListEmpty,
  subscribedBrandList,
  viewedHistoryBrandList
};
