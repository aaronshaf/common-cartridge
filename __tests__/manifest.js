var assert = require('assert')
var parse = require('../parse')

var SMALL_CARTRIDGE = __dirname + '/../test/canvas_small_1.1.imscc'

describe('manifest', function() {
  var manifest

  before(function (done) {
    parse(SMALL_CARTRIDGE)
      .on('imsmanifest.xml', function (data) {
        manifest = data
        done()
      })
  })

  it('has metadata', function () {
    assert(manifest.metadata)
    assert(manifest.metadata.schema)
    assert(manifest.metadata.schemaversion)
  })

  it('has organizations', function () {
    assert(manifest.organizations.organization)
  })

  it('has resources', function () {
    assert(manifest.resources.resource)
  })
})
