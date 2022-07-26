/**
 * Captalises the first character of a string.
 *
 * @param {string} string The string to be capitalised.
 * @returns {string} The capitalised string.
 */
export function capitalise(string) {
	const [firstCharacter, ...rest] = string.split('')

	return [
		firstCharacter.toUpperCase(),
		...rest,
	].join('')
}
