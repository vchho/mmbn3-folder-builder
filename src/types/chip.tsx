export interface Chip {
  number: number;
  image: string;
  name: string;
  type: string;
  damage: string;
  lettercode: string;
  memory: string | number;
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
