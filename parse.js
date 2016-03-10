var fs = require('fs')
var unzip = require('unzip')
var xmlParser = require('xml2json')

module.exports = function (filename, callback) {
  return fs.createReadStream(filename)
    .pipe(unzip.Parse())
    .on('entry', function (entry) {
      var fileName = entry.path
      var type = entry.type // 'Directory' or 'File'
      var size = entry.size
      if (fileName === 'imsmanifest.xml') {
        streamToString(entry, function (data) {
          json = xmlParser.toJson(data)
          this.emit('imsmanifest.xml', JSON.parse(json).manifest)
        }.bind(this))
      } else {
        entry.autodrain()
      }
    })
}

// http://stackoverflow.com/a/32565479/176758
function streamToString (stream, cb) {
  const chunks = []
  stream.on('data', (chunk) => {
    chunks.push(chunk)
  });
  stream.on('end', () => {
    cb(chunks.join(''))
  })
}
