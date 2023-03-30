import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadScriptsService {

  constructor() { }
  load(files:string[]){
    for(let i = 0; i < files.length; i++){
      const node = document.createElement("script");
      node.src = files[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('body')[0].append(node);
    }
  }
}
