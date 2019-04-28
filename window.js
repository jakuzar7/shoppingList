const cargodb = require('cargodb')

const db1 = new cargodb('firstList','db')
const bar = document.querySelector('#bar')
const addButton = document.querySelector('#add')
const list = document.querySelector('ul')
const listItem = document.querySelector('li')

let listItemClone //= listItem.cloneNode(true)
listItem.remove()


let firstList = [/*
    {text: 'milk', check: true},
    {text: 'butter', check: false},
    {text: 'water', check: true}*/
]

let itemNr = -1

addButton.addEventListener('click',() => {          // creating list item with eventListeners
    itemNr++
    listItemClone = listItem.cloneNode(true)    // doesn't work without that!?
    list.appendChild(listItemClone)

    for (let i = 0; i < list.childElementCount; i++) {          // id sorting
        //console.log(list.children[i]+ " i= " + i);
        list.children[i].setAttribute('id', i)
    }
    
    listItemClone.querySelector('#remove').addEventListener('click', (e) => {           // remove list items
        //console.log('id= ' + e.currentTarget.parentElement.getAttribute('id'));
        firstList.splice(e.currentTarget.parentElement.getAttribute('id'),1)
        e.currentTarget.parentElement.remove()
        itemNr--

        for (let i = 0; i < list.childElementCount; i++) {      // id sorting
            //console.log(list.children[i]+ " i= " + i);
            list.children[i].setAttribute('id', i)
        }
        db1.setItem('list1',JSON.stringify(firstList))
    })
    
    listItemClone.querySelector('input').addEventListener('change', (e) => {            // change saving
        //console.log('id= ' + e.currentTarget.parentElement.getAttribute('id'));
        firstList[e.currentTarget.parentElement.getAttribute('id')].text = e.currentTarget.value

        db1.setItem('list1',JSON.stringify(firstList))
        
    })
    
    
    firstList.push({text: '', check: false})
    
})
