const glob = require('glob')
const fs = require('fs')

const rss = require('./rss')
;(async () => {
  const files = glob.sync(`${__dirname}/../out/*.json`)
  const fileContents = files.map(f => JSON.parse(fs.readFileSync(f).toString()))

  const data = {}
  files.forEach((f, index) => {
    const name = f.split('/')[f.split('/').length - 1].replace('.json', '')
    data[name] = fileContents[index]
  })

  data.data_updated = fs.statSync(`${__dirname}/../out/data.json`).mtime

  const rssResult = rss(data)
  fs.writeFileSync(`${__dirname}/../out/feed_items.json`, rssResult.feed_items)
  fs.writeFileSync(`${__dirname}/../out/feed.xml`, rssResult.feed_xml)
})()
