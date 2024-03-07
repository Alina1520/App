export const provClass = (name:symbol|string,value:any) => ({
    provide:name,
    useClass:value
})

export const provValue = (name:symbol|string,value:any) => ({
    provide:name,
    useValue:value
})

