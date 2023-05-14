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
      //Generate name for new image
      const imageName = uuid.v4() + '.jpg';
      //Path for save image
      const imagePath = path.resolve(__dirname, '..', 'images');
      //Create folder, if it not exists
      if (!fs.existsSync(imagePath)) {
        fs.mkdirSync(imagePath, { recursive: true });
      }
      //Write image to folder for save
      fs.writeFileSync(path.join(imagePath, imageName), image.buffer);
      //Return image name for save it in db
      return imageName;
    } catch (e) {
      throw new HttpException(
        'Error upload file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async generatePDF(user: User): Promise<string> {
    //Create new pdf file
    const doc = new jsPDF();
    //Insert in new pdf file first and last name of user
    doc.text(`${user.firstName} ${user.lastName}`, 10, 10);
    //Read path for user image
    const imagePath = path.resolve(__dirname, '..', 'static', `${user.image}`);
    //Add user image to new dpf file
    doc.addImage(imagePath, 'JPEG', 10, 10, 10, 10);
    //Return new pdf in binary type
    return doc.output();
  }
}
