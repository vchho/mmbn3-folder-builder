import { atom } from "jotai";
import { StandardChip } from "../utils/chips";

export const folderAtom = atom<StandardChip[]>([]);
export const folderAtom2 = atom<any>(new Map());
