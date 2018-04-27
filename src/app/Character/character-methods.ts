import { Character } from './character';
import { Level } from './Enums/levels.enum';

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
  },
  gainExp: function(char: Character, expGain: number): void {
    let counter = 0;
    char.exp += expGain;
    const lvl = 'level';
    for (const key in Level) {
      if (key.includes('level')) {
        counter++;
        if (Level[lvl + counter] <= char.exp && char.exp <= Level[lvl + (counter + 1)]) {
          char.level = counter;
          break;
        }
      }
    }
  },
  getDateString: function(): string {
    const time = new Date(Date.now());
    const month = time.getMonth() + 1;
    const day = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();
    const dateString = month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    return dateString;
  }
};

export { methods };
