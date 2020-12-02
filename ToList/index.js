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
    show(e);
  }
}

function del(e) {
  if (e.target.type === "submit") {
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    input.focus();
  }
  
  if (e.target.type != 'submit' && e.srcElement.nodeName != 'UL') {
    // console.log(e.srcElement.nodeName)
    e.target.setAttribute('class','finish');
    e.target.parentNode.setAttribute('class','finish');
  }
}

function show(e) {
  // console.log(e)
  showAllButton.style.backgroundColor = '#eee';
  showFinish.style.backgroundColor = '#eee';
  showUnfinished.style.backgroundColor = '#eee';

  if (e.target.getAttribute('class') === "all" || e.target.getAttribute('class') === "add") {
    for (let i = 0; i < itemList.children.length; i++) {
      itemList.children[i].style.display = 'block';
    }
    showAllButton.style.backgroundColor = '#999';
  }

  if (e.target.getAttribute('class') === "finish") {
    for (let i = 0; i < itemList.children.length; i++) {
      if (itemList.children[i].getAttribute('class') === "finish") {
        itemList.children[i].style.display = 'block';
      } else {
        itemList.children[i].style.display = 'none';
      }
    }
    e.target.style.backgroundColor = '#999';
  }

  if (e.target.getAttribute('class') === "unfinished") {
    for (let i = 0; i < itemList.children.length; i++) {
      if (itemList.children[i].getAttribute('class') === "finish") {
        itemList.children[i].style.display = 'none';
      } else {
        itemList.children[i].style.display = 'block';
      }
    }
    e.target.style.backgroundColor = '#999';
  }
}




add.addEventListener('click',addItem);
itemList.addEventListener('click',del);
showAllButton.addEventListener('click',show);
showFinish.addEventListener('click',show);
showUnfinished.addEventListener('click',show);
