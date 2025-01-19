import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Request, Response } from 'express';

export default {
    dest: path.resolve(__dirname, '..', 'uploads'),
    storage: multer.diskStorage({
        destination: (req: Request, file: any, cb: any) => {
            cb(null, path.resolve(__dirname, '..', 'uploads'))
        },
        filename: (req: Request, file: any, cb: any) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                const fileName = `${hash.toString('hex')}-${file.originalname}`;

                cb(null, fileName);
            })
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req: Request, file: any, cb: any) => {
        const allowedMimes = [
            'image/png',
            'image/jpeg'
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        }
        else {
            cb(new Error("Tipo de arquivo inválido!"))
        }
    },
};