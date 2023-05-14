import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<html><head></head>
    <body><h3> Hello! For test this API, you need use the /user endpoint</h3>
    <p>All instructions for test saved in README.md file, read it please</p>
    </body>
    </html>`;
  }
}
