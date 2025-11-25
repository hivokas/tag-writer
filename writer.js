const { NFC } = require('nfc-pcsc');

const url = 'https://example.com';

console.log("Waiting for NFC tag...");
console.log("URL to write: ", url);

const nfc = new NFC();

nfc.on('reader', reader => {
    console.log("Reader detected: ", reader.reader.name);

    reader.autoProcessing = false;

    reader.on('card', async card => {
        console.log("Tag detected...");
    });
});