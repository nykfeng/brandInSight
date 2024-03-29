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
              class="contacts-linkedin"><i class="fa-brands fa-linkedin"></i> </span>${
                contact.name
              }</a>
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
      ${
        contact.saved
          ? '<div class="contacts-button contacts-saved-button"><i class="fa-solid fa-circle-check"></i> SAVED</div>'
          : '<div class="contacts-button contacts-save-button"><i class="fa-solid fa-circle-plus"></i> SAVE</div>'
      }
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
          <img src="${
            brand.logo.url
          }" alt="" class="brand-table-brand-logo-img">
      </div>
      <a href="/brands/${brand._id}" class="brand-table-brand-name flex">${
    brand.name
  }</a>
      <a href="${brand.website}" class="brand-table-brand-website flex">${
    brand.website
  }</a>
      <div class="brand-table-brand-stock flex">${utilities.trimWhiteSpace(
        brand.stock
      )}</div>
      <div class="brand-table-brand-employee flex">${utilities.numberFormat(
        brand.employee
      )}</div>
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
        <img src="${
          contact.brand.logo.url
        }" alt="" class="contact-table-brand-logo-img">
      </div>
      <div class="contact-table-contact-name flex">${contact.name}</div>
      <div class="contact-table-contact-position flex">${contact.position}</div>
      <div class="contact-table-contact-rank flex">${contact.rank}</div>
      <div class="contact-table-contact-phoneNumber flex">${
        contact.phoneNumber
      }</div>
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

// home page
// brand stories and news
function brandStoriesAndNews(article, logoUrl) {
  const html = `
  <li class="newsfeed-item">
    <img src="${article.urlToImage}" alt="" class="news-image">
    <div class="news-text-block">
      <div class="news-avatar"><img src="${logoUrl}" class="article-brand-logo"></div>
      <div class="news-title-block">
          <h3 class="news-title">${article.title}</h3>
          <span class="news-source-name">${article.source.name}</span>
          <span> on </span>
          <span class="news-published-date"> ${utilities.customDateFormat(
            article.publishedAt
          )}</span>
      </div>
      <p class="news-content">${article.content}</p>
    </div>
  </li>
  `;
  return html;
}

// user profile subscribed brand list
function profileSubBrands(brand) {
  const html = `
  <li class="subscribed-brands-list-item flex" data-brand-id="${brand._id}">
    <div class="logo-item">
      <img src="${brand.logo.url}" alt="" class="subscribed-brand-logo">
    </div>

    <div class="brand-information-item">
      <div class="brand-name-item">
          <a href="/brands/${brand._id}">
            ${brand.name}
          </a>
      </div>
      <a href="${brand.website}" class="brand-website-item">
          ${brand.website}
      </a>
    </div>
    
    <div class="brand-list__subscription-status">
          <i class="fa-solid fa-circle-check"></i>
    </div>
  </li>
  `;
  return html;
}

// user profile saved contact list
function profleSavedContacts(contact) {
  const html = `
  <li class="saved-contacts-list-item flex" data-contact-id="${contact._id}">
    <div class="logo-item">
      <img src="${contact.brand_logo}" alt="" class="contact-brand-logo">
    </div>

    <div class="contact-basics flex-column">
      <div class="contact-name-item">
        ${contact.name}
      </div>
      <div class="contact-position-item">
        ${contact.position}
      </div>
    </div>

    <div class="contact-method flex-column">
      <div class="contact-phoneNumber-item">
        <i class="fa-solid fa-square-phone"></i>
        ${contact.phoneNumber}
      </div>
    <div class="contact-email-item">
        <i class="fa-solid fa-envelope"></i>
        ${contact.email}
      </div>
    </div>

    <a href="https://${contact.linkedin}" class="contact-linkedin-item">
      <i class="fa-brands fa-linkedin"></i>
    </a>

    <div class="contact-list__subscription-status">
          <i class="fa-solid fa-circle-check"></i>
    </div>

  </li>
  `;
  return html;
}

// client brand page
// specific brand news stories
function newsStories(newsStory) {
  const html = `
  <li class="brand-news-item flex-column">
    <div class="brand-news__title-block flex">
      <div class="brand-news__title-icon">
          <i class="fa-solid fa-newspaper"></i>
          <span>News ▫ </span>
      </div>
      <div class="brand-news__date">${utilities.customDateFormat(
        newsStory.publishedAt
      )}</div>
    </div>
    <div class="brand-news__article-block">
      <p class="brand-news-source">${newsStory.source.name}</p>
      <a class="brand-news-article" href="${newsStory.url}">${
    newsStory.title
  }</a>
    </div>
  </li>`;
  return html;
}

