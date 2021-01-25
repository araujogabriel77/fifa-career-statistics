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

            // const fullFilePathName = path.join(tmpFolder.shield, fileHash);

            // request.on('aborted', () => {
            //     file.stream.on('end', () => {
            //         console.log('Cancel the upload')
            //         callback(new Error('Cancel.'), fileName);
            //     });
            //     file.stream.emit('end');
            // });

            return callback(null, fileName);
        }
    }),

}