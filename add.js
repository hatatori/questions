import {questions} from './class/Questions.js'
import {edit_page, savedata} from './scripts/util.js'
import {select} from './class/Select.js'

questions.renderAll()

questions.all_disciplines_subjects().then(list=>{
    select.options(inp_discipline0, ["", ...Object.keys(list)])
    // console.log(Object.keys(list))
})