import "./style/style.scss"
import { InputElement, ProjectStatus, ProjectResult } from "./Ts/app"

const input_Element = new InputElement()
export const project_Status = ProjectStatus.getInstance()
const active_project_result = new ProjectResult("active")
const finished_project_result = new ProjectResult("finished")


