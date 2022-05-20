async function addBrandSubscription(brandId) {
  const data = new URLSearchParams();
  for (const [key, value] of Object.entries({ id: brandId })) {
    data.append(key, value);
  }

  const url = `/user/${user._id}/brandSubscription`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });
}

async function deleteBrandSubscription(brandId) {
  const data = new URLSearchParams();
  for (const [key, value] of Object.entries({ id: brandId })) {
    data.append(key, value);
  }

  const url = `/user/${user._id}/brandSubscription`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });
}

async function saveContact(contactId) {
  const data = new URLSearchParams();
  for (const [key, value] of Object.entries({ id: contactId })) {
    data.append(key, value);
  }

  const url = `/user/${user._id}/savedContacts`;
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });
}

async function unsaveContact(contactId) {
  const data = new URLSearchParams();
  for (const [key, value] of Object.entries({ id: contactId })) {
    data.append(key, value);
  }

  const url = `/user/${user._id}/savedContacts`;
  await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });
}

async function saveBrandNote(note) {
  const url = `/user/brandNote/${brand._id}`;
  const data = new URLSearchParams();
  for (const [key, value] of Object.entries({ note: note })) {
    data.append(key, value);
  }
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: data,
  });
}

export default {
  addBrandSubscription,
  deleteBrandSubscription,
  saveContact,
  unsaveContact,
  saveBrandNote,
};
