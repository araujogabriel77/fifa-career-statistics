import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = {
    root: path.resolve(__dirname, '..', '..', 'tmp'),
    avatar: path.resolve(__dirname, '..', '..', 'tmp', 'avatar')
};

export default {
    directory: tmpFolder,

    storage: multer.diskStorage({
        destination: tmpFolder.avatar,
        filename(request, file, callback) {
            try {
                const fileHash = crypto.randomBytes(10).toString('hex');
                const fileName = `${fileHash}-${file.originalname}`;

                return callback(null, fileName);
            } catch (error) {
                callback(error, error.message);
            }

        }
    })
}