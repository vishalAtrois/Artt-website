const BASE_URL = "https://art-website-liart.vercel.app/v1/admin";

export async function logoutApi(email, refreshToken) {
  const response = await fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, refreshToken }),
    redirect: "follow",
  });
  const text = await response.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { success: false, message: "Invalid response" };
  }
  return parsed;
}

/** GET art list. Pass access token from AdminStorage.getAccessToken() */
export async function getProductsApi(accessToken) {
  const headers = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const response = await fetch(`${BASE_URL}/getProducts`, {
    method: "GET",
    headers,
    redirect: "follow",
  });
  const text = await response.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { success: false, data: [], products: [] };
  }
  return parsed;
}

/** POST upload image. Returns response with image URL – check console for shape. */
export async function uploadImageApi(accessToken, file) {
  const formData = new FormData();
  formData.append("image", file, file.name || "image");
  const headers = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const response = await fetch(`${BASE_URL}/uploadImage`, {
    method: "POST",
    headers,
    body: formData,
    redirect: "follow",
  });
  const text = await response.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { success: false, message: "Invalid response" };
  }
  return parsed;
}

/** POST create art. Body: { title, description, category, price, inStock, image }. Pass access token. */
export async function createProductApi(accessToken, body) {
  const headers = { "Content-Type": "application/json" };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const response = await fetch(`${BASE_URL}/createProduct`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    redirect: "follow",
  });
  const text = await response.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { success: false, message: "Invalid response" };
  }
  return parsed;
}

/** PUT update art. productId in query. Body: { image?, category?, title?, description?, price?, inStock? }. */
export async function updateProductApi(accessToken, productId, body) {
  const headers = { "Content-Type": "application/json" };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const response = await fetch(
    `${BASE_URL}/updateProduct?productId=${encodeURIComponent(productId)}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
      redirect: "follow",
    }
  );
  const text = await response.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { success: false, message: "Invalid response" };
  }
  return parsed;
}

/** DELETE art. productId in query. */
export async function deleteProductApi(accessToken, productId) {
  const headers = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const response = await fetch(
    `${BASE_URL}/deleteproduct?productId=${encodeURIComponent(productId)}`,
    {
      method: "DELETE",
      headers,
      redirect: "follow",
    }
  );
  const text = await response.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { success: false, message: "Invalid response" };
  }
  return parsed;
}

/** GET FAQs list. */
export async function getFaqsApi(accessToken) {
  const headers = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const response = await fetch(`${BASE_URL}/getFaq`, {
    method: "GET",
    headers,
    redirect: "follow",
  });
  const text = await response.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { success: false, result: [] };
  }
  return parsed;
}

/** POST create FAQ. Body: { question, answer, order }. */
export async function createFaqApi(accessToken, body) {
  const headers = { "Content-Type": "application/json" };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const response = await fetch(`${BASE_URL}/createFaq`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    redirect: "follow",
  });
  const text = await response.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { success: false, message: "Invalid response" };
  }
  return parsed;
}

/** DELETE FAQ. faqId in query. */
export async function deleteFaqApi(accessToken, faqId) {
  const headers = {};
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
  const response = await fetch(
    `${BASE_URL}/deleteFaq?faqId=${encodeURIComponent(faqId)}`,
    {
      method: "DELETE",
      headers,
      redirect: "follow",
    }
  );
  const text = await response.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { success: false, message: "Invalid response" };
  }
  return parsed;
}