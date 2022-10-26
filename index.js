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

// тут фильмы

bot.command('film', async (ctx) => {
    try {
        await ctx.replyWithHTML(
            '<b> Выбирай жанр:) </b>',
            Markup.inlineKeyboard([
                [
                    Markup.button.callback('Ужасы', 'btn_1'),
                    Markup.button.callback('Комедии', 'btn_2'),
                    Markup.button.callback('Боевики', 'btn_3'),
                ],

                [
                    Markup.button.callback('Драмы', 'btn_4'),
                    Markup.button.callback('Триллеры', 'btn_5'),
                    Markup.button.callback('Фантастика', 'btn_6'),
                ],
            ]),
        )
    } catch (e) {
        console.log(e)
    }
})

// тут сериалы

bot.command('serial', async (ctx) => {
    try {
        await ctx.replyWithPhoto(
            'https://cs11.pikabu.ru/post_img/big/2019/09/22/10/1569175156186039656.jpg',
        )
    } catch (e) {
        console.log(e)
    }
})

// Универсальная функция для кнопки

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

// вызов кнопок

addActionBot('btn_1', false, text.textHorror)
addActionBot('btn_2', false, text.textComedies)
addActionBot('btn_3', false, text.textMilitants)
addActionBot('btn_4', false, text.textDrama)
addActionBot('btn_5', false, text.textThriller)
addActionBot('btn_6', false, text.textFantasy)

bot.on('message', async (ctx) => {
    await ctx.reply('Я не понимаю, нажми /help')
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
