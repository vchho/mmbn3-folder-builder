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
  | "Alphabetical"
  | "Code"
  | "Damage"
  | "Element"
  | "MB";

export type SortOrderDirection = "descending" | "ascending";

export const sorts = [
  {
    param: "default",
    label: "default",
    enabled: true,
  },
  {
    param: "id",
    label: "Id",
    enabled: false,
  },
  {
    param: "alphabetical",
    label: "Alphabetical",
    enabled: false,
  },
  {
    param: "code",
    label: "Code",
    enabled: false,
  },
  {
    param: "damage",
    label: "Damage",
    enabled: false,
  },
  {
    param: "element",
    label: "Element",
    enabled: false,
  },
  {
    param: "mb",
    label: "MB",
    enabled: false,
  },
];
