const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* 添加图片循环 */
for (let i = 1; i <= 5; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `./images/pic${i}.jpg`);

    // 方式一实现改变图片
    // newImage.onclick = () => {
    //     displayedImage.setAttribute('src',`./images/pic${i}.jpg`);
    // };

    // 方式二实现改变图片
    // newImage.onclick = changImage;

    thumbBar.appendChild(newImage);
}

/* 编写 变暗/变量 按钮功能 */
btn.onclick = function index() {
    if (overlay.style.opacity === "") {
        overlay.style.opacity = "0.5";
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else {
        overlay.style.opacity = "";
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}

function changImage (e) {
    if (e.target.getAttribute('src').slice(12) != displayedImage.getAttribute('src').slice(12)) {
        displayedImage.setAttribute('src',`./images/pic${e.target.getAttribute('src').slice(12)}`);
    }
}

// 事件委托
thumbBar.onclick = (e) => {
    changImage(e);
}