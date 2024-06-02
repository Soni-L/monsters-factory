export interface MonsterType {
  species: string;
  sub_species: string;
}

export interface Monster {
  _id: string;
  name: string;
  level: number;
  type: MonsterType;
}

export interface MintedMonster {
  name: string;
  level: number;
  type: MonsterType;
}

export interface MonstersResponse {
  total: number;
  page: number;
  limit: number;
  monsters: Monster[];
}
