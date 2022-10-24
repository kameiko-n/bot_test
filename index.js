const TelegramApi = require('node-telegram-bot-api')

const token = '5752966771:AAFJQcxEDU6In-GxEiiJd7xG1kt1PCE815o'

const bot = new TelegramApi(token, { polling: true })

const srart = () => {
    bot.setMyCommands([
        { command: '/start', description: 'начало работы' },
        { command: '/info', description: 'информация' },
    ])

    bot.on('message', async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id

        if (text === '/start') {
            return bot.sendMessage(chatId, 'go')
        }

        if (text === '/info') {
            return bot.sendMessage(chatId, 'dobro pojalovat')
        }
    })
}

srart()
