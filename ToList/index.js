const input = document.querySelector('.input input');
const add = document.querySelector('.add');
const itemList = document.querySelector('.item ul');
const showAllButton = document.querySelector('button.all');
const showFinish = document.querySelector('button.finish');
const showUnfinished = document.querySelector('button.unfinished');
let itemsNews = [];

function addItem(e) {
  // console.log(e.target)
  if (input.value) {
    let value = input.value;

    let liItem = document.createElement('li');
    let span = document.createElement('span');
    let button = document.createElement('button');

    span.textContent = value;
    button.textContent = '删除';

    itemList.appendChild(liItem);
    liItem.appendChild(span);
    liItem.appendChild(button);

    input.value = '';
  }
}

function del(e) {
  if (e.target.type === "submit") {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    input.focus();
  }
  
  if (e.target.type != 'submit') {
    // console.log(e.target)
    e.target.setAttribute('class','finish');
    e.target.parentNode.setAttribute('class','finish');
  }
}

function show(e) {
  // console.log(e);
  itemsNews = itemList.children;
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  
  if (e.target.getAttribute('class') === "all") {
    for (let i = 0; i < itemsNews.length; i++) {
      itemList.appendChild(itemsNews[i]);
    }
  }
}




add.addEventListener('click',addItem);
itemList.addEventListener('click',del);
showAllButton.addEventListener('click',show);
showFinish.addEventListener('click',show);
showUnfinished.addEventListener('click',show);
