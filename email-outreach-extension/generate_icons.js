const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPNG(width, height, r, g, b) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // 8-bit depth
  ihdr.writeUInt8(6, 9); // RGBA
  ihdr.writeUInt8(0, 10); // deflate
  ihdr.writeUInt8(0, 11); // no filter
  ihdr.writeUInt8(0, 12); // no interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw Image Data (with filter byte 0 at start of each scanline)
  const rowSize = width * 4 + 1;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData.writeUInt8(0, rowOffset); // filter: None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      // Draw rounded icon border / gradient
      const cx = width / 2;
      const cy = height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const maxR = width / 2;

      // Outer background: luxury violet-indigo #6366f1 to #4338ca
      if (dist <= maxR * 0.95) {
        // Simple envelope glyph logic
        const relX = (x - cx) / (width * 0.4);
        const relY = (y - cy) / (height * 0.35);
        const inEnvelope = Math.abs(relX) < 1 && Math.abs(relY) < 0.75;
        const isLetterFold = Math.abs(relX) < 0.9 && Math.abs(relY - (Math.abs(relX) * 0.6 - 0.4)) < 0.15;

        if (isLetterFold) {
          rawData.writeUInt8(255, pixelOffset);     // White accent
          rawData.writeUInt8(255, pixelOffset + 1);
          rawData.writeUInt8(255, pixelOffset + 2);
          rawData.writeUInt8(255, pixelOffset + 3);
        } else if (inEnvelope) {
          rawData.writeUInt8(240, pixelOffset);     // White / light silver
          rawData.writeUInt8(245, pixelOffset + 1);
          rawData.writeUInt8(255, pixelOffset + 2);
          rawData.writeUInt8(255, pixelOffset + 3);
        } else {
          // Vibrant Royal Blue / Indigo gradient
          rawData.writeUInt8(79, pixelOffset);
          rawData.writeUInt8(70, pixelOffset + 1);
          rawData.writeUInt8(229, pixelOffset + 2);
          rawData.writeUInt8(255, pixelOffset + 3);
        }
      } else {
        // Transparent outside circle
        rawData.writeUInt8(0, pixelOffset);
        rawData.writeUInt8(0, pixelOffset + 1);
        rawData.writeUInt8(0, pixelOffset + 2);
        rawData.writeUInt8(0, pixelOffset + 3);
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);

  // IEND
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const crcBody = Buffer.concat([typeBuf, data]);

  const crcVal = Buffer.alloc(4);
  crcVal.writeUInt32BE(crc32(crcBody), 0);

  return Buffer.concat([len, crcBody, crcVal]);
}

const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

[16, 48, 128].forEach(size => {
  const png = createPNG(size, size, 79, 70, 229);
  fs.writeFileSync(path.join(iconsDir, `icon${size}.png`), png);
  console.log(`Generated icon${size}.png`);
});
