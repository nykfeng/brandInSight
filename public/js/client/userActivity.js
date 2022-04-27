async function addBrandSubscription(brandId) {
  const data = new URLSearchParams();
  for (const [key, value] of Object.entries({ id: brandId })) {
    data.append(key, value);
  }
  // const data = { brandId };
  console.log("data is ");
  console.log(data);

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

export default {
  addBrandSubscription,
  deleteBrandSubscription
};
