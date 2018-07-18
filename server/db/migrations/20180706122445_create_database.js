
exports.up = function(knex, Promise) {
  const LASTMOD = 'last_modified';
  const LMB = 'last_modified_by';
  const charID = 'character_id';
  const CREATED = 'created_date';
  return Promise.all([
    knex.schema.createTable('user', user_table => {
      user_table.string('id').primary();
      user_table.string('email');
      user_table.string('password');
      user_table.string('recovery_token');
      user_table.timestamp(CREATED).defaultTo(knex.fn.now());
      user_table.timestamp(LASTMOD).defaultTo(knex.fn.now());
      user_table.unique(['id', 'email']);
    }),
    knex.schema.createTable('character', character_table => {
      character_table.string('id').primary();
      character_table.string('user_id');
      character_table.foreign('user_id').references('user.id');
      character_table.string('name');
      character_table.integer('strength');
      character_table.integer('dexterity');
      character_table.integer('constitution');
      character_table.integer('intelligence');
      character_table.integer('wisdom');
      character_table.integer('charisma');
      character_table.integer('max_health');
      character_table.integer('health')
      character_table.integer('max_magic');
      character_table.integer('magic');
      character_table.integer('experience');
      character_table.string('race');
      character_table.string('subrace');
      character_table.integer('ac');
      character_table.integer('flat_footed');
      character_table.integer('touch');
      character_table.string('size');
      character_table.string('craft_one');
      character_table.string('craft_two');
      character_table.string('performance');
      character_table.string('profession');
      character_table.timestamp(CREATED).defaultTo(knex.fn.now());
      character_table.timestamp(LASTMOD).defaultTo(knex.fn.now());
      character_table.string(LMB);
      character_table.foreign(LMB).references('user.id');
      character_table.unique('id');
    }),
    knex.schema.createTable('skill', skill_table => {
      skill_table.string('id').primary();
      skill_table.string(charID);
      skill_table.foreign(charID).references('character.id');
      skill_table.boolean('trained');
      skill_table.string('name');
      skill_table.integer('ranks');
      skill_table.string('modifier');
      skill_table.integer('racial_modifier');
      skill_table.integer('item_modifier');
      skill_table.integer('misc_modifier');
      skill_table.string('skill_type');
      skill_table.timestamp(CREATED).defaultTo(knex.fn.now());
      skill_table.timestamp(LASTMOD).defaultTo(knex.fn.now());
      skill_table.string(LMB);
      skill_table.foreign(LMB).references('user.id');
      skill_table.unique('id');
    }),
    knex.schema.createTable('weapon', weapon_table => {
      weapon_table.string('id').primary();
      weapon_table.string('name');
      weapon_table.string(charID);
      weapon_table.foreign(charID).references('character.id');
      weapon_table.integer('damage');
      weapon_table.integer('number_of_hits');
      weapon_table.string('crit_range');
      weapon_table.integer('crit_multiplier');
      weapon_table.string('type');
      weapon_table.string('modifier');
      weapon_table.integer('range');
      weapon_table.integer('ammo');
      weapon_table.timestamp(CREATED).defaultTo(knex.fn.now());
      weapon_table.timestamp(LASTMOD).defaultTo(knex.fn.now());
      weapon_table.string(LMB);
      weapon_table.foreign(LMB).references('user.id');
      weapon_table.unique('id');
    }),
    knex.schema.createTable('spell', spell_table => {
      spell_table.string('id').primary();
      spell_table.string(charID);
      spell_table.foreign(charID).references('character.id');
      spell_table.string('name');
      spell_table.string('effect');
      spell_table.integer('mp_use');
      spell_table.integer('damage');
      spell_table.integer('number_of_hit');
      spell_table.string('modifier');
      spell_table.string('diety');
      spell_table.boolean('use_diety');
      spell_table.timestamp(CREATED).defaultTo(knex.fn.now());
      spell_table.timestamp(LASTMOD).defaultTo(knex.fn.now());
      spell_table.string(LMB);
      spell_table.foreign(LMB).references('user.id');
      spell_table.unique('id');
    }),
    knex.schema.createTable('saving_throw', save_table => {
      save_table.string('id').primary();
      save_table.string(charID);
      save_table.foreign(charID).references('character.id');
      save_table.integer('racial_bonus');
      save_table.string('name');
      save_table.string('modifier');
      save_table.timestamp(CREATED).defaultTo(knex.fn.now());
      save_table.timestamp(LASTMOD).defaultTo(knex.fn.now());
      save_table.string(LMB);
      save_table.foreign(LMB).references('user.id');
      save_table.unique('id');
    }),
    knex.schema.createTable('recovery_answer', recovery_table => {
      recovery_table.string('id').primary();
      recovery_table.string('question');
      recovery_table.string('answer');
      recovery_table.string('user_id');
      recovery_table.foreign('user_id').references('user.id');
      recovery_table.timestamp(CREATED).defaultTo(knex.fn.now());
      recovery_table.timestamp(LASTMOD).defaultTo(knex.fn.now());
      recovery_table.string(LMB);
      recovery_table.foreign(LMB).references('user.id');
      recovery_table.unique('id');
    }),
    knex.schema.createTable('recovery_question', question_table => {
      question_table.string('id').primary();
      question_table.string('question');
      question_table.unique('id');
    }),
    knex.schema.createTable('weapon_element', element_table => {
      element_table.string('id').primary();
      element_table.string('weapon_id');
      element_table.foreign('weapon_id').references('weapon.id');
      element_table.string('type');
      element_table.integer('damage');
      element_table.integer('number_of_hits');
      element_table.timestamp(CREATED).defaultTo(knex.fn.now());
      element_table.timestamp(LASTMOD).defaultTo(knex.fn.now());
      element_table.string(LMB);
      element_table.foreign(LMB).references('user.id');
      element_table.unique('id');
    }),
    knex.schema.createTable('note', note_table => {
      note_table.string('id').primary();
      note_table.string(charID);
      note_table.foreign(charID).references('character.id');
      note_table.string('message');
      note_table.timestamp('time');
      note_table.boolean('important');
      note_table.timestamp(CREATED).defaultTo(knex.fn.now());
      note_table.timestamp(LASTMOD).defaultTo(knex.fn.now());
      note_table.string(LMB);
      note_table.foreign(LMB).references('user.id');
      note_table.unique('id');
    })
  ]).then(() => {
    console.log('Finished migrations.');
  }).catch(err => {
    console.error(err);
  })
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('user'),
    knex.schema.dropTable('character'),
    knex.schema.dropTable('skill'),
    knex.schema.dropTable('weapon'),
    knex.schema.dropTable('spell'),
    knex.schema.dropTable('saving_throw'),
    knex.schema.dropTable('recovery_answer'),
    knex.schema.dropTable('recovery_question'),
    knex.schema.dropTable('weapon_element'),
    knex.schema.dropTable('note')
  ])
};
