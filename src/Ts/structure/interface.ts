export interface ValidityFormat {
    value: string | number;
    required?: boolean;
    minLengthString?: number;
    maxLengthString?: number;
    minLengthNumber?: number;
    maxLengthNumber?: number
}

export enum Status { active, finished }

export class Project {
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public number: number,
        public Currentstatus: Status,
    ) { }
}

export type ProjectUpdator = { ( project: Project[] ): void }

export interface Draggable {
    dragStart( e: DragEvent ): void,
    dragEnd( e: DragEvent ): void,
}

export interface DragTarget {
    drageOverHandler( e: DragEvent ): boolean
    dragEnterHandler( e: DragEvent ) : void
    dragLeaveHandler( e: DragTarget ): void
    dropHandler( e: DragEvent) : void
}

