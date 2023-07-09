import {word} from './Word.js'
import {baseurl, path} from './baseUrl.js'

class Questions{
    constructor(){
        this.data = []
        this.dataAll = []
    }

    add(object_json){
        object_json.question = object_json.question.replace(/\n/g,"\n\n")
        object_json.ar = object_json.options.split("\n\n")
        object_json.answer = object_json.ar.map((e,i)=>e.includes('*')).indexOf(true)
        this.data.push(object_json)
        this.dataAll.push(object_json)
    }

    render(data){
        app.items=[]
        app.items = data
    }
    
    querystring(){
        if(window.location.search != ''){
            let query = window.location.search.split("?")[1].split("&")
            let obj = {}
            query.map(e=>{
                let prop = e.split("=")[0].toLowerCase()
                let value = e.split("=")[1].toLowerCase()
                obj[prop] = value
            })
            return obj
        }else{
            return {}
        }
    }

    renderFilter(){
        return fetch(baseurl+path)
        .then(e=>e.json())
        .then(list=>{

            if(this.querystring().discipline)
                list = list.filter( e=> word.removeAcento(e.discipline).includes(word.removeAcento(this.querystring().discipline)) )

            if(this.querystring().subject)
                list = list.filter( e=> word.removeAcento(e.subject).includes(word.removeAcento(this.querystring().subject.replace(/\+/g," "))) )
            
            this.data = []
            this.dataAll = []

            list.map(e=>{
                this.add(e)
            })

            this.render(this.dataAll)

            

            return list

        })
    }

    all_disciplines_subjects(){
        return fetch(baseurl+path)
        .then(e=>e.json())
        .then(list=>{
            let objects = {}
            list.map(e=>{
                if(!objects[e.discipline]) objects[e.discipline] = []
                objects[e.discipline].push(e.subject.split(",").map(g=>g.trim()))
                objects[e.discipline] = objects[e.discipline].flat()
            })
            this.disciplines = objects
            return this.disciplines
        })
    }

    renderAll(){
        return fetch(baseurl+path)
        .then(e=>e.json())
        .then(list=>{
           
            this.data = []
            this.dataAll = []

            list.map(e=>{
                this.add(e)
            })

            this.render(this.dataAll)

            let objects = {}

            this.dataAll.map(e=>{
                if(!objects[e.discipline]) objects[e.discipline] = []
                objects[e.discipline].push(e.subject.split(",").map(g=>g.trim()))
                objects[e.discipline] = objects[e.discipline].flat()
            })

            this.discipline_all_2 = objects

            return list

        })
    }

    datas(){
        return fetch(baseurl+path)
        .then(e=>e.json())
    }

    checkRadioAnswer(button_element){
        const pos = button_element.parentElement.querySelector('input:checked').value
        const answer_position = button_element.getAttribute('answer')
        const tag_checkanswer = button_element.parentElement.querySelector("[checkanswer]")


        if(answer_position == pos){
            tag_checkanswer.classList.remove('hidden')
            tag_checkanswer.classList.remove('bg-red-100')
            tag_checkanswer.innerHTML = `Acertou Gab(${((answer_position|0)+1)}) `
            tag_checkanswer.classList.value = 'correct'
        }else{
            tag_checkanswer.classList.remove('hidden')
            tag_checkanswer.classList.remove('bg-green-100')
            tag_checkanswer.classList.value = 'incorrect'
            tag_checkanswer.innerHTML = `Errou Gab(${((answer_position|0)+1)}) `
        }
    }
}

export const questions = new Questions()
window.questions = questions

// let questions = 3


// export {questions}

// export default Questions
// export questions
// let questions = new Questions()

// fetch(baseurl+materia)
// .then(e=>e.json())
// .then(list=>{
//     list.map(e=>{
//         questions.add(e)
//         questions.render(questions.data)
//     })
// })


