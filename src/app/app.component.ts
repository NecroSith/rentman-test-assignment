import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {FiltersService} from "./shared/services/api/filters.service";
import {StructuredTree, TreeItem} from "./shared/models/multiselect.model";

@Component({
  selector: 'rman-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rentman-test-assignment';
  // data: StructuredTree | undefined;
  // selectedItems: number[] = [];

  private destroyed$ = new Subject<void>();
  constructor(private readonly apiService: FiltersService) {
  }

  ngOnInit() {
    // this.loadMultiselectData();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  // public toggle(itemToUpdate: TreeItem) {
  //   this.toggleTreeItem(itemToUpdate, this.data!);
  // }
  //
  // public clearSelection() {
  //
  // }
  //
  // private updateSelectedItems(itemId: number) {
  //   if (this.selectedItems.includes(itemId)) {
  //     const index = this.selectedItems.indexOf(itemId);
  //     if (index !== -1) {
  //       this.selectedItems.splice(index, 1);
  //     }
  //   } else {
  //      this.selectedItems.push(itemId);
  //   }
  // }
  //
  //
  // private toggleTreeItem(itemToUpdate: TreeItem, tree: StructuredTree): void {
  //   for (const item of tree) {
  //     if (item.id === itemToUpdate.id && item.parentId === itemToUpdate.parentId) {
  //       item.isSelected = !item.isSelected;
  //
  //       this.updateSelectedItems(item.id);
  //
  //       if (item.children && item.children.length > 0) {
  //         this.updateChildrenSelection(item.children, item.isSelected);
  //       }
  //     }
  //
  //     if (item.children && item.children.length > 0) {
  //       this.toggleTreeItem(itemToUpdate, item.children);
  //     }
  //   }
  //
  //   if (this.data) {
  //     this.updateIndeterminateStates(this.data);
  //   }
  //
  // }
  //
  // private updateIndeterminateStates(tree: StructuredTree): void {
  //   for (const item of tree) {
  //     if (item.children && item.children.length > 0) {
  //       // First update indeterminate states for all children
  //       this.updateIndeterminateStates(item.children);
  //
  //       // Then update this item's state based on its children
  //       this.updateParentState(item);
  //     }
  //   }
  // }
  //
  // private updateParentState(parent: TreeItem): void {
  //   if (!parent.children || parent.children.length === 0) {
  //     return;
  //   }
  //
  //   const childrenCount = parent.children.length;
  //   const selectedCount = parent.children.filter(child => child.isSelected).length;
  //   const indeterminateCount = parent.children.filter(child => child.isIndeterminate).length;
  //
  //   // All children selected: parent is selected and not indeterminate
  //   if (selectedCount === childrenCount) {
  //     parent.isSelected = true;
  //     parent.isIndeterminate = false;
  //   }
  //   // No children selected and none indeterminate: parent is not selected and not indeterminate
  //   else if (selectedCount === 0 && indeterminateCount === 0) {
  //     parent.isSelected = false;
  //     parent.isIndeterminate = false;
  //   }
  //   // Some children selected or some children indeterminate: parent is indeterminate
  //   else {
  //     parent.isSelected = false;
  //     parent.isIndeterminate = true;
  //   }
  // }
  //
  // private updateChildrenSelection(children: TreeItem[], isSelected: boolean): void {
  //   for (const child of children) {
  //     child.isSelected = isSelected;
  //     child.isIndeterminate = false;
  //
  //     this.updateSelectedItems(child.id);
  //
  //     if (child.children && child.children.length > 0) {
  //       this.updateChildrenSelection(child.children, isSelected);
  //     }
  //   }
  // }
  //
  // private loadMultiselectData() {
  //   this.apiService.loadMultiselectData()
  //       .pipe(takeUntil(this.destroyed$))
  //       .subscribe(msData => {
  //         this.data = this.apiService.getStructuredTree(msData);
  //         console.log(this.data);
  //       });
  // }
}
