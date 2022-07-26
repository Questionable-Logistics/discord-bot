// Module imports
import 'dotenv/config'
import { REST } from '@discordjs/rest'
import { Routes } from 'discord-api-types/v9'





// Local imports
import { commands } from '../src/commands/index.js'
import { logger } from '../src/helpers/logger.js'





try {
	const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN)
	const route = Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID)

	await rest.put(route, {
		body: Object.values(commands).map(commandObject => {
			return commandObject.command.toJSON()
		}),
	})

	logger.info('Successfully registered application commands.')
} catch (error) {
	console.error(error)
}
