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

  public getStructuredTree(data: MultiselectInputData) {
    const { folders, items } = data;
    const folderMap = new Map();
    const roots: any = [];

    // Create folder nodes and store them in the map
    folders.data.forEach(folder => {
      const [id, title, parent_id] = folder;
      const node = {
        id,
        parentId: parent_id,
        label: title,
        children: [],
        isSelected: false,
        isIndeterminate: false,
        isExpanded: false,
      };

      folderMap.set(id, node);
    });

    // Establish parent-child relationships for folders
    folders.data.forEach(folder => {
      const [id, , parent_id] = folder;
      const node = folderMap.get(id);

      if (parent_id === null) {
        roots.push(node);
      } else {
        const parent = folderMap.get(parent_id);

        if (parent) {
          parent.children.push(node);
        }
      }
    });

    // Process items and add them to their respective folders
    items.data.forEach(item => {
      const [id, title, folder_id] = item;
      const itemNode = {
        id,
        parentId: folder_id,
        label: title,
        children: [],
        isSelected: false,
        isIndeterminate: false,
        isExpanded: false,
      };
      const parentFolder = folderMap.get(folder_id);

      if (parentFolder) {
        parentFolder.children.push(itemNode);
      }
    });

    return roots;
  }
}
