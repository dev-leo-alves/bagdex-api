type UrlGenerator  = {
    id: number
    moduleName: string
}

export const urlGenerator = ({id, moduleName}:UrlGenerator): string => {
    const urlBase = `https://bagdex-api.com/api/${moduleName}/${id}`
    return urlBase
} 