import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StructuredTree, TreeItem} from "../../../models/multiselect.model";

@Component({
    selector: 'rman-tree-view',
    templateUrl: './tree-view.component.html',
    styleUrl: './tree-view.component.scss',
    standalone: false,
})
export class TreeViewComponent {
    @Input() data: StructuredTree | undefined;

    @Output() itemSelectionChanged = new EventEmitter<TreeItem>();
    @Output() itemExpansionChanged = new EventEmitter<TreeItem>();

    constructor() {}

    public toggle(itemToUpdate: TreeItem) {
        this.itemSelectionChanged.emit(itemToUpdate);
    }

    public toggleExpand(itemToUpdate: TreeItem) {
        console.log('expand inner')
        this.itemExpansionChanged.emit(itemToUpdate);
    }
}
