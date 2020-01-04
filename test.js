var AJV = require('ajv')
var fs = require('fs')
var glob = require('glob')
var path = require('path')
var tape = require('tape')
var yaml = require('js-yaml')

var ajv = new AJV()

var schemas = {}

glob.sync('schemas/*.yml').forEach(function (yml) {
  tape.test(yml, function (test) {
    var basename = path.basename(yml, '.yml')
    var schema
    test.doesNotThrow(function () {
      schema = yaml.safeLoad(fs.readFileSync(yml, 'utf8'))
    }, 'valid YAML')
    schemas[basename] = schema
    test.assert(ajv.validateSchema(schema), 'valid JSON schema')
    test.deepEqual(ajv.errors, null, 'no validation errors')
    test.end()
  })
})

glob.sync('schemas/examples/*.valid.yml').forEach(function (yml) {
  tape.test(yml, function (test) {
    var basename = path.basename(yml, '.yml')
    var schemaName = basename.split('-')[0]
    var schema = schemas[schemaName]
    var parsed
    test.doesNotThrow(function () {
      parsed = yaml.safeLoad(fs.readFileSync(yml, 'utf8'))
    }, 'valid YAML')
    test.assert(ajv.validate(schema, parsed), 'valid')
    test.deepEqual(ajv.errors, null, 'no validation errors')
    test.end()
  })
})

glob.sync('schemas/examples/*.invalid.yml').forEach(function (yml) {
  tape.test(yml, function (test) {
    var basename = path.basename(yml, '.yml')
    var schemaName = basename.split('-')[0]
    var schema = schemas[schemaName]
    var parsed
    test.doesNotThrow(function () {
      parsed = yaml.safeLoad(fs.readFileSync(yml, 'utf8'))
    }, 'valid YAML')
    test.assert(!ajv.validate(schema, parsed), 'invalid')
    test.end()
  })
})
