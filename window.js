const cargodb = require('cargodb')
const db1 = new cargodb('lists','db')
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

addButton.addEventListener('click',() => {                                              // creating list item with eventListeners
    
    listItemClone = listItem.cloneNode(true)                            // doesn't work without, replacing new list item with the earlier one?!
    list.appendChild(listItemClone)
    
    for (let i = 0; i < list.childElementCount; i++) {                                  // id sorting
        list.children[i].setAttribute('id', i)
    }
    
    listItemClone.querySelector('#remove').addEventListener('click', (e) => {           // remove list items
        firstList.splice(e.currentTarget.parentElement.getAttribute('id'),1)
        e.currentTarget.parentElement.remove()
        
        for (let i = 0; i < list.childElementCount; i++) {                              // id sorting
            list.children[i].setAttribute('id', i)
        }
        db1.setItem('list0',JSON.stringify(firstList))
    })
    
    listItemClone.querySelector('input').addEventListener('change', (e) => {            // saving changes
        firstList[e.currentTarget.parentElement.getAttribute('id')].text = e.currentTarget.value
        
        db1.setItem('list0',JSON.stringify(firstList))
        
    })
    
    listItemClone.querySelector('#check').addEventListener('click', (e) => {            // handling check 
        let check = e.currentTarget.querySelector("img").getAttribute("alt")
        
        if (check == "true") {                                                          //set image, line and check attribute
            check = false
            e.currentTarget.querySelector("img").setAttribute("src","assets/Uncheck-icon.png")
            e.currentTarget.parentElement.querySelector('input').style.textDecoration = 'none' 
            e.currentTarget.parentElement.querySelector('input').style.borderBottomColor = 'var(--main-background-color)'
            e.currentTarget.parentElement.querySelector('input').style.color = 'var(--main-background-color)'
        } else {
            check = true
            e.currentTarget.querySelector("img").setAttribute("src","assets/Check-icon.png")
            e.currentTarget.parentElement.querySelector('input').style.textDecoration = 'line-through' 
            e.currentTarget.parentElement.querySelector('input').style.borderBottomColor = 'gray'
            e.currentTarget.parentElement.querySelector('input').style.color = 'gray'
        }
        
        firstList[e.currentTarget.parentElement.getAttribute('id')].check = check
        e.currentTarget.querySelector("img").setAttribute("alt", check)
        db1.setItem('list0',JSON.stringify(firstList))
        
    })    
    firstList.push({text: '', check: false})
})

bar.querySelector('#upload').addEventListener('click', (e) => {
    //function choosing file to load 

    list.children[0].remove();
    firstList = JSON.parse(db1.getItem('list0'))
    firstList.forEach((element, i) => {
        addButton.click()
        list.children[i].querySelector('input').value = element.text
        if(list.children[i].querySelector('img').getAttribute('alt') == 'true'){
            list.children[i].querySelector('#check').click()
        }

    })

})




addButton.click()                                // creating first list item (trigger event)   

