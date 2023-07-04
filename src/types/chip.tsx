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
  chipType: string;
}

export interface ChipWithCount extends Chip {
  count: number;
}
