"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotp = void 0;
const crypto_1 = require("crypto");
const getCounter = (value) => Buffer.from(`${value.toString(16)}`.padStart(16, "0"), "hex");
const sha1HotpTrunc = (hash) => {
    const offset = hash[hash.length - 1] & 0xf;
    const otp0 = (hash[offset + 0] & 0x7f) << 24;
    const otp1 = (hash[offset + 1] & 0xff) << 16;
    const otp2 = (hash[offset + 2] & 0xff) << 8;
    const otp3 = hash[offset + 3] & 0xff;
    return (otp0 | otp1 | otp2 | otp3) % 10 ** 6;
};
// inspired by https://github.com/hectorm/otpauth/blob/dbc3f255448ba692f987bbcabd47d6fe4a08200b/src/utils.js
const b32ToBuffer = (b32Str) => {
    const str = b32Str.toUpperCase().replace(/=+$/, "");
    const buf = Buffer.alloc(((str.length * 5) / 8) | 0);
    let [bitCounter, holding, bufferCursor] = [0, 0, 0];
    for (const c of str) {
        const idx = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".indexOf(c);
        if (idx === -1) {
            throw new TypeError(`bad character: ${c}`);
        }
        holding = (holding << 5) | idx;
        bitCounter = bitCounter + 5;
        if (bitCounter >= 8) {
            buf[bufferCursor] = (holding >>> (bitCounter - 8)) & 255;
            bufferCursor = bufferCursor + 1;
            bitCounter = bitCounter - 8;
        }
    }
    return buf;
};
const getTotp = (b32Key, tIn) => {
    const t = tIn === undefined ? Math.floor(Date.now() / 1000 / 30) : tIn;
    const hash = crypto_1.createHmac("sha1", b32ToBuffer(b32Key))
        .update(getCounter(t))
        .digest();
    return `${sha1HotpTrunc(hash)}`.padStart(6, "0");
};
exports.getTotp = getTotp;
//# sourceMappingURL=totp.js.map