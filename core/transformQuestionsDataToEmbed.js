const { EmbedBuilder } = require('discord.js');
const moment = require('moment-timezone');

function parseOptionsReverse (arrayOptions) {
	return arrayOptions.map(option => `${option.emoji} - ${option.text}`).join('\n');
}

module.exports = function transformQuestionsDataToEmbed (data, includeStatusAndDates) {
  const questionEmbed = new EmbedBuilder()
    .setColor('Random')
    .setTitle(data.question)
    .setDescription(`${data.description ? data.description : ''}\n\n${parseOptionsReverse(data.options)}\n\n${data.footer ? `_${data.footer}_` : ''}`)
    
  if (includeStatusAndDates) questionEmbed.addFields(
    {
      name: 'Situação', 
      value: ['Em análise', 'Negada', 'Aceita'][data.status], 
      inline: true
    },
    {
      name: 'Data de Criação', 
      value: data.createdAt ? `<t:${moment(data.createdAt).add(3, 'hours').unix()}:R>` : `<t:${moment().unix()}:R>`, 
      inline: true
    },
    {
      name: 'Data de Envio', 
      value: data.sentAt ? `<t:${moment(data.sentAt).unix()}:R>` : '-', 
      inline: true
    }
  );

  return questionEmbed;
}
