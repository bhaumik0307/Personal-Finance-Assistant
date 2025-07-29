/**
 * Categorizes transactions based on description keywords
 * @param {string} description - Transaction description
 * @returns {string} - Category name
 */
export const categorizeTransaction = (description) => {
  const desc = description.toLowerCase()

  // Food & Dining
  if (
    desc.includes("zomato") ||
    desc.includes("swiggy") ||
    desc.includes("food") ||
    desc.includes("restaurant") ||
    desc.includes("pizza") ||
    desc.includes("hotel") ||
    desc.includes("cafe") ||
    desc.includes("bakehouse") ||
    desc.includes("atta chakki") ||
    desc.includes("rominus") ||
    desc.includes("chaska") ||
    desc.includes("bake house") ||
    desc.includes("moti mahal") ||
    desc.includes("crystal hotel") ||
    desc.includes("prem sweets") ||
    desc.includes("holiday foods")
  ) {
    return "Food & Dining"
  }

  // Transportation
  if (
    desc.includes("irctc") ||
    desc.includes("uber") ||
    desc.includes("ola") ||
    desc.includes("petrol") ||
    desc.includes("fuel") ||
    desc.includes("transport") ||
    desc.includes("filling station") ||
    desc.includes("naini filling")
  ) {
    return "Transportation"
  }

  // Utilities
  if (
    desc.includes("jio") ||
    desc.includes("airtel") ||
    desc.includes("electricity") ||
    desc.includes("water") ||
    desc.includes("gas") ||
    desc.includes("recharge") ||
    desc.includes("reliance")
  ) {
    return "Utilities"
  }

  // Healthcare
  if (
    desc.includes("medical") ||
    desc.includes("hospital") ||
    desc.includes("pharmacy") ||
    desc.includes("doctor") ||
    desc.includes("health") ||
    desc.includes("starhealth") ||
    desc.includes("om medical") ||
    desc.includes("suvi eye") ||
    desc.includes("mahadev medical")
  ) {
    return "Healthcare"
  }

  // Entertainment
  if (
    desc.includes("amazon") ||
    desc.includes("netflix") ||
    desc.includes("prime") ||
    desc.includes("movie") ||
    desc.includes("game") ||
    desc.includes("nov digital") ||
    desc.includes("udemy")
  ) {
    return "Entertainment"
  }

  // Shopping
  if (
    desc.includes("store") ||
    desc.includes("shop") ||
    desc.includes("mart") ||
    desc.includes("bazaar") ||
    desc.includes("kirana") ||
    desc.includes("traders") ||
    desc.includes("enterprises") ||
    desc.includes("ankit traders") ||
    desc.includes("surabhi kirana") ||
    desc.includes("smart bazaar") ||
    desc.includes("shakun bartan") ||
    desc.includes("manish enterprises") ||
    desc.includes("new suman kirana")
  ) {
    return "Shopping"
  }

  return "Other"
}
