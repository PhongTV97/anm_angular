import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  convertNumber(value) {
    value = this.clearComma(String(value))
    if (isNaN(Number(value)) || Number(value) === 0) {
      return 0
    }
    value = Number(value).toFixed(8)
    const cut = String(value).split('.')
    if (cut.length === 1) {
      value = Number(cut[0]).toLocaleString('en-US')
    } else {
      value = Number(cut[0]).toLocaleString('en-US') + '.' + cut[1].slice(0, 3)
    }
    return value
  }

  clearComma(str) {
    const regex = /,/gi
    return String(str).trim().replace(regex, '')
  }

}
