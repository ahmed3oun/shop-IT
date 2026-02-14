const ErrorHandler = require("./errorHandler");
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');


const createFile = async (fileData, folder = 'avatar' | 'product') => {

    const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        // return res.status(400).json({ message: 'Invalid base64 data' });
        throw new ErrorHandler('Invalid base64 data', 400)
    }

    const mimeType = matches[1]; // e.g., image/jpeg
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    const extension = mimeType.split('/')[1];

    const appDir = path.dirname(require.main.filename);
    const uploadDir = path.join(appDir, 'uploads');
    await fs.mkdir(uploadDir, { recursive: true });
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
    const fileName = `${folder}-${uniqueSuffix}.${extension}`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);
    return filePath;
}

module.exports = createFile;