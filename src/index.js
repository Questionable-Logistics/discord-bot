// Module imports
import 'dotenv/config'





// Local imports
import { API } from './structures/API.js'
import { Bot } from './structures/Bot.js'





// Start the bot
Bot.start()

// Start the web server
API.start()
