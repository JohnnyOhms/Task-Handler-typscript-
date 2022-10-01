import { ValidityFormat } from "../structure/interface"

export function validation( inputValidate: ValidityFormat ): boolean {
    let valid = true
    if ( inputValidate.required ) {
        valid = valid && ( inputValidate.value.toString().trim().length !== 0 )
    }

    if ( inputValidate.maxLengthString != null && typeof inputValidate.value === "string" ) {
        valid = valid && ( inputValidate.value.trim().length <= inputValidate.maxLengthString )
    }

    if ( inputValidate.minLengthString != null && typeof inputValidate.value === "string" ) {
        valid = valid && ( inputValidate.value.trim().length >= inputValidate.minLengthString )
    }

    if ( inputValidate.maxLengthNumber != null && typeof inputValidate.value === "number" ) {
        valid = valid && ( inputValidate.value <= inputValidate.maxLengthNumber )
    }

    if ( inputValidate.minLengthNumber != null && typeof inputValidate.value === "number" ) {
        valid = valid && ( inputValidate.value >= inputValidate.minLengthNumber )
    }

    return valid
}