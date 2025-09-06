import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MultiselectInputData} from "../../models/multiselect.model";

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private readonly baseUrl = environment.baseUrl;

  constructor(private readonly http: HttpClient) { }

  public loadMultiselectData(): Observable<MultiselectInputData> {
    return this.http.get<MultiselectInputData>(`${this.baseUrl}/data/response.json`);
  }

  public getStructuredData(data: MultiselectInputData) {
    let result: any = [];

    data.folders.data.forEach(item => {
      // Check if parent id is null, means it's a top level item
      if (!item[2]) {
        return {
          id: item[0],
          label: item[1],
          children: []
        };
      }

      const parent = result.find((parent: { id: number; }) => parent.id === item[2]);

      if (parent) {
        parent.children.push({
          id: item[0],
          label: item[1]
        });
      }
    });

    return result;
  }
}
