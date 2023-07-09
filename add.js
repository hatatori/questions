import {questions} from './class/Questions.js'
import {edit_page, savedata} from './scripts/util.js'
import {select} from './class/Select.js'

questions.renderAll()

questions.all_disciplines_subjects().then(list=>{
    select.options(inp_discipline0, ["", ...Object.keys(list)])
    // console.log(Object.keys(list))
})

inp_discipline0.onchange=function(){
    if(inp_discipline0.value != '')
    {
        inp_discipline.value = ""
        inp_discipline.setAttribute('disabled', true)
    }else{
        inp_discipline.removeAttribute('disabled')
    }

    
}