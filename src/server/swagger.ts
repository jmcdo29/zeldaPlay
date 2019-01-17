import { DocumentBuilder } from '@nestjs/swagger';

export function configSwagger() {
  return new DocumentBuilder()
    .setTitle('ZeldaPlay')
    .setDescription('The zeldaplay API description')
    .setVersion('1.0')
    .setSchemes('https')
    .setContactEmail('jmcdo29@gmail.com')
    .setHost('zeldaplay.herokuapp.com')
    .setLicense(
      'MIT',
      'https://github.com/jmcdo29/zeldaPlay/blob/master/LICENSE'
    )
    .addTag(
      'character',
      'APIs that specifically pertain to the character or character saves'
    )
    .addTag(
      'note',
      'APIs for getting the Notes of and adding new Notes for the character'
    )
    .addTag(
      'spell',
      'APIs for getting the Spells of and adding new Spells for the character'
    )
    .addTag('skill', 'APIs for getting new Skills for the character')
    .addTag(
      'weapon',
      'APIs for getting the Spells of and adding new Weapons for the character'
    )
    .addTag('user', 'APIs for registering and logging in to the application')
    .addBearerAuth('Authorization', 'header')
    .build();
}
