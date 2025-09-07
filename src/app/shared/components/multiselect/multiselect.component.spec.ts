import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiselectComponent } from './multiselect.component';
import { SharedModule } from "../../shared.module";
import { CommonModule } from "@angular/common";
import { provideHttpClient } from "@angular/common/http";
import { FiltersService } from "../../services/api/filters.service";
import { of } from "rxjs";
import { TreeViewComponent } from "./tree-view/tree-view.component";
import {MultiselectInputData, StructuredTree, TreeItem} from "../../models/multiselect.model";
import { By } from "@angular/platform-browser";

describe('MultiselectComponent', () => {
  let component: MultiselectComponent;
  let fixture: ComponentFixture<MultiselectComponent>;
  let filtersServiceSpy: jasmine.SpyObj<FiltersService>;

  const mockData: MultiselectInputData = {
    folders: {
      columns: ["id", "label", "parent_id"],
      data: [
        [1, "Folder 1", null],
        [2, "Folder 2", 1]
      ]
    },
    items: {
      columns: ["id", "label", "folder_id"],
      data: [
        [101, "Item 1", 1],
        [102, "Item 2", 2]
      ]
    }
  };

  const mockStructuredTree: StructuredTree = [
    {
      id: 1,
      parentId: null,
      label: "Folder 1",
      children: [
        {
          id: 2,
          parentId: 1,
          label: "Folder 2",
          children: [
            {
              id: 102,
              parentId: 2,
              label: "Item 2",
              children: [],
              isSelected: false,
              isIndeterminate: false,
              isExpanded: false
            }
          ],
          isSelected: false,
          isIndeterminate: false,
          isExpanded: true
        },
        {
          id: 101,
          parentId: 1,
          label: "Item 1",
          children: [],
          isSelected: false,
          isIndeterminate: false,
          isExpanded: false
        }
      ],
      isSelected: false,
      isIndeterminate: false,
      isExpanded: true
    }
  ];

  beforeEach(async () => {
    filtersServiceSpy = jasmine.createSpyObj('FiltersService',
        ['loadMultiselectData', 'getStructuredTree']);

    filtersServiceSpy.loadMultiselectData.and.returnValue(of(mockData));
    filtersServiceSpy.getStructuredTree.and.returnValue(mockStructuredTree);

    await TestBed.configureTestingModule({
      declarations: [MultiselectComponent],
      imports: [
        CommonModule,
        SharedModule,
      ],
      providers: [
        provideHttpClient(),
        { provide: FiltersService, useValue: filtersServiceSpy }
      ]
    })
        .compileComponents();

    fixture = TestBed.createComponent(MultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load multiselect data on init', () => {
    expect(filtersServiceSpy.loadMultiselectData).toHaveBeenCalled();
    expect(filtersServiceSpy.getStructuredTree).toHaveBeenCalledWith(mockData);
    expect(component.data).toEqual(mockStructuredTree);
  });

  it('should toggle item selection when handling item selection change', () => {
    const testItem: TreeItem = {
      id: 1,
      parentId: null,
      label: "Folder 1",
      children: [],
      isSelected: false,
      isIndeterminate: false,
      isExpanded: true
    };

    component.toggle(testItem);
    const targetFolderSelected = component.data?.find(item => item.id === 1);

    expect(targetFolderSelected).toBeTruthy();
    expect(targetFolderSelected!.isSelected).toBeTrue();

    component.toggle(testItem);
    const targetFolderUnselected = component.data?.find(item => item.id === 1);

    expect(targetFolderUnselected).toBeTruthy();
    expect(targetFolderUnselected!.isSelected).toBeFalse();
  });

  it('should toggle item expansion when handling item expansion change', () => {
    const testItem: TreeItem = {
      id: 1,
      parentId: null,
      label: "Folder 1",
      children: [],
      isSelected: false,
      isIndeterminate: false,
      isExpanded: true
    };

    component.toggleExpand(testItem);
    const targetFolderCollapsed = component.data?.find(item => item.id === 1);

    expect(targetFolderCollapsed).toBeTruthy();
    expect(targetFolderCollapsed!.isExpanded).toBeFalse();

    component.toggleExpand(testItem);
    const targetFolderExpanded = component.data?.find(item => item.id === 1);

    expect(targetFolderExpanded).toBeTruthy();
    expect(targetFolderExpanded!.isExpanded).toBeTrue();
  });

  it('should pass the structured tree data to tree-view component', () => {
    const treeViewComponent = fixture.debugElement.query(By.directive(TreeViewComponent));
    expect(treeViewComponent).toBeTruthy();
    expect(treeViewComponent.componentInstance.data).toEqual(mockStructuredTree);
  });

  it('should update parent selection state when child item is selected', () => {
    const parent: TreeItem = {
      id: 1,
      parentId: null,
      label: "Parent",
      children: [],
      isSelected: false,
      isIndeterminate: false,
      isExpanded: true
    };

    const child: TreeItem = {
      id: 2,
      parentId: 1,
      label: "Child",
      children: [],
      isSelected: false,
      isIndeterminate: false,
      isExpanded: false
    };

    parent.children = [child];
    component.data = [parent];

    component.toggle(child);
    expect(parent.isIndeterminate || parent.isSelected).toBeTrue();
  });

  it('should handle selecting all children when parent is selected', () => {
    const parent: TreeItem = {
      id: 1,
      parentId: null,
      label: "Parent",
      children: [],
      isSelected: false,
      isIndeterminate: false,
      isExpanded: true
    };

    const child1: TreeItem = {
      id: 2,
      parentId: 1,
      label: "Child 1",
      children: [],
      isSelected: false,
      isIndeterminate: false,
      isExpanded: false
    };

    const child2: TreeItem = {
      id: 3,
      parentId: 1,
      label: "Child 2",
      children: [],
      isSelected: false,
      isIndeterminate: false,
      isExpanded: false
    };

    parent.children = [child1, child2];

    component.data = [parent];

    component.toggle(parent);

    expect(child1.isSelected).toBeTrue();
    expect(child2.isSelected).toBeTrue();
  });
});