const { Telegraf, Markup } = require('telegraf')
require('node-telegram-bot-api')
require('dotenv').config()

const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN, { polling: true })

// база

bot.start((ctx) =>
    ctx.reply(
        `Привет ${
            ctx.message.from.first_name ? ctx.message.from.first_name : 'счастливчик'
        }, не знаешь что посмотреть? Тoгда жми /help`,
    ),
)
bot.help((ctx) => ctx.reply(text.commands))

// другие команды

bot.command('film', async (ctx) => {
    try {
        await ctx.replyWithHTML(
            '<b> Выбирай жанр:) </b>',
            Markup.inlineKeyboard([[Markup.button.callback('Ужасы', 'btn_1')]]),
            Markup.inlineKeyboard([[Markup.button.callback('Комедии', 'btn_2')]]),
            Markup.inlineKeyboard([[Markup.button.callback('Боевики', 'btn_3')]]),
            Markup.inlineKeyboard([[Markup.button.callback('Драмы', 'btn_4')]]),
            Markup.inlineKeyboard([[Markup.button.callback('Триллеры', 'btn_5')]]),
            Markup.inlineKeyboard([[Markup.button.callback('Фантастика', 'btn_6')]]),
        )
    } catch (e) {
        console.log(e)
    }
})

function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src !== false) {
                await ctx.replyWithPhoto({
                    source: src,
                })
            }
            await ctx.replyWithHTML(text, {
                disable_web_page_preview: true,
            })
        } catch (e) {
            console.log(e)
        }
    })
}

addActionBot('btn_1', false, text.textHorror)

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
