// Local imports
import eightBall from './8ball.js'
import ping from './ping.js'





export const commands = [
	eightBall,
	ping,
].reduce((accumulator, command) => {
	accumulator[command.name] = command
	return accumulator
}, {})
