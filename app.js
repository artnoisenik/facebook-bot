'use strict'
const http = require('http')
const Bot = require('messenger-bot')

let bot = new Bot({
  token: 'EAAPSixEWncwBAC09h4L5ynrHZB2U9cPDajE1jYwo0LZAwtMl9eapoDdYGiniLccRevesjppHpGfNsXBrZC8nyROCQnREW6BTwKrZBlrjPFKkNrQXD1RZAkpFiP3wDA5XAhU4zZBbeAZB6PylvuvbZA4oCA2iVZBqhtAJS7lgTJj3jNQZDZD',
  verify: 'VERIFY_TOKEN'
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
})

http.createServer(bot.middleware()).listen(3000)
