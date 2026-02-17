export const sendMessageSettings = (keyboards) => ({
  parse_mode: "Markdown",
  reply_markup: {
    resize_keyboard: true,
    keyboard: keyboards,
  },
  disable_web_page_preview: true,
});
