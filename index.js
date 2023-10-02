let form = document.forms.creater
let inp = form.querySelector('input')
let cont = document.querySelector('.container')
let todos = []


form.onsubmit = (e) => {
    e.preventDefault()
    if (inp.value === '') {
        inp.classList.add('inp_empty')
    } else {
        inp.classList.remove('inp_empty')
        let time = new Date().getHours() + ":" + new Date().getMinutes()
        let todo = {
            id: Math.random(),
            completed: false,
            time: time
        }
        let fm = new FormData(form)
        fm.forEach((value, key) => todo[key] = value)
        todos.push(todo);
        inp.value = ''
        reload(todos)
    }
}

function reload(arr) {
    cont.innerHTML = ""
    arr.length === 0 ? cont.classList.add('cont_bg') : cont.classList.remove('cont_bg')
    for (let item of arr) {
        let todoBox = document.createElement('div')
        let left = document.createElement('div')
        let right = document.createElement('div')
        let h2 = document.createElement('h2')
        let spanTime = document.createElement('span')
        let cancelBtn = document.createElement('button')
        let cancelImg = document.createElement('img')

        todoBox.classList.add('box')
        left.classList.add('left')
        cancelImg.classList.add('cancelImg')
        right.classList.add('right')    


        if (item.completed === true) {
            h2.classList.add('h2_done')
        }

        h2.innerHTML = item.task
        spanTime.innerHTML = item.time

        todoBox.append(left, right)
        left.append(h2, spanTime)
        right.append(cancelBtn)
        cancelBtn.append(cancelImg)
        cont.append(todoBox)

        cancelBtn.onclick = () => {
            remove(item.id)
        }
        h2.onclick = () => {
            doneView(item)
        }
    }
}
reload(todos)

function remove(ID) {
    todos = todos.filter(el => el.id !== ID)
    reload(todos)
}
function doneView(done) {
    done.completed === false ? done.completed = true : done.completed = false
    reload(todos)
}








let modal = document.querySelector('.modal')
let modalClose = document.querySelector('[data-close]')
let modalInput = document.querySelector('.modal__input')

cont.addEventListener('dblclick', (event) => {
    if (event.target.classList.contains('box')) {
        modal.style.display = 'block'
        modalInput.value = event.target.querySelector('h2').innerHTML
    }
})

modalClose.addEventListener('click', () => {
    modal.style.display = 'none'
})

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none'
    }
})
