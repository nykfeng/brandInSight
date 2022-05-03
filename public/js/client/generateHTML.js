import utilities from "./utilities.js";

// Home page front trending list
function homeTrendingList(brand, subscribed) {
  const html = `
    <li class="brand-list__brand" data-brand-id="${brand._id}">
      <img src="${brand.logo.url || ""} " alt="${
    brand.name
  } logo" class="brand-list__brand-logo">
      <div class="brand-list__text">
          <a href="/brands/${
            brand._id || "/home"
          }" class="brand-list__brand-title">${brand.name}</a>
          <p class="brand-list__brand-industry">${brand.industry || ""}</p>
      </div>
      <div class="brand-list__subscription-status">
          ${
            subscribed
              ? '<i class="fa-solid fa-circle-check"></i>'
              : '<i class="fa-solid fa-circle-plus"></i>'
          }
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

// For brand page - contact list
function contactList(contact) {
  const html = `
  <li class="contacts-item" data-contact-id="${contact._id}">
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

// For brand page - leadership list
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
  <li class="right-brand-item brand-list__brand" data-brand-id="${brand.id}">
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
  <li class="right-brand-item brand-list__brand" data-brand-id="${brand.id}">
      <img src="${brand.logo}" alt="" class="right-brand-logo">
      <a href="/brands/${brand.id}" class="right-brand-title">${brand.name}</a>

    <div class="right-brand-status">
      ${
        brand.subscribed
          ? '<i class="fa-solid fa-circle-check"></i><span class="right-brand-status-text">Subscribed</span>'
          : '<i class="fa-solid fa-circle-plus"></i><span class="right-brand-status-text">Subscribe</span>'
      }
    </div>
  </li>
  `;
  return html;
}

// home right panel, ad spend brand list
function adSpendBrandsList(brand) {
  // brand here does not have full brand info, only id, name, logo url
  const html = `
  <li class="right-brand-item">
      <img src="${brand.logo}" alt="" class="right-brand-logo">
      <a href="/brands/${brand.id}" class="right-brand-title">${brand.name}</a>

      <div class="right-brand-spend">
          <p>$${brand.adSpend}</p>
      </div>
  </li>
  `;
  return html;
}

// Content loader for trending list
function trendingBrandListContentLoader() {
  const html = `
  <li class="brand-list__brand">
    <div class="cph-brand-logo animated-bg">
      <img alt="" class="">
    </div>

    <div class="">
      <a href="" class="cph-brand-title animated-bg"></a>
      <p class="cph-brand-p animated-bg"></p>
    </div>
  </li>
  `;
  return html;
}

// home page --------
// brand list page brand rows
function brandListRow(brand, index) {
  const html = `
  <div class="brand-table-row row flex">
      <div class="brand-table-row-number flex">${index + 1}</div>
      <div class="brand-table-brand-logo flex">
          <img src="${brand.logo.url}" alt="" class="brand-table-brand-logo-img">
      </div>
      <a href="/brands/${brand._id}" class="brand-table-brand-name flex">${brand.name}</a>
      <a href="${brand.website}" class="brand-table-brand-website flex">${brand.website}</a>
      <div class="brand-table-brand-stock flex">${utilities.trimWhiteSpace(brand.stock)}</div>
      <div class="brand-table-brand-employee flex">${utilities.numberFormat(brand.employee)}</div>
      <div class="brand-table-brand-industries flex">${utilities.shortenString(
        brand.industry[0],
        30
      )}</div>
      <div class="brand-table-brand-headquarters flex">${utilities.shortenString(
        brand.headquarters,
        30
      )}</div>
      <div class="brand-table-brand-description flex">${utilities.shortenString(
        brand.description,
        50
      )}</div>
  </div>
  `;
  return html;
}

// home page --------
// contact list page contact rows
function contactListRow(contact, index) {
  const html = `
  <div class="contact-table-row row flex">
      <div class="contact-table-row-number flex">${index + 1}</div>
      <div class="contact-table-contact-brand flex">
        <img src="${contact.brand.logo.url}" alt="" class="contact-table-brand-logo-img">
      </div>
      <div class="contact-table-contact-name flex">${contact.name}</div>
      <div class="contact-table-contact-position flex">${contact.position}</div>
      <div class="contact-table-contact-rank flex">${contact.rank}</div>
      <div class="contact-table-contact-phoneNumber flex">${contact.phoneNumber}</div>
      <div class="contact-table-contact-email flex">${contact.email}</div>
      <div class="contact-table-contact-location flex">${contact.location}</div>
      <a href="${contact.linkedin}" class="contact-table-contact-linkedin flex">
        <i class="fa-brands fa-linkedin"></i>
        ${contact.linkedin}
      </a>
  </div>
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
  viewedHistoryBrandList,
  adSpendBrandsList,
  trendingBrandListContentLoader,
  brandListRow,
  contactListRow
};
