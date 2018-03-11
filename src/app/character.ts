export interface Character { 
  _id?: number;
  name: string;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  health: number;
  magic: number;
  exp: number;
}

//Note to self, you can use ? to denote an optional property