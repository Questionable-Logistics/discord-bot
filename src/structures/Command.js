// Module imports
import { SlashCommandBuilder } from '@discordjs/builders'





// Local imports
import { capitalise } from '../helpers/capitalise.js'
import { logger } from '../helpers/logger.js'





/**
 * Wraps functionality for a Discord slash command.
 */
export class Command {
	/****************************************************************************\
	 * Private instance properties
	\****************************************************************************/

	#options = {}





	/****************************************************************************\
	 * Public instance properties
	\****************************************************************************/

	command = null

	// eslint-disable-next-line jsdoc/require-jsdoc
	execute = () => logger.error('No execution method set.')





	/****************************************************************************\
	 * Constructor
	\****************************************************************************/

	/**
	 * Creates a new Command.
	 *
	 * @param {object} options All options
	 */
	constructor(options) {
		this.$options = options
		this.execute = this.#options.execute.bind(this)
		this.#build()
	}





	/****************************************************************************\
	 * Public instance methods
	\****************************************************************************/

	/**
	 * Builds the command.
	 */
	#build() {
		this.command = new SlashCommandBuilder
		this.command.setName(this.name)
		this.command.setDescription(this.description)

		if (this.#options) {
			this.#options.forEach(optionConfig => {
				const optionHandler = `add${capitalise(optionConfig.type)}Option`

				this.command[optionHandler](option => {
					option.setName(optionConfig.name)
					option.setDescription(optionConfig.description)

					if (optionConfig.choices) {
						optionConfig.choices.forEach(choice => {
							option.addChoice(...choice)
						})
					}

					if (optionConfig.isRequired) {
						option.setRequired(true)
					}

					return option
				})
			})
		}
	}





	/****************************************************************************\
	 * Getters
	\****************************************************************************/

	/**
	 * @returns {string} The description that will be shown in Discord's autocomplete.
	 */
	get description() {
		return this.#options.description
	}

	/**
	 * @returns {string} The name that will be used to invoke this command.
	 */
	get name() {
		return this.#options.name
	}

	/**
	 * @returns {object} An object representing all of the options this command can receive.
	 */
	get options() {
		return this.#options.options
	}
}
