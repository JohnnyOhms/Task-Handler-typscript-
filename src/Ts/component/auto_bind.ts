export function autoBind( target: object, name: string, description: PropertyDescriptor ) {
    const mainMethod = description.value;
    let obj: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return mainMethod.bind( this )
        }
    }
    return obj

}