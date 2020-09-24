//Imports
const fs = require('fs')
const chalk = require('chalk')
//Get Notes
const getNotes = () => {
    const notes = loadNotes()
    if (notes.length > 0) {
        console.log(chalk.cyan.bold('\nNotes App\n'))
        notes.forEach((note) => {
            console.log('* ' + chalk.yellow.bold(note.title) + ' *')
            console.log(chalk.green(note.body) + '\n')
        })
    } else {
        console.log(chalk.bgRed.white.bold("There are no notes..."))
    }
}

//Get a note
const readNote = (title) => {
    const allNotes = loadNotes()
    const note = allNotes.filter((note) => note.title === title)
    if (note.length === 0) {
        console.log(chalk.bgRed.bold('Title not found...'))
    } else {
        console.log('\n* ' + chalk.yellow.bold(note[0].title) + ' *')
        console.log(chalk.green(note[0].body) + '\n')
        
    }
}
//Add a Note
const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    })

    //Validate if i already have a note with that same title
    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.bgGreen.black('New note added...'))
    } else {
        console.log(chalk.bgRed.bold('Note title taken...'))
    }

    saveNotes(notes)
}

//Remove a note
const removeNote = (title) => {
    const notes = loadNotes()

    const newNotes = notes.filter((note) => {
        return note.title !== title
    })

    //Check if the length change to validate if tha note was there
    if (notes.length === newNotes.length) {
        console.log(chalk.bgRed.bold('Title not found...'))
    } else {
        saveNotes(newNotes)
        console.log(chalk.bgGreen.black('Note removed...'))
    }
}

//Remove all notes
const removeAllNotes = () => {
    saveNotes([])
    console.log(chalk.bgGreen.black('All notes removed...'))
}

const saveNotes = (notes) => {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync('notes.json').toString()
        const data = JSON.parse(dataJSON)
        return data
    } catch (error) {
        return []
    }

}

module.exports = {
    getNotes,
    addNote,
    removeNote,
    readNote,
    removeAllNotes
}