const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

let db;
// 必须在onload中使用indexDB
window.onload = () => {
    let request = window.indexedDB.open('notes', 1);

    request.onerror = () => {
        console.log('Database failed to open');
    }

    // 因为是异步的所以要在成功时调用
    request.onsuccess = () => {
        console.log('Database opened successfully');
        db = request.result;
        dispalyData();
    }

    request.onupgradeneeded = e => {
        let db = e.target.result;
        let objectStore = db.createObjectStore('notes', { keyPath: 'id', autoIncrement:true });
        objectStore.createIndex('title', 'title', { unique: false });
        objectStore.createIndex('body', 'body', { unique: false });

        console.log('Database setup complete');
    }

    function addData(e) {
        e.preventDefault();
        let newItem = {title: titleInput.value, body: bodyInput.value};
        let transaction = db.transaction(['notes'], 'readwrite');
        let objectStore = transaction.objectStore('notes');
        let request = objectStore.add(newItem);

        // 成功后清除输入框的内容
        request.onsuccess = () => {
            titleInput.value = '';
            bodyInput.value = '';
        }

        // 更新完毕后再更新页面内容
        transaction.oncomplete = () => {
            console.log('Transaction completed: database modification finished.');
            dispalyData();
        }

        request.onerror = () => {
            console.log('Transaction not opened due to error');
        }
    }

    function dispalyData() {
        // 开始渲染前，清除已显示的内容
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }

        let objectStore = db.transaction('notes').objectStore('notes');
        objectStore.openCursor().onsuccess = e => {
            let cursor = e.target.result;

            if (cursor) {
                let listItem = document.createElement('li');
                let h3 = document.createElement('h3');
                let para = document.createElement('p');

                listItem.appendChild(h3);
                listItem.appendChild(para);
                list.appendChild(listItem);

                h3.textContent = cursor.value.title;
                para.textContent = cursor.value.body;

                listItem.setAttribute('data-note-id', cursor.value.id);

                let deleteBtn = document.createElement('button');
                listItem.appendChild(deleteBtn);
                deleteBtn.textContent = 'Delete';

                deleteBtn.onclick = deleteItem;
                cursor.continue();
            } else {
                if (!list.firstChild) {
                    let listItem = document.createElement('li');
                    listItem.textContent = 'No notes stroed';
                    list.appendChild(listItem);
                }
            }
            console.log('Notes all display');
        }
    }

    function deleteItem(e) {
        let nodeId = Number(e.target.parentNode.getAttribute('data-note-id'));

        let transaction = db.transaction(['notes'], 'readwrite');
        let objectStore = transaction.objectStore('notes');
        let request = objectStore.delete(nodeId);
        console.log(request.readyState);

        transaction.oncomplete = () => {
            e.target.parentNode.parentNode.removeChild(e.target.parentNode);
            console.log('note ' + nodeId + ' deleted');

            if (!list.firstChild) {
                let listItem = document.createElement('li');
                listItem.textContent = 'No notes store.'
                list.appendChild(listItem);
            }
        }
    }

    form.onsubmit = addData;
}