import {Component, OnDestroy, OnInit} from '@angular/core';
import {StructuredTree, TreeItem} from "../../models/multiselect.model";
import {Subject, takeUntil} from "rxjs";
import {FiltersService} from "../../services/api/filters.service";

@Component({
  selector: 'rman-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrl: './multiselect.component.scss',
  standalone: false,
})
export class MultiselectComponent implements OnInit, OnDestroy {
  data: StructuredTree | undefined;
  selectedItems: number[] = [];

  private destroyed$ = new Subject<void>();

  constructor(private readonly apiService: FiltersService) {}


  ngOnInit() {
    this.loadMultiselectData();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public toggle(itemToUpdate: TreeItem) {
    if (!this.data) {
      return;
    }

    this.toggleTreeItem(itemToUpdate, this.data);
  }

  public toggleExpand(itemToUpdate: TreeItem) {
    console.log("here??")
    if (!this.data) {
      return;
    }

    console.log('expand')

    this.toggleTreeItemExpand(itemToUpdate, this.data);
  }

  public clearSelection() {
    if (!this.data) {
      return;
    }

    this.resetSelectionState(this.data);
    this.selectedItems = [];
  }

  private resetSelectionState(tree: StructuredTree): void {
    for (const item of tree) {
      item.isSelected = false;
      item.isIndeterminate = false;

      if (item.children && item.children.length > 0) {
        this.resetSelectionState(item.children);
      }
    }
  }

  private updateSelectedItems(item: TreeItem) {
    if (item.isSelected && !item.isIndeterminate) {
      this.selectedItems.push(item.id);
    } else {
      const index = this.selectedItems.indexOf(item.id);
      if (index !== -1) {
        this.selectedItems.splice(index, 1);
      }
    }
  }

  private toggleTreeItemExpand(itemToUpdate: TreeItem, tree: StructuredTree): void {
    for (const item of tree) {
      if (item.id === itemToUpdate.id && item.parentId === itemToUpdate.parentId) {
        item.isExpanded = !item.isExpanded;

        if (item.children && item.children.length > 0) {
          this.updateChildrenExpand(item.children, item.isExpanded);
        }
      }

      if (item.children && item.children.length > 0) {
        this.toggleTreeItemExpand(itemToUpdate, item.children);
      }
    }
  }

  private updateChildrenExpand(children: TreeItem[], isExpanded: boolean): void {
    for (const child of children) {
      child.isExpanded = isExpanded;

      if (child.children && child.children.length > 0) {
        this.updateChildrenExpand(child.children, isExpanded);
      }
    }
  }


  private toggleTreeItem(itemToUpdate: TreeItem, tree: StructuredTree): void {
    for (const item of tree) {
      if (item.id === itemToUpdate.id && item.parentId === itemToUpdate.parentId) {
        item.isSelected = !item.isSelected;

        this.updateSelectedItems(item);

        if (item.children && item.children.length > 0) {
          this.updateChildrenSelection(item.children, item.isSelected);
        }
      }

      if (item.children && item.children.length > 0) {
        this.toggleTreeItem(itemToUpdate, item.children);
      }
    }

    if (this.data) {
      this.updateIndeterminateStates(this.data);
    }
  }

  private updateIndeterminateStates(tree: StructuredTree): void {
    for (const item of tree) {
      if (item.children && item.children.length > 0) {
        this.updateIndeterminateStates(item.children);

        this.updateParentState(item);
      }
    }
  }

  private updateParentState(parent: TreeItem): void {
    if (!parent.children || parent.children.length === 0) {
      return;
    }

    const childrenCount = parent.children.length;
    const selectedCount = parent.children.filter(child => child.isSelected).length;
    const indeterminateCount = parent.children.filter(child => child.isIndeterminate).length;

    // All children selected: parent is selected and not indeterminate
    if (selectedCount === childrenCount) {
      parent.isSelected = true;
      parent.isIndeterminate = false;
    }
    // No children selected and none indeterminate: parent is not selected and not indeterminate
    else if (selectedCount === 0 && indeterminateCount === 0) {
      parent.isSelected = false;
      parent.isIndeterminate = false;

      this.updateSelectedItems(parent);
    }
    // Some children selected or some children indeterminate: parent is indeterminate
    else {
      parent.isSelected = false;
      parent.isIndeterminate = true;
    }
  }

  private updateChildrenSelection(children: TreeItem[], isSelected: boolean): void {
    for (const child of children) {
      child.isSelected = isSelected;
      child.isIndeterminate = false;

      this.updateSelectedItems(child);

      if (child.children && child.children.length > 0) {
        this.updateChildrenSelection(child.children, isSelected);
      }
    }
  }

  private loadMultiselectData() {
    this.apiService.loadMultiselectData()
        .pipe(takeUntil(this.destroyed$))
        .subscribe(msData => {
          this.data = this.apiService.getStructuredTree(msData);
        });
  }
}
