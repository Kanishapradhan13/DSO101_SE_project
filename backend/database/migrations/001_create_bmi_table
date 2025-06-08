/* eslint-disable no-magic-numbers */
// File: backend/database/migrations/001_create_bmi_table.js

exports.up = function(knex) {
  return knex.schema.createTable('bmi_records', function(table) {
    table.increments('id').primary()
    table.string('user_id').notNullable()
    table.decimal('height', 5, 2).notNullable() // in cm
    table.decimal('weight', 5, 2).notNullable() // in kg
    table.integer('age').notNullable()
    table.decimal('bmi', 5, 2).notNullable()
    table.string('category').notNullable()
    table.timestamps(true, true)
    // Add indexes for better performance
    table.index('user_id')
    table.index('created_at')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('bmi_records')
}