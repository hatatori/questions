let baseurl = "http://localhost:3001"
let materia = '/questoes'
let id_active;


let categories_discipline = [];
let categories_subject = [];

let subjects = [
    "Informática",
    "Conhecimento bancário",
    "Português",
    "Tecnologia",
    "Informática",
    "Inglês",
    "Matemática",
    "Economia",
    "Direito",
]


try{
    setSelectSubjects(inp_discipline, subjects)
}catch(e){}

// querystring
function paramsurl(){
    let a = window.location.search.split("?")[1].split("&")
    let obj = {}
    a.map(e=>{
        let name = e.split("=")[0]
        let value = e.split("=")[1]
        obj[name] = value
    })
    return obj
}


function busca(){
    let v1 = removeAcento(inp_select_choice1.value.toLowerCase())
    let v2 = removeAcento(inp_select_choice2.value.toLowerCase())
    

    app.items=[]
    fetch(baseurl+materia)
    .then(e=>e.json())
    .then(list=>{


        // if(v1.length > 1)
        list = list.filter( e => removeAcento(e.discipline) == v1  )

        if(v2!="tudo")
        list = list.filter( e => removeAcento(e.subject).includes(v2)  )

        list.map(e=>{
            e.question = e.question.replace(/\n/g,"\n\n")
            e.ar = e.options.split("\n\n")
            e.answer = e.ar.map((e,i)=>e.includes('*')).indexOf(true)
            app.items.push(e)
        })
    })
}

function loadDataAll(){
    fetch(baseurl+materia)
    .then(e=>e.json())
    .then(list=>{
        
        

        app.items = []
        try{
            paramsurl()
            Object.keys(paramsurl()).map(e=>{
                list = list.filter(g=>g[e].toLowerCase().includes(paramsurl()[e]))
            })
        }catch(e){}
        list.map(e=>{
            e.question = e.question.replace(/\n/g,"\n\n")
            e.ar = e.options.split("\n\n")
            e.answer = e.ar.map((e,i)=>e.includes('*')).indexOf(true)
            app.items.push(e)
        })
    })
}
loadDataAll()

function savedata(){

    let txt = inp_question.value.split("\n\n")
    let question = txt[0]
    let options = txt.slice(1).join("\n\n")

    let obj = {
        id:new Date(),
        discipline: inp_discipline.value,
        subject: inp_subject.value,
        question: question,
        options: options,
        comment: inp_comment.value,
    }

    fetch(baseurl+materia, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    })
    .then(e=>{
        inp_question.value = ""
        inp_comment.value=""
        // tag_list.scrollTo(0, tag_list.scrollHeight);
        loadDataAll()
    })
}


function deletedata(t){

    let id = t.getAttribute('btid')
    console.log(id)

    let test = confirm("Tem certeza que deseja apagar?")
    if(!test) return

    fetch(baseurl+materia+"/"+id, {
        method: "DELETE"
    }).then(e=>{
        loadDataAll()
    })
}



function edit_page(t){
    // let id = window.location.search.split("=")[1]
    // let id = document.getAttribute('btid')
    let id = t.getAttribute('btid')
    localStorage.setItem('id',id)
    
    fetch(baseurl+materia+"/"+id)
    .then(e=>e.json())
    .then(e=>{
        inp_discipline.value = e.discipline
        inp_subject.value = e.subject
        inp_question.value = e.question+"\n\n"+e.options
        inp_comment.value = e.comment
        // btn_editar.classList.remove('hidden')
        btn_edit.classList.remove('hidden')
        btn_add.classList.add('hidden')
        
    })
}

function edit_by_id(){

    // let id = window.location.search.split("=")[1]
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

    fetch(baseurl+materia+"/"+id, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
    })
    .then(e=>{
        // window.location.href="./add"
        // inp_discipline.value = ""
        inp_subject.value = ""
        inp_comment.value = ""
        inp_question.value=""
        btn_edit.classList.add('hidden')
        btn_add.classList.remove('hidden')

        loadDataAll()
    })
}

function checkradiopos(this_button, a){
    const pos = this_button.parentElement.querySelector('input:checked').value
    const answer_position = this_button.getAttribute('answer')
    const tag_checkanswer = this_button.parentElement.querySelector("[checkanswer]")
    if(answer_position == pos){
        tag_checkanswer.classList.remove('hidden')
        tag_checkanswer.innerHTML = "Acertou"
        tag_checkanswer.classList.value += ' text-green-700 bg-green-100'
    }else{
        tag_checkanswer.classList.remove('hidden')
        tag_checkanswer.classList.value += ' text-red-500 bg-red-100'
        tag_checkanswer.innerHTML = "Errou"
    }
}

try{
if(!window.location.search.includes('edit')){
    btn_edit.classList.add("hidden")
}else{
    btn_edit.classList.remove("hidden")
    edit_page()
}
}catch(e){}

// select


//removeAcento
function removeAcento(text)
{       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
}




