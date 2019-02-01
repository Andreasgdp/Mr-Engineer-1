const Discord = module.require('discord.js')

module.exports.run = async (bot, message, args) => {
  let rUser = message.mentions.members.first() || message.guild.members.get(args[0])
  if (!rUser) return message.channel.send("Couldn't find user!")
  let reason = args.join(' ').slice(22)

  let reportEmbed = new Discord.RichEmbed()
    .setDescription('Reports')
    .setColor('#15f153')
    .addField('Reported User,', `${rUser} with ID: ${rUser.id}`)
    .addField('Reported by:', `${message.author} with ID: ${message.author.id}`)
    .addField('Channel', message.channel)
    .addField('Time', message.createdAt)
    .addField('Reason', reason)

  if (!message.guild.channels.find(`name`, 'reports')) {
    await message.guild.createChannel('reports', 'text')
  }
  let reportsChannel = message.guild.channels.find(`name`, 'reports')
  if (!reportsChannel) return message.channel.send("Couldn't find reports channel!")

  reportsChannel.send(reportEmbed)
}

module.exports.help = {
  name: 'report'
}