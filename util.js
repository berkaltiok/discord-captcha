const { MessageEmbed } = require('discord.js');

exports.shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}
exports.embed = ({ color = '#5865F2', interaction }) => {
  return new MessageEmbed()
    .setColor(color)
    .setTitle("Choose The Correct Button")
    .setDescription("Vote for the server by clicking the button that\n is the same as the text in the picture, this process will be\n canceled after **60 seconds**.").setAuthor(interaction.user.username, interaction.user.avatarURL(), "https://github.com/berkaltiok")
    .setFooter("Discord Captcha Bot")
    .setTimestamp()
}