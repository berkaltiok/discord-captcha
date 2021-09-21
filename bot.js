const { Client, Intents, MessageActionRow, MessageButton } = require('discord.js');
const { token } = require('./config.json');
const { shuffle, embed } = require("./util");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_INTEGRATIONS] });

client.on("ready", () => console.log(`Logged in as ${client.user.tag}!`));
client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "register") {
    let [buttonList, codeList] = [[], []];
    let fontList = [
      "lato",
      "lora",
      "montserrat",
      "open-sans",
      "oswald",
      "playfair-display",
      "pt-sans",
      "raleway",
      "roboto",
      "source-sans-pro"
    ]
    for (let i = 0; i < 8; i++) {
      let code = Math.random().toString(36).slice(-8).toUpperCase();
      codeList.push(code)
      buttonList.push(
        new MessageButton()
          .setStyle('PRIMARY')
          .setLabel(code)
          .setCustomId(`ACTION_${i === 0 ? 'SUCCESS' : 'ERROR_'+i}`)
      )
    }
    let buttonListShuffle = shuffle(buttonList);

    interaction.reply({
      embeds: [
        embed({ interaction }).setImage(`https://placehold.co/390x120@3x/2f3136/FFF.png?text=${codeList[0]}&font=${shuffle(fontList)[0]}`)
      ],
      components: [
        new MessageActionRow().addComponents(buttonListShuffle.slice(0, 4)),
        new MessageActionRow().addComponents(buttonListShuffle.slice(4, 8)),
      ],
    }).then(async () => {
      let error = () => {
        interaction.editReply({
          embeds: [embed({
            color: "#ED4245",
            interaction
          })],
          components: []
        });
      }
      let clickButton = false;
      let fetch = await interaction.fetchReply();

      fetch
        .createMessageComponentCollector({
          componentType: 'BUTTON',
          filter: (clicker) => clicker.user.id == interaction.user.id
        })
        .on('collect', async (button) => {
          if (button.customId === "ACTION_SUCCESS") {
            clickButton = true;
            interaction.editReply({
              embeds: [embed({
                color: "#57F287",
                interaction
              })],
              components: []
            });

            // Success Event
          } else {
            error();

            // Error Event
          }
        })

      setTimeout(() => !clickButton && error(), 60 * 1000)
    })
  }
});

client.login(token);
