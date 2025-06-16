export interface ZeroWasteInfo {
  dosirakName: string;
  expireDate: string;
  imageUrl: string;
}

export interface ZeroWasteResult {
  status: "ACCEPTED" | "REJECTED";
  remainPercentage: number;
  message: string;
}