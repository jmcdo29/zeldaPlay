import { Character } from './character';

const methods = {
  levelUp: function(char: Character): void {
    char.health = char.maxHealth += 16 + char.attributes[2].modifier;
    char.magic = char.maxMagic += 3 + char.attributes[4].modifier;
    char.level++;
  },
  calcMod: function(char: Character): void {
    for (let i = 0; i < char.attributes.length; i++) {
      const attrVal = char.attributes[i].value;
      const modVal = (attrVal % 2 === 0) ? (attrVal - 10) / 2 : (attrVal - 11) / 2;
      char.attributes[i].modifier = modVal;
    }
    return;
  }
};

export { methods };
