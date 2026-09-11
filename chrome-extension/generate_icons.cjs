const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createSolidPNG(width, height, r, g, b, a = 255) {
  // Row data: 1 byte filter type (0 = none) + width * 4 bytes RGBA
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      // Draw a gold scale or nice navy/gold emblem
      const isBorder = x === 0 || x === width - 1 || y === 0 || y === height - 1;
      const isCenter = Math.abs(x - width/2) < width/3 && Math.abs(y - height/2) < height/3;
      if (isBorder) {
        rawData[pxOffset] = 255;
        rawData[pxOffset + 1] = 184;
        rawData[pxOffset + 2] = 0;
        rawData[pxOffset + 3] = 255;
      } else if (isCenter) {
        rawData[pxOffset] = 255;
        rawData[pxOffset + 1] = 200;
        rawData[pxOffset + 2] = 50;
        rawData[pxOffset + 3] = 255;
      } else {
        rawData[pxOffset] = r;
        rawData[pxOffset + 1] = g;
        rawData[pxOffset + 2] = b;
        rawData[pxOffset + 3] = a;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);

  function makeChunk(type, data) {
    const len = data.length;
    const buf = Buffer.alloc(8 + len + 4);
    buf.writeUInt32BE(len, 0);
    buf.write(type, 4, 4, 'ascii');
    data.copy(buf, 8);
    const crc = zlib.crc32(buf.subarray(4, 8 + len));
    buf.writeUInt32BE(crc, 8 + len);
    return buf;
  }

  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // Bit depth
  ihdrData[9] = 6; // Color type: RGBA
  ihdrData[10] = 0; // Compression
  ihdrData[11] = 0; // Filter
  ihdrData[12] = 0; // Interlace
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const outDir = path.join(__dirname, 'icons');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Deep Navy (#0B192C) with Gold motif
const sizes = [16, 48, 128];
sizes.forEach(size => {
  const pngBuf = createSolidPNG(size, size, 11, 25, 44, 255);
  const filePath = path.join(outDir, `icon-${size}.png`);
  fs.writeFileSync(filePath, pngBuf);
  console.log(`Generated ${filePath} (${size}x${size}, ${pngBuf.length} bytes)`);
});
