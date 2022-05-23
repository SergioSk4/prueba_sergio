import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/user/upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit {
  public fileName: string = '';
  public userName: string = '';
  public perfilResponse: any;
  public blob: any;
  public error: string = '';
  public uploadStatus: string = '';
  constructor(private userService: UploadService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((resp: any) => {
      this.userName = resp.nombre;
    });
  }

  uploadPdf(event: any) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file = fileList[0];
      this.error = '';
      let size = file.size / 1024 / 1024;
      this.fileName = file.name;

      if (file.type != 'application/pdf') {
        this.error = this.error + 'El archivo no es PDF; ';
        this.fileName = '';
      }

      if (size > 5) {
        this.error = this.error + 'El archivo no puede ser superior a 5MB; ';
        this.fileName = '';
      }

      if (!this.error) {
        this.userService.pdfUpload(file).subscribe(
          (event) => {
            if (event.type == HttpEventType.UploadProgress) {
              const percentDone = Math.round(
                (100 * event.loaded) / event.total!
              );
              this.uploadStatus = `Cargando archivo: ${percentDone}% cargado.`;
            } else if (event instanceof HttpResponse) {
              this.uploadStatus = `Archivo completamente cargado.`;
            }
          },
          (err) => {
            console.log('Upload Error:', err);
            this.uploadStatus = `Error al subier el archivo`;
          },
          () => {
            this.uploadStatus = `Archivo Subido`;
          }
        );
      }
    }
  }

  getPerfil() {
    this.userService.getUser().subscribe((resp: any) => {
      this.perfilResponse = resp;
    });
  }

  downloadPdf() {
    this.userService.getPdf().subscribe((data: any) => {
      var link = document.createElement('a');
      link.href = data.url;
      link.download = 'cv.pdf';
      link.click();
    });
  }
}
