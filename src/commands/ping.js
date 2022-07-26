// Local imports
import { Command } from '../structures/Command.js'





export default new Command({
	name: 'ping',
	description: 'Replies with pong!',

	/**
	 * Immediately replies with 'Pong!' Useful for testing that the bot is successfully accepting and responding to messages.
	 *
	 * @param {import('discord-api-types').interaction} interaction
	 */
	async execute(interaction) {
		await interaction.reply('Pong!')
	},
})
