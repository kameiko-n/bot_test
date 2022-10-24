const { Telegraf, Markup } = require('telegraf')
require('node-telegram-bot-api')
require('dotenv').config()

const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN, { polling: true })

bot.start((ctx) =>
    ctx.reply(`Hello ${ctx.message.from.first_name ? ctx.message.from.first_name : 'unknown'}`),
)

bot.help((ctx) => ctx.reply(text.commands))

bot.command('course', async (ctx) => {
    try {
        await ctx.replyWithHTML(
            '<b> bla bla </b>',
            Markup.inlineKeyboard([[Markup.button.callback('редакторы', 'btn_1')]]),
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

addActionBot('btn_1', false, text.text)

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
