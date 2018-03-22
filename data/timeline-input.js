const fs = require('fs')
const readline = require('readline')

const readlinePromise = (title) => new Promise((resolve, reject) => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	rl.question(title, (anwser) => {
		resolve(anwser)
		rl.close()
	})
})

const main = async () => {
	const event = {}

	let defaultFilename = 'explorers'
	let filename = await readlinePromise(`Enter filename (${defaultFilename}): `)
	if (!filename.length) filename = defaultFilename

	const data = JSON.parse(fs.readFileSync(`${filename}.json`, 'utf8'))

	const title = await readlinePromise('Enter the title: ')
	if (title.length) event.title = title
	else {
		console.error('No title')
		process.exit(1)
	}

	const date = await readlinePromise('Enter the date (yyyy/mm/dd): ')
	if (date !== '' && !isNaN(Date.UTC(...date.split('/')))) {
		event.date = Date.UTC(...date.split('/'))
		console.log(new Date(event.date).toUTCString())
	} else {
		console.error('Invalid date')
		process.exit(1)
	}


	const endDate = await readlinePromise('Enter the end date (yyyy/mm/dd): ')
	if (endDate !== '' && !isNaN(Date.UTC(...endDate.split('/')))) {
		event.endDate = Date.UTC(...endDate.split('/'))
		console.log(new Date(event.endDate).toUTCString())

		if (event.endDate < event.date) {
			console.error('End date should be greater than start date')
			process.exit(1)
		}
	}


	const OK = await readlinePromise(`Is this OK?\n${JSON.stringify(event, null, 2)}\n(yes)`)
	if (OK.toLowerCase() === 'y' || OK === '') {
		data.push(event)
		fs.writeFileSync(`${filename}.json`, JSON.stringify(data), 'utf8')
	}
}

main()
