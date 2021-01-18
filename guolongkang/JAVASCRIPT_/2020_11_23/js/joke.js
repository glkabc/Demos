const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');
const american = document.getElementById('american');
const metric = document.getElementById('metric');


let people = ['怪兽威利','大老爹','圣诞老人'];
let place = ['肯德基','迪士尼','白宫'];
let someThing = ['自燃了','在人行道化成了一坨泥','变成一条鼻涕虫爬走了'];

function randomValue(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function addStory() {
    let name = '李雷';
    let weight = 130;
    let temperature = 34;
    if (customName.value != '') {
        name = customName.value;
    }

    if(american.checked) {
        weight = Math.round(300);
        temperature = Math.round(94);
    }
    let peopleName = randomValue(people);
    story.textContent = `今天气温 ${temperature} 摄氏度，${peopleName}出去遛弯。当走到${randomValue(place)}门前时，突然就${randomValue(someThing)}。人们都惊呆了，${name}全程目睹但并没有慌，因为${peopleName}是一个 ${weight} 公斤的胖子，天气又辣么热。`;
    story.style.visibility = 'visible';
}


randomize.addEventListener('click',addStory);