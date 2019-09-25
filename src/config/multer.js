import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (error, result) => {
        // se deu erro na geracao de bytes sobe para o callback do multer
        if (error) return callback(error);

        // se deu bom concatena os bytes em hex com a extencao do arquivo para o multer
        return callback(
          null,
          result.toString('hex') + extname(file.originalname)
        );
      });
    },
  }),
};
