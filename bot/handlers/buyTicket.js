import { bot } from "../bot.js";
import { getAvailableEvents } from "../../db/events.repository.js";

export const buyTicketHandler = () => {
  bot.on("message", async (msg) => {
    if (msg.text !== "🎟 Купить билет") return;

    const events = await getAvailableEvents();

    if (!events.length) {
      return bot.sendMessage(msg.chat.id, "Билетов нет 😢");
    }

    const keyboard = events.map((e) => [
      {
        text: `${e.event_date} (осталось ${e.tickets_left})`,
        callback_data: `buy_${e.id}`,
      },
    ]);

    bot.sendMessage(msg.chat.id, "Выберите дату:", {
      reply_markup: { inline_keyboard: keyboard },
    });
  });
};
