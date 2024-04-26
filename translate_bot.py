import logging
from telegram import Update
from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext
from googletrans import Translator

# Nastavení protokolování
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# Funkce pro překlad zprávy
def translate(update: Update, context: CallbackContext) -> None:
    # Získání textu zprávy
    text = update.message.text
    # Překlad textu do angličtiny
    translator = Translator()
    translated_text = translator.translate(text, dest='en').text
    # Odpověď na zprávu s přeloženým textem
    update.message.reply_text(translated_text)

def main() -> None:
    # Inicializace Updateru s přístupovým tokenem
    updater = Updater("6866398731:AAFF6JYBFZEpfvJbmMz8bURY3RRqR-2yWO0")
    # Nastavení dispatcheru
    dispatcher = updater.dispatcher
    # Registrace handleru pro příkaz /translate
    dispatcher.add_handler(MessageHandler(Filters.text & ~Filters.command, translate))
    # Spuštění bota
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
