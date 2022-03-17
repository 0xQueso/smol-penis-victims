export const fetcher = (url, data) => {
    fetch(window.location.origin + url, {
        method: data ? "POST" : "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then(r => {
        console.log(r)
        console.log('json res here')
        return r.json();
    }).catch(e => e)
}