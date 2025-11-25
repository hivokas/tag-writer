const { NFC } = require('nfc-pcsc');
const ndef = require('ndef');

const url = 'https://example.com';

console.log("Waiting for NFC tag...");
console.log("URL to write: ", url);

const nfc = new NFC();

nfc.on('reader', reader => {
    console.log("Reader detected: ", reader.reader.name);

    reader.autoProcessing = false;

    reader.on('card', async card => {
        console.log("Tag detected. Writing...");

        try {
            const msg = [ ndef.uriRecord(url) ];
            let data = Buffer.from(ndef.encodeMessage(msg));

            // Pad to 4 bytes for NTAG/Ultralight
            const pad = 4 - (data.length % 4 || 4);
            data = Buffer.concat([data, Buffer.alloc(pad, 0x00)]);

            await reader.write(4, data, 4);

            console.log("✔ URL written successfully!");
            process.exit(0);
        } catch (err) {
            console.error("Error writing tag:", err);
        }
    });
});