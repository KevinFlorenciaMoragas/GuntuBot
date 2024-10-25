require('dotenv').config();
const Discord = require('discord.js')
const { REST, Routes } = require('discord.js')
const responseList = ["Calla Maricón", "Dune es basura", "Is This the altar","Agujero del coño"];
const token = process.env.CLIENT_TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
})
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})
const rest = new REST({ version: "10" }).setToken(token)
const commands = [
    {
        name: 'mensaje_tts',
        description: 'Mensaje en TTS'
    },
    {
        name: 'mensaje',
        description: 'Mensaje de texto'
    }
]
client.on('interactionCreate', async (interaction) => {
    const number = Math.floor(Math.random() * responseList.length)
    const response = responseList[number]
    try{
        if(!interaction.isCommand()) return;
        if(interaction.commandName === "mensaje"){
            await interaction.reply({content: response , tts:false})
        }
        if(interaction.commandName === "mensaje_tts"){
            await interaction.reply({content: response , tts:true})
        }
    }catch(err){
        console.log({err: err.message})
    }
})
async function registerCommand() {
    try {
        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
        console.log("Successfully reloaded application (/) commands.");

    } catch (error) {
        console.log({ error: error.message })
    }
}
registerCommand()
client.login(token)