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

export type StructuredTree = Node[];

export type Node = {
    id: number;
    label: string;
    children: Node[];
};