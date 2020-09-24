//Imports
const fs = require('fs')
const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')
const { argv } = require('process')
const { command } = require('yargs')

//Customize yargs version
yargs.version('1.5.0')

//configure help
yargs.help(false)

//List app commands
const commandList = () => {
    function Command(name, description, example) {
        this.name = name
        this.description = description
        this.example = example
    }
    const addCommand = new Command('add', 'add a note', 'node app.js add --title=\"Your note title\" --body=\"Your note description\"')
    const removeCommand = new Command('remove', 'Delete a note', 'node app.js remove --title=\"Your note title\"')
    const readCommand = new Command('read', 'Read a specific a note', 'node app.js read --title=\"Your note title\"')
    const listCommand = new Command('list', 'Present a list of all notes', 'node app.js list')
    const helpCommand = new Command('help', 'Present a list of all the commands available', 'node app.js help')
    const removeAllCommand = new Command('clear','Remove/Clear all notes','node app.js clear')
    const commandArray = [addCommand, removeCommand, readCommand, listCommand,removeAllCommand,helpCommand]
    console.log('\n* ' + chalk.green.bold('Commands') + ' *\n')
    commandArray.forEach((command) => {
        console.log(chalk.yellow.bold('Command: ') + chalk.green(command.name))
        console.log(chalk.yellow.bold('Description: ') + chalk.green(command.description))
        console.log(chalk.yellow.bold('Example: ') + chalk.green(command.example + '\n'))
    })
}



//run command
if (yargs.argv._.length === 0) {
    console.log(chalk.cyan.bold('\nWelcome to Notes App'))
    commandList()
}

//Help command
yargs.command({
    command:'help',
    describe:'Display all commands',
    handler(){
        commandList()
    }
})



//Add notes, remove, read, list


//Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

//Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

//Remove all notes command
yargs.command({
    command: 'clear',
    describe: 'Remove all notes',
    handler(){
        notes.removeAllNotes()
    }
})

//Create read command
yargs.command({
    command: 'read',
    describe: 'Reads a note',
    builder: {
        title: {
            describe: 'note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})

//List Notes
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.getNotes()
    }
})

//Parse
yargs.parse()
//console.log(yargs.argv)