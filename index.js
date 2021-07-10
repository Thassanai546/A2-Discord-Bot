const Database = require("@replit/database")
const Discord = require("discord.js")
const fs = require("fs")

const fetch = require("node-fetch")
const client = new Discord.Client()
const db = new Database()

const greetings = ["hey a2","hi a2","yo a2","hello a2","greetings a2","hiya a2","..yo a2","evening a2","morning a2","howdy a2"]

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

db.get("responding").then(value => { 
  // if run for the first time
  if (value == null) {
    db.set("responding", true)
  }
})

client.on("message", msg => {
  if (msg.author.bot) return

  db.get("responding").then(responding => {
    if(responding == true) {
      // When responding is enabled

      if (greetings.includes(msg.content)) {
        let greeting = greetings[Math.floor(Math.random() * greetings.length)]
        greeting = greeting.split(' ')[0]
        msg.channel.send(greeting + ' ' + msg.author.username)
      }

    }
  })

  if (msg.content === "$about name") {
    msg.channel.send(`*A2's name is a reference to the apocryphal last words of Julius Caesar, "et tu, Brute?" ("and you, Brutus?") spoken to his traitorous friend Brutus as the latter stabbed him. This line was made famous by Shakespeare's play Julius Caesar, though it did not originate with it. This is a twofold reference, both to her status as an alleged traitor and her own betrayal by YoRHa.*`)
  }

  if (msg.content === "$about") {
    let about_embed = new Discord.MessageEmbed()
    .setTitle("YoRHa Type A No.2")
    .setDescription("```A2 was part of the experimental YoRHa squadron deployed on the Pearl Harbor Descent Mission during the 14th Machine War. A2 ended up being the last survivor of the YoRHa squadron after the mission, causing her to be declared a traitor and deserter by YoRHa Command due to the secrecy of the prototype YoRHa line. A2 then spends an unknown amount of time surviving alone, driven on by vengeance to defeat any machines and YoRHa units she comes upon on the way.```")
    .setImage("https://github.com/Thassanai546/A2-Discord-Bot/blob/master/assets/gifs/about/53-corruption_(57).jpg?raw=true")
    .setURL("https://nier.fandom.com/wiki/YoRHa_Type_A_No.2")
    .addFields(
		  { name:'Occupation', value: 'YoRHa (Formerly)', inline: true },
      { name: 'Height', value: '168cm (including heels)', inline: true},
      { name: 'Weight', value: '139.2kg', inline: true },
    )
    msg.channel.send(about_embed)
  }

  if (msg.content.startsWith("$personality")) {
    msg.channel.send("A2 is initially depicted as mysterious and taciturn. However, it is eventually shown through her interactions with Pod 042 that she possesses an aggressive and fiery personality. She has a propensity towards reckless behavior as she will dive head-long into dangerous situations without consideration for strategic evaluations or her own personal safety. When speaking to others, she tends to be blunt, impatient and foul-mouthed.")
  }

  if (msg.content === "$gif") {
    msg.channel.send(getRandom('./assets/gifs/random/'))
  }

  if (msg.content.startsWith("$avatar")) {
    try {
      let member = msg.mentions.users.first();
      let avatar_embed = new Discord.MessageEmbed()
      .setAuthor(member.username)
      .setImage(member.avatarURL({ format: 'jpg', size: 512}));
      msg.channel.send(avatar_embed)
    } catch(err) {
      msg.channel.send("Sorry, I could not find that user.")
    }
  }

  // Allow users to toggle responding true/false
  if (msg.content.startsWith("$responding")) {
    value = msg.content.split("$responding ")[1]
    if (value.toLowerCase() == "true") {
      db.set("responding", true)
      msg.channel.send("Responding is on")
    }else{
      msg.channel.send("Responding is off")
      db.set("responding", false)
    }
  }

})

client.login(process.env['Tkn'])