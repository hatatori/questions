import { baseurl, path } from '../class/baseUrl.js'
import { questions } from '../class/Questions.js'
import {api} from '../class/Api.js'
import { word } from '../class/Word.js'
import { select } from '../class/Select.js'

function edit_page(t){
    let id = t.getAttribute('btid')
    localStorage.setItem('id',id)
    fetch(baseurl+path+"/"+id)
    .then(e=>e.json())
    .then(e=>{
        inp_discipline.value = e.discipline
        inp_subject.value = e.subject
        inp_question.value = e.question+"\n\n"+e.options
        inp_comment.value = e.comment
        btn_edit.classList.remove('hidden')
        btn_add.classList.add('hidden')

        

    })
}

function renderHtml(t){
    t.innerHTML = t.innerText
}

function renderHtmlAll(){
    let tag_comments = Array.from(document.querySelectorAll('.comment'))
    tag_comments.forEach(e=>{
        e.innerHTML = e.innerText
    })
}

function edit_by_id(){

    let id = localStorage.id
    let txt = inp_question.value.split("\n\n")
    let question = txt[0]
    let options = txt.slice(1).join("\n\n")

    let obj = {
        id: id,
        discipline: inp_discipline.value,
        subject: inp_subject.value,
        question: question,
        options: options,
        comment: inp_comment.value,
    }

    api.update(id, obj).then(e=>{
        questions.renderAll()
        inp_subject.value = ""
        inp_question.value=""
        inp_comment.value = ""
        btn_edit.classList.add('hidden')
        btn_add.classList.remove('hidden')
    })
}

function savedata(){
    let txt = inp_question.value.split("\n\n")
    let question = txt[0]
    let options = txt.slice(1).join("\n\n")

    let obj = {
        id:new Date(),
        discipline: inp_discipline0.value+inp_discipline.value,
        subject: inp_subject.value,
        question: question,
        options: options,
        comment: inp_comment.value,
    }

    inp_question.value=""
    inp_comment.value=""

    api.create(obj).then(e=>{
        questions.renderAll()
    })

}

function deletedata(t){
    let id = t.getAttribute('btid')
    console.log(id)

    let test = confirm("Tem certeza que deseja apagar?")
    if(!test) return

    api.delete(id).then(e=>{
        questions.renderAll()
    })

}

function busca(){
    api.read().then(list=>{
        let t1 = word.removeAcento(inp_select_choice1.value)
        let t2 = word.removeAcento(inp_select_choice2.value)
        let t = {}
        if(t1 && t1 != 'tudo') t["discipline"] = t1
        if(t2 && t2 != 'tudo') t["subject"] = t2
        t = "?"+new URLSearchParams(t).toString();
        window.location.search = t

        localStorage.setItem('s1', inp_select_choice1.selectedIndex)
        localStorage.setItem('s2', inp_select_choice2.selectedIndex)

        select_2(inp_select_choice1.value)
    })
}

function select_2(string){
    let ar = ["Tudo", ...questions.disciplines[string]]
    select.options(inp_select_choice2, ar)
}

function changeselect(){
    select_2(inp_select_choice1.value)
}

window.edit_page = edit_page
window.edit_by_id = edit_by_id
window.savedata = savedata
window.deletedata = deletedata
window.busca = busca
window.changeselect = changeselect
window.renderHtml = renderHtml
window.renderHtmlAll = renderHtmlAll

export {edit_page, edit_by_id, savedata, busca, changeselect, select_2}