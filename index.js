import {questions} from './class/Questions.js'
import {select} from './class/Select.js'
import {api} from './class/Api.js'
import { busca, changeselect, select_2 } from './scripts/util.js'

questions.renderFilter()

// set select options
questions.all_disciplines_subjects().then(list=>{
    
    select.options(inp_select_choice1, ['Tudo', ...Object.keys(list)])
    select.options(inp_select_choice2, ['Tudo', ...Object.values(list).flat()])
    
    inp_select_choice1.selectedIndex = localStorage.s1
    select_2(inp_select_choice1.value)
    inp_select_choice2.selectedIndex = localStorage.s2

})

// inp_select_choice2.value = questions.querystring().subject.replace(/\+/g," ")


