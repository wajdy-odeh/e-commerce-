const parseRequistUrl = ()=>
{
    const url = document.location.hash.toLowerCase()
    console.log(url)
    const splitUrl = url.split("/")
    return {
            'source' : splitUrl[1],
            'action' : splitUrl[2],
            'id'     : splitUrl[3]
            }
}
export default parseRequistUrl