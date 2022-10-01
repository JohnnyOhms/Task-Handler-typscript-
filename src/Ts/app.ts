import { ValidityFormat, Project, Status, ProjectUpdator, Draggable, DragTarget } from "./structure/interface"
import { validation } from "./component/validation"
import { autoBind } from "./component/auto_bind"
import { project_Status } from "../index"

export class InputElement {
    formEl: HTMLFormElement
    titleEl: HTMLInputElement
    desEl: HTMLInputElement
    numEl: HTMLInputElement
    constructor() {
        this.formEl = document.querySelector( ".btn-submit" ) as HTMLFormElement
        this.titleEl = document.querySelector( ".title-input" ) as HTMLInputElement
        this.desEl = document.querySelector( ".des-input" ) as HTMLInputElement
        this.numEl = document.querySelector( ".num-input" ) as HTMLInputElement
        this.formEvent()
    }

    formEvent() {
        this.formEl.addEventListener( "click", this.inputValues )
    }

    @autoBind
    inputValues( e: Event ) {
        e.preventDefault();
        let output = this.configureInput()
        if ( Array.isArray( output ) ) {
            const [titleValue, descriptionValue, numElValue] = output
            project_Status.addProject( titleValue, descriptionValue, numElValue )
        }
    }

    configureInput(): void | [string, string, number] {
        const titleValue = this.titleEl.value;
        const descriptionValue = this.desEl.value;
        const numElValue = +this.numEl.value;


        let titleValidity: ValidityFormat = {
            value: titleValue,
            required: true,
            minLengthString: 2,
            maxLengthString: 30
        }

        let descripValidity: ValidityFormat = {
            value: descriptionValue,
            required: true,
            minLengthString: 2,
            maxLengthString: 30
        }

        let numElValidity: ValidityFormat = {
            value: numElValue,
            required: true,
            minLengthNumber: 1,
            maxLengthNumber: 30
        }

        if ( !validation( titleValidity ) ||
            !validation( descripValidity ) ||
            !validation( numElValidity ) ) {
            alert( "Enter a vlid format" )
            return
        }

        return [titleValue, descriptionValue, numElValue]
    }
}

export class ProjectStatus {
    private static instance: ProjectStatus
    projects: Project[] = []
    protected projectUpdator: ProjectUpdator[] = []

    constructor() { }
    static getInstance() {
        if ( this.instance ) {
            return this.instance
        }
        this.instance = new ProjectStatus()
        return this.instance;
    }

    addProject( title: string, description: string, number: number ) {
        const project = new Project( Math.random(), title, description, number, Status.active )
        this.projects.push( project )
        this.updateProject()
    }

    updateProject() {
        for ( const update of this.projectUpdator ) {
            update( this.projects )
        }
    }

    AddProjectUPdator( updator: ProjectUpdator ) {
        this.projectUpdator.push( updator )
    }

    moveProject( id: number, newStatus: Status ) {
        const project_ID = this.projects.find( proj => proj.id === id )
        if ( project_ID ) {
            project_ID.Currentstatus = newStatus
            this.updateProject()
        }
    }
}

export class ProjectResult implements DragTarget{
    assignedProject: Project[] = []
    list_group: HTMLDivElement
    constructor(private type: string) {
        this.list_group = document.querySelector( `.${type}-list-group` )  as HTMLDivElement
        project_Status.AddProjectUPdator( ( project: Project[] ) => {
            const relevantProject = project.filter( proj => {
                if ( this.type === "active" ) {
                   return proj.Currentstatus === Status.active
                } 
                   return  proj.Currentstatus === Status.finished
            })
            this.assignedProject = relevantProject;
            this.renderProject()
            this.configure()
        } )
    }

    renderProject() {
        this.list_group.innerHTML = ""
        this.assignedProject.forEach( item => {
            new RenderProject( item, this.list_group )
        } )     
    }

    configure(){
        this.list_group.addEventListener( "dragover", this.drageOverHandler )
        this.list_group.addEventListener( "dragenter", this.dragEnterHandler )
        // this.list_group.addEventListener( "dragleave", this.dragLeaveHandler )
        this.list_group.addEventListener( "drop", this.dropHandler )
    }

    @autoBind
    drageOverHandler( e: DragEvent ): boolean {
        e.preventDefault()
        return false
    }

    dragEnterHandler( e: DragEvent ): void { }
    
    dragLeaveHandler( e: DragTarget ): void {}

    @autoBind
    dropHandler( e: DragEvent ): void {
        e.stopPropagation();
        const projectId = Number(e.dataTransfer?.getData( "text/plain" ))
        project_Status.moveProject(projectId, (this.type === "active" ) ? Status.active : Status.finished)
        
    }
}

class RenderProject implements Draggable {
    targetBtn: NodeListOf <HTMLButtonElement>
    constructor( public item: Project, public list_group: HTMLDivElement ) {
        list_group.innerHTML += ` <button type="button" class="list-group-item list-group-item-action m-2 border border-2 target-btn">
                            <ul class="task-list">
                                <li>
                                    <strong>${ item.title }</strong>
                                </li>
                                <li>${ item.description }</li>
                                <li>${ item.number }</li>
                            </ul>
                        </button>`;
        this.targetBtn = document.querySelectorAll<HTMLButtonElement>( ".target-btn" )
        const form = document.getElementById( "form-input" ) as HTMLFormElement
        form.reset()
        this.configure()
    }

    configure() {
        this.targetBtn.forEach( item => {
            item.setAttribute( "draggable", "true" )
            item.addEventListener( "dragstart", this.dragStart )
            item.addEventListener( "dragstart", this.dragEnd )
        })
    }

    @autoBind
    dragStart( e: DragEvent ): void{
        e.dataTransfer?.setData( "text/plain", this.item.id.toString() )
        e.dataTransfer!.effectAllowed = "move"
    }
    
    dragEnd(e: DragEvent): void {}
}