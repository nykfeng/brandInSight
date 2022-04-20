function homeTrendingList(brand) {
  const html = `
    <li class="brand-list__brand">
                        <img src="${brand.logo.url || ''} " alt="${brand.name} logo" class="brand-list__brand-logo">
                        <div class="brand-list__text">
                            <a href="/brands/${brand._id || '/home'}" class="brand-list__brand-title">${brand.name}</a>
                            <p class="brand-list__brand-industry">${brand.description || ''}</p>
                        </div>
                    </li>`;
  return html;
}


export default {
    homeTrendingList
}