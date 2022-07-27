// Module imports
import fetch from 'node-fetch'
import { MessageEmbed } from 'discord.js'





// Local imports
import { Command } from '../structures/Command.js'
import { logger } from '../helpers/logger.js'





export default new Command({
	// Meta
	name: '8ball',
	description: 'Ask the Magic 8-ball a question and it may tell you your fortune...',
	options: [
		{
			name: 'query',
			description: 'Your question for the Magic 8-ball',
			type: 'string',
			isRequired: true,
		},
	],

	/**
	 * Retrieves a magic 8ball response from a REST API, then returns the results of that response.
	 *
	 * @param {import('discord-api-types').interaction} interaction The interaction object.
	 */
	async execute(interaction) {
		interaction.deferReply()

		const query = interaction.options.getString('query')

		const magicResponse = await fetch(`https://8ball.delegator.com/magic/JSON/${query}`)
    const { magic } = await magicResponse.json()

    let emoji = null

    switch (magic.type) {
      case 'Affirmative':
        emoji = '😁'
        break

      case 'Contrary':
        emoji = '😬'
        break

      case 'Neutral':
        emoji = '🤔'
        break

			default:
				logger.error('Received an unrecognised response type.')
    }

		logger.info(`Received query: ${query}`)

		const response = new MessageEmbed
		response.setColor('#cf5ad9')
		response.setTitle('🔮 The Magic 8-ball says...')
		response.setDescription(`${magic.answer}. ${emoji}`)
		response.setFooter({
			text: query.slice(0, 2048),
		})

		await interaction.editReply({ embeds: [response] })
	},
})
