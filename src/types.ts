export interface Item {
  id: string;
  imageUrl: string;
  itemName: string;
  location: string;
  date: string;
  type: "All" | FilterType;
  status: "All" | StatusType;
  createdAt: string;
}

export type FilterType = "All" | "Lost" | "Found";
export type StatusType = "All" | "Active" | "Done";

export interface User {
  username: string;
  email:  string;
  password: string;
  id: string;
}
