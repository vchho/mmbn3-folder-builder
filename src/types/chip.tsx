export interface Chip {
  number: number;
  image: string;
  name: string;
  type: string;
  damage: string;
  lettercode: string;
  memory: number;
  description: string;
  key: string;
  chipType: "standard" | "giga" | "mega";
  count: number;
}

export type FolderTrack = {
  count: number;
  chipType: "standard" | "giga" | "mega";
  name: string;
};

export type FolderRouteParams = {
  id: string;
};

export interface FolderObject {
  folder: Chip[];
  folderTrack: FolderTrack[];
  id: string;
}

export type SortOrder =
  | "default"
  | "Id"
  | "ABCDE"
  | "Code"
  | "Damage"
  | "Element"
  | "MB";

export type SortOrderDirection = "descending" | "ascending";
