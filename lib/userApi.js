const BASE_URL = "https://art-website-liart.vercel.app/v1/user";

/** GET FAQs for website (public, no auth needed) */
export async function getUserFaqsApi() {
  const response = await fetch(`${BASE_URL}/getFaq`, {
    method: "GET",
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

/** GET products/artworks for website (public, no auth needed) */
export async function getUserProductsApi() {
  const response = await fetch(`${BASE_URL}/getProducts`, {
    method: "GET",
    redirect: "follow",
  });
  const text = await response.text();
  console.log("Get User Products API – response status:", response.status);
  console.log("Get User Products API – raw text:", text);
  let parsed = null;
  try {
    parsed = JSON.parse(text);
    console.log("Get User Products API – parsed:", parsed);
  } catch {
    return { success: false, data: { data: [] } };
  }
  return parsed;
}
