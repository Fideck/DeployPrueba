import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Cloudinary} from "../interfaces/cloudinary";

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService implements OnInit{
  constructor(private _httpClient:HttpClient) { }

  uploadPicture(file:File){
    const cloudUrl = "https://api.cloudinary.com/v1_1/dsgf3i8sw/upload";
    const formData = new FormData();
    formData.append("upload_preset", "react-journal");
    formData.append("file", file);
    return this._httpClient.post<Cloudinary>(cloudUrl, formData)
  }

  ngOnInit() {

  }

}
