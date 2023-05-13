import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { jsPDF } from 'jspdf';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FilesService {
  async createImage(image): Promise<string> {
    try {
      const imageName = uuid.v4() + '.jpg';
      const imagePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath, { recursive: true });
      }
      fs.writeFileSync(path.join(imagePath, imageName), image.buffer);
      return imageName;
    } catch (e) {
      throw new HttpException(
        'Error upload file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generatePDF(user: User): Promise<string> {
    const doc = new jsPDF();
    doc.text(`${user.firstName} ${user.lastName}`, 10, 10);
    const imagePath = path.resolve(__dirname, '..', 'static', `${user.image}`);
    doc.addImage(imagePath, 'JPEG', 10, 10, 10, 10);
    return doc.output();
  }
}
