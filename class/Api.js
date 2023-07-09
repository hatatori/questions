import { baseurl, path } from "./baseUrl.js"

export default class Api{
    constructor(){
        this.data = []
        this.dataAll = []
    }

    update(id, obj){
        return fetch(baseurl+path+"/"+id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })
    }

    read(){
        return fetch(baseurl+path)
        .then(e=>e.json())
    }


    create(obj){
        return fetch(baseurl+path, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        })
    }

    delete(id){
        return fetch(baseurl+path+"/"+id, {
            method: "DELETE"
        })
    }
}

let api = new Api()
export {api}