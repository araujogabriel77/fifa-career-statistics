import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = {
    root: path.resolve(__dirname, '..', '..', 'tmp'),
    shield: path.resolve(__dirname, '..', '..', 'tmp', 'shield')
};

export default {
    directory: tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder.shield,
        filename(request, file, callback) {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        }
    }),

}