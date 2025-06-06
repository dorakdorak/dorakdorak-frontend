export function getStorageTypeLabel(type: "R" | "F" | "RT"): string {
  switch (type) {
    case "R":
      return "냉장";
    case "F":
      return "냉동";
    case "RT":
      return "상온";
    default:
      return "-";
  }
}
