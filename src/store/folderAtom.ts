import { atom } from "jotai";
import { StandardChip } from "../utils/chips";

export const folderAtom = atom<StandardChip[]>([]);
export const folderAtom2 = atom(new Map<string, any>());
