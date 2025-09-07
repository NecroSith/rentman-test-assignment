import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MultiselectInputData, StructuredTree} from "../../models/multiselect.model";

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

    folders.data.forEach(folder => {
      const [id, title, parent_id] = folder;
      const node = {
        id,
        parentId: parent_id,
        label: title,
        children: [],
        isSelected: false,
        isIndeterminate: false,
        isExpanded: true,
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

    return this.getSortedTree(roots);
  }

  private getSortedTree(data: StructuredTree): StructuredTree {
    if (!data || data.length === 0) {
      return data;
    }

    const sortedData = [...data];

    sortedData.sort((a, b) => {
      if (a.label < b.label) return -1;
      if (a.label > b.label) return 1;
      return 0;
    });

    sortedData.forEach(node => {
      if (node.children && node.children.length > 0) {
        node.children = this.getSortedTree(node.children);
      }
    });

    return sortedData;
  }
}