// client brand page
// brand stock information
function brandStockQuoteChart(brand, stock, stats) {
  // Fix issue caused by using "New York Stock Exchange" as the exchange name
  const exchange = stock.primaryExchange.toLowerCase().includes("new york")
    ? "NYSE"
    : stock.primaryExchange;
  const html = `
  <div class="stock-info flex">
      <img src="${brand.logo.url || ""}" alt="" class="stock-logo">
      <div class="stock-info-header flex">
          <p class="stock-company-name">${brand.name}</p>
          <p class="stock-symbol-full">
              <span class="stock-symbol">${stock.symbol}</span>
              <span class="stock-index-country"><i class="fa-solid fa-flag-usa"></i></span>
              <span class="stock-index">${stock.primaryExchange}</span>
          </p>
      </div>
  </div>

  <div class="stock-stats flex">
      <div class="stock-price-block">
          <span class="stock-price">${stock.close}</span>
          <span class="stock-currency">${stock.currency} </span>
          <span class="stock-change">${stock.change} </span>
          <span class="stock-change-percent">(${stock.changePercent})</span>
      </div>

      <ul class="stock-stat-list flex">
          <li class="stock-stat-item">
              <p class="stock-upcoming-earning list-input">${
                stats.nextEarningsDate
              }</p>
              <span>UPCOMING EARNINGS</span>
          </li>

          <li class="stock-stat-item">
              <p class="stock-EPS list-input">${stats.ttmEPS}</p>
              <span>EPS</span>
          </li>
          <li class="stock-stat-item">
              <p class="stock-market-cap list-input">${utilities.convertBigNumber(
                stock.marketCap
              )}</p>
              <span>MARKET CAP</span>
          </li>
          <li class="stock-stat-item">
              <p class="stock-divident-yield list-input">${
                parseFloat(stats.dividendYield) * 100
              }%</p>
              <span>DIVIDEND YIELD</span>
          </li>
          <li class="stock-stat-item">
              <p class="stock-PE list-input">${stock.peRatio}</p>
              <span>P/E</span>
          </li>
      </ul>
  </div>

  <div class="stock-chart">
      <!-- TradingView Widget BEGIN -->
      <div class="tradingview-widget-container">
          <div id="tradingview_1d14d" style="height: 400px;"><div id="tradingview_b5dc7-wrapper" style="position: relative;box-sizing: content-box;width: 100%;height: 100%;margin: 0 auto !important;padding: 0 !important;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif;"><div style="width: 100%;height: 100%;background: transparent;padding: 0 !important;"><iframe id="tradingview_b5dc7" src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_b5dc7&amp;symbol=${exchange}%3A${
    stock.symbol
  }&amp;interval=D&amp;hidetoptoolbar=1&amp;saveimage=0&amp;toolbarbg=f1f3f6&amp;studies=%5B%5D&amp;theme=light&amp;style=2&amp;timezone=Etc%2FUTC&amp;studies_overrides=%7B%7D&amp;overrides=%7B%7D&amp;enabled_features=%5B%5D&amp;disabled_features=%5B%5D&amp;locale=en&amp;utm_source=localhost&amp;utm_medium=widget&amp;utm_campaign=chart&amp;utm_term=${exchange}%3A${
    stock.symbol
  }" style="width: 100%; height: 100%; margin: 0 !important; padding: 0 !important;" frameborder="0" allowtransparency="true" scrolling="no" allowfullscreen=""></iframe></div></div></div>
          <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
          <script type="text/javascript">
              new TradingView.widget(
                  {
                      "autosize": true,
                      "symbol": "${exchange}:${stock.symbol}",
                      "interval": "D",
                      "timezone": "Etc/UTC",
                      "theme": "light",
                      "style": "2",
                      "locale": "en",
                      "toolbar_bg": "#f1f3f6",
                      "enable_publishing": false,
                      "hide_top_toolbar": true,
                      "save_image": false,
                      "container_id": "tradingview_1d14d"
                  }
              );
          </script>
      </div>
      <!-- TradingView Widget END -->
  </div>
  `;
  return html;
}

function stockFinancials(stats, financials, incomeStatement) {
  const html = `
  <li class="brand-highlights-item stock-statistics-item flex">
      <span class="brand-highlights-option">Market Cap</span>
      <span class="brand-highlights-number market-cap">${utilities.convertBigNumber(
        stats.marketcap
      )}</span>
  </li>
  <li class="brand-highlights-item stock-statistics-item flex">
      <span class="brand-highlights-option">Outstanding Shares</span>
      <span class="brand-highlights-number outstanding-shares">${utilities.convertBigNumber(
        stats.sharesOutstanding
      )}</span>
  </li>
  <li class="brand-highlights-item stock-statistics-item flex">
      <span class="brand-highlights-option">EBITDA</span>
      <span class="brand-highlights-number market-cap ebitda">${utilities.convertBigNumber(
        incomeStatement.ebitda
      )}</span>
  </li>
  <li class="brand-highlights-item stock-statistics-item flex">
      <span class="brand-highlights-option">Net Income</span>
      <span class="brand-highlights-number market-cap net-income">${utilities.convertBigNumber(
        incomeStatement.netIncome
      )}</span>
  </li>
  <li class="brand-highlights-item stock-statistics-item flex">
      <span class="brand-highlights-option">Revenue</span>
      <span class="brand-highlights-number market-cap revenue">${utilities.convertBigNumber(
        incomeStatement.totalRevenue
      )}</span>
  </li>
  <li class="brand-highlights-item stock-statistics-item flex">
      <span class="brand-highlights-option">Gross Profit</span>
      <span class="brand-highlights-number market-cap gross-profit">${utilities.convertBigNumber(
        incomeStatement.grossProfit
      )}</span>
  </li>
  <li class="brand-highlights-item stock-statistics-item flex">
      <span class="brand-highlights-option">Total Cash</span>
      <span class="brand-highlights-number market-cap total-cash">${utilities.convertBigNumber(
        financials.cashAndCashEquivalentsAtCarryingValue
      )}</span>
  </li>
  <li class="brand-highlights-item stock-statistics-item flex">
      <span class="brand-highlights-option">Total Debt</span>
      <span class="brand-highlights-number market-cap">${utilities.convertBigNumber(
        financials.longTermDebt
      )}</span>
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
  viewedHistoryBrandList,
  adSpendBrandsList,
  trendingBrandListContentLoader,
  brandListRow,
  contactListRow,
  profileSubBrands,
  profleSavedContacts,
  brandStoriesAndNews,
  newsStories,
  brandStockQuoteChart,
  stockFinancials,
};
