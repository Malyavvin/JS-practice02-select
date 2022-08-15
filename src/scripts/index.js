import { Select } from "/src/plugins/select.js"

const select = new Select('#select',{
    placeholder: 'Выбери элемент',
    data : [
        {id: '1', value: '1'},
        {id: '2', value: '2'},
        {id: '3', value: '3'},
        {id: '4', value: '4'},
        {id: '5', value: '5'},
        {id: '6', value: '6'},
        {id: '7', value: '7'}
    ],
    onSelect(item){
        console.log('Selected item', item)
    }
})

window.s = select