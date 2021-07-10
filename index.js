const Database = require("@replit/database")
const Discord = require("discord.js")
const fs = require("fs")

const fetch = require("node-fetch")
const client = new Discord.Client()
const db = new Database()

getRandom = (directory) => { 
  // Get a random file from a directory
  let files = fs.readdirSync(directory)
  let chosenFile = files[Math.floor(Math.random() * files.length)]
  return {files: [directory + chosenFile]}
}

client.on("ready", () => {
  console.log(`Unit ${client.user.tag} online`)
  client.user.setActivity('the machine war', {type: 'COMPETING'})
})

client.on("message", msg => {
  if (msg.author.bot) return

  if (msg.content === "$about name") {
    msg.channel.send(`*A2's name is a reference to the apocryphal last words of Julius Caesar, "et tu, Brute?" ("and you, Brutus?") spoken to his traitorous friend Brutus as the latter stabbed him. This line was made famous by Shakespeare's play Julius Caesar, though it did not originate with it. This is a twofold reference, both to her status as an alleged traitor and her own betrayal by YoRHa.*`)
  }

  if (msg.content === "$about") {
    msg.channel.send("```A2 was part of the experimental YoRHa squadron deployed on the Pearl Harbor Descent Mission during the 14th Machine War. A2 ended up being the last survivor of the YoRHa squadron after the mission, causing her to be declared a traitor and deserter by YoRHa Command due to the secrecy of the prototype YoRHa line. A2 then spends an unknown amount of time surviving alone, driven on by vengeance to defeat any machines and YoRHa units she comes upon on the way.```", getRandom('./assets/gifs/about/'))
  }

  if (msg.content === "hey a2") {
   msg.channel.send(`Hey ${msg.author.username}`)
  }

  if (msg.content === "$gif") {
    msg.channel.send(getRandom('./assets/gifs/random/'))
  }

  if (msg.content.startsWith("$avatar")) {
    try {
      let member = msg.mentions.users.first();
      let embed = new Discord.MessageEmbed()
      .setAuthor(member.username)
      .setImage(member.avatarURL({ format: 'jpg', size: 512}));
      msg.channel.send(embed)
    } catch(err) {
      msg.channel.send("Sorry, I could not find that user.")
    }
  }

})

client.login(process.env['Tkn'])