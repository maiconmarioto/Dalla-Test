const path = require('path')
const funcs = require('./funcs')
const encodeName = funcs.encodeName

const session = {
  username: process.argv[2],
  lastMessageHash: process.argv[3]
}

if (!session.username || !session.lastMessageHash) {
  console.log('Usage: node index.js <username> <hash>')
  process.exit(0)
}

// 1. load the database
const dbFile = path.join(__dirname, 'db', 'index.json')
funcs.loadDb(dbFile, function (err, db) {

  // 2. encode the name
  const encoded = encodeName(session.username)

  // 3. find the user's inbox
  const inbox = funcs.findInbox(db, encoded)

  // 4. find the next message
  const nextMessage = funcs.findNextMessage(inbox, session.lastMessageHash)

  // 5. print out the message.
  // Paste the console output into the "Solution" field and you're done!
  console.log(nextMessage)
})

/*
  node index.js bigbird88 60b725f10c9c85c70d97880dfe8191b3
    from: @theRealElmo
    ---
    here's the message
*/

/*
  node index.js alice 3b5d5c3712955042212316173ccf37be
    from: @theRealElmo
    ---
    secret message from me to you
 */
