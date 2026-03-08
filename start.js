import { getAvailableEvents } from "../../db/events.repository.js";
import { botTexts, keyboards, messages } from "../../shared/constants.js";
import { sendMessageSettings } from "../../shared/utils.js";
import { bot } from "../bot.js";

export const startHandler = () => {
  bot.onText(/\/start/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      botTexts.welcome,
      sendMessageSettings(keyboards.main),
    );
  });

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    switch (text) {
      case messages.back:
        bot.sendMessage(
          chatId,
          botTexts.welcome,
          sendMessageSettings(keyboards.main),
        );
        break;

      case messages.forFighters:
        bot.sendMessage(
          chatId,
          botTexts.fightersPreview,
          sendMessageSettings(keyboards.fighters),
        );
        break;

      case messages.forViewers:
        bot.sendMessage(
          chatId,
          botTexts.viewersPreview,
          sendMessageSettings(keyboards.viewers),
        );
        break;

      case messages.premiumClub:
        bot.sendMessage(
          chatId,
          botTexts.premiumClub,
          sendMessageSettings(keyboards.justBack),
        );
        break;

      case messages.supportProject:
        bot.sendMessage(
          chatId,
          botTexts.donation,
          sendMessageSettings(keyboards.justBack),
        );
        break;

      case messages.fightersInfo:
        bot.sendMessage(
          chatId,
          botTexts.fightersInfo,
          sendMessageSettings(keyboards.fighters),
        );
        break;

      case messages.submitApplication:
        bot.sendMessage(
          chatId,
          botTexts.fightersRequest,
          sendMessageSettings(keyboards.fighters),
        );
        break;

      case messages.trainingFights:
        bot.sendMessage(
          chatId,
          botTexts.fightersTraining,
          sendMessageSettings(keyboards.fighters),
        );
        break;

      case messages.viewersInfo:
        bot.sendMessage(
          chatId,
          botTexts.viewersInfo,
          sendMessageSettings(keyboards.viewers),
        );
        break;

      case messages.viewersEvents:
        bot.sendMessage(
          chatId,
          botTexts.viewersEvents,
          sendMessageSettings(keyboards.viewers),
        );
        break;

      case messages.viewersTickets:
        (async () => {
          try {
            const events = await getAvailableEvents();

            if (events.length === 0) {
              bot.sendMessage(
                chatId,
                botTexts.noTickets,
                sendMessageSettings(keyboards.viewers),
              );
              return;
            }

            let text = botTexts.availableFights;

            events.forEach((event) => {
              console.log(event);
              const date = new Date(event.event_date);
              const formattedDate = `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`;
              text += `${formattedDate} (${event.tickets_left} билетов) - [Купить билет](https://example.com?date=${event.event_date}\n`;
            });

            bot.sendMessage(
              chatId,
              text,
              sendMessageSettings(keyboards.viewers),
            );
          } catch (err) {
            console.error(err);
            bot.sendMessage(
              chatId,
              botTexts.error,
              sendMessageSettings(keyboards.viewers),
            );
          }
        })();
        break;
    }
  });
};
