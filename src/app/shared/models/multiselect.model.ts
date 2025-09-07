export type MultiselectInputData = {
    folders: {
        columns: string[];
        data: DataArray[];
    };
    items: {
        columns: string[];
        data: DataArray[];
    };
}

export type DataArray = [number, string, number];

export type StructuredTree = TreeItem[];

export type TreeItem = {
    id: number;
    parentId: number | null;
    label: string;
    children: TreeItem[];
    isSelected?: boolean;
    isIndeterminate?: boolean;
    isExpanded?: boolean;
};