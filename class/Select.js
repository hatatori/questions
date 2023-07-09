class Select{
    options(HtmlSelectElement, ArrayString){
        HtmlSelectElement.innerHTML = ''
        for(let i of ArrayString){
            HtmlSelectElement.innerHTML += `<option value="${i}">${i}</option>`
        }
    }
}

export let select = new Select()
window.select = select
export default Select

// const select = new Select()

// function setSelectSubjects(element, arr){
//     element.innerHTML = ''
//     for(let i of arr){
//         element.innerHTML += `<option value="${i}">${i}</option>`
//     }
// }

