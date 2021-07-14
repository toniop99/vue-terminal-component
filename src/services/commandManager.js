export function commandManager (command) {
  const availableCommands = {
    help: {
      name: 'help',
      description: 'list all availables commands on the terminal',
      execute: () => {
        let commandList = ''
        Object.keys(availableCommands).forEach(key => {
          commandList += `
            <div>
              Name: <b>${availableCommands[key].name}</b> - Description: <b>${availableCommands[key].description}</b>
            </div>`
        })

        return {
          text: `
            <div>This is a list of all available commands:</div>
            ${commandList}
          `,
          color: 'white',
          allowHtml: true,
          additionalStyles: { marginTop: '20px' }
        }
      }
    },
    creat0r: {
      name: 'creator',
      description: 'The creator of this beautiful terminal',
      execute: () => {
        return {
          text:
          'My creator is <a href="https://github.com/toniop99" target="_blank">github/toniop99</a>',
          color: 'green',
          allowHtml: true
        }
      }
    },
    projects: {
      name: 'projects',
      description: 'A list of all my personal projects',
      execute: () => {
        return {
          text:
          'In construction',
          color: 'orange',
          allowHtml: false
        }
      }
    }

  }

  if (!availableCommands[command]) {
    return {
      text: `Unknown command: ${command} | Try help for a list of commands`,
      color: 'red'
    }
  }

  return availableCommands[command].execute()
}
