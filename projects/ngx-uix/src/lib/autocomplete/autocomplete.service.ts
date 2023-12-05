import { Injectable } from '@angular/core';
import { autocompleteAPIConfig } from './autocomplete.util';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UixAutocompleteService {

  constructor(private http: HttpClient) { }
  
  getFilteredData(config:autocompleteAPIConfig, apiUrl: string, query: string){
    const url = apiUrl.replace('{value}', query);
    const headers = config.headers || new HttpHeaders();
    const requestOptions = {
      headers,
    }
    return (config.apiType === 'http' ? this.requestHttpData(url, requestOptions, config) : this.requestJsonData(url)).pipe(
      map(res => {(Array.isArray(res) ? res : res ? [res] : []);
      }) )
  }

  private requestHttpData(url: string, requestOptions: Object, config: autocompleteAPIConfig){
    if (config.httpMethod === 'get'){
      return this.http.get(url, requestOptions);
    } else {
      return this.http[config.httpMethod](url, config.payload, requestOptions)
    }
  }

  private requestJsonData(url: string){
    return this.http.jsonp(url, 'defaultCallback');
  }
}