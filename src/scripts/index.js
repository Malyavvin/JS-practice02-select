const getTemplate = (data = [], placeholder) => {
    const text = placeholder ?? 'Текст по умолчанию'
    const items = data.map(item => {
        return `
            <li class="select__item" data-type="item"  data-id="${item.id}">${item.value}</li>
        `
    })

    return `
        <div class="select__backdrop" data-type="backdrop"></div>
            <div class="select__input" data-type="input">
                <span data-type="value">
                    ${text}
                    <i class="fa-solid fa-angles-down" data-type="arrow"></i>
                </span>
            </div>
            <div class="select__dropdown">
                <ul class="select__list">
                ${items.join('')}
                </ul>
            </div>
    `
}

export class Select{
    constructor(selector,options){
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectedId = null

        this.#render()
        this.#setup()
    }

    #render(){
        const {placeholder, data} = this.options
        this.$el.classList.add('select')
        this.$el.innerHTML = getTemplate(data, placeholder)
    }

    #setup(){
        this.clickHandler = this.clickHandler.bind(this)
        this.$el.addEventListener('click', this.clickHandler)
        this.$arrow = this.$el.querySelector('[data-type="arrow"]')
        this.$value = this.$el.querySelector('[data-type="value"]')
    }

    clickHandler(e){
        const {type} = e.target.dataset

        if(type === 'input'){
            this.toggle()
        } else if (type === 'item'){
            const id = e.target.dataset.id
            this.select(id)
        } else if(type === 'backdrop'){
            this.close()
        }
    }

    get isOpen(){
        return this.$el.classList.contains('open')
    }

    toggle(){
        this.isOpen ? this.close() : this.open()
    }

    get current(){
        return this.options.data.find(item => item.id === this.selectedId)
    }

    select(id){
        this.selectedId = id
        this.$value.textContent = this.current.value

        this.$el.querySelectorAll('[data-type="item"]').forEach(element => {
            element.classList.remove('selected')
        })
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

        this.options.onSelect ? this.options.onSelect(this.current) : null
        
        this.close()
    }

    open(){
        this.$el.classList.add('open')
        this.$arrow.classList.remove('fa-angles-down')
        this.$arrow.classList.add('fa-angles-up')
    }

    close(){
        this.$el.classList.remove('open')
        this.$arrow.classList.add('fa-angles-down')
        this.$arrow.classList.remove('fa-angles-up')
    }

    destroy(){
        this.$el.removeEventListener('click',this.clickHandler)
        this.$el.innerHTML = ''
    }
}

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