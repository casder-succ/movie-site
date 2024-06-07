import { extname } from 'node:path';

// eslint-disable-next-line import/named
import { path } from 'app-root-path';

import { Injectable } from '@nestjs/common';

import { Files } from './files.interface';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FilesService {
  async uploadFiles(files: Express.Multer.File[], folder: string = 'default'): Promise<Files[]> {
    const uploadFolder = `${path}/apps/api/public/uploads/${folder}`;

    await ensureDir(uploadFolder);

    const res: Files[] = await Promise.all(files.map(async (file, index) => {
      const fileName = this.getFileName(file.originalname, index.toString());

      await writeFile(`${uploadFolder}/${fileName}`, file.buffer);

      return {
        name: fileName,
        url: `/public/uploads/${folder}/${fileName}`,
      };
    }));

    return res;
  }

  getFileName(fileName: string, postFix?: string): string {
    const ext = extname(fileName);
    const timestamp = new Date().getTime();

    return `${timestamp}${postFix}${ext}`;
  }
}
