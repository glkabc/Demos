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

    request.onsuccess = () => {
        console.log('Database opened successfully');
        db = request.result;
        dispalyData();
    }

    request.onupgradeneeded = e => {
        let bd = e.target.result;
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
        var request = objectStore.add(newItem);

        request.onsuccess = () => {
            titleInput = '';
            bodyInput = '';
        }

        transaction.oncomplete = () => {
            console.log('Transaction completed: database modification finished.');
            dispalyData();
        }

        request.onerror = () => {
            console.log('Transaction not opened due to error');
        }
    }

    function dispalyData() {
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

    form.onsubmit = addData;
}