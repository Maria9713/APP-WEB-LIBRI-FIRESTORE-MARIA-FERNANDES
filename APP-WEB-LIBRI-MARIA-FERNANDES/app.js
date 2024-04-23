/*
########## LISTAGEM DE LIVROS E AUTORES ########## 
*/

const livroList = document.querySelector('#book-list');

function renderBook(doc){


    // CRIAÇÃO DOS ELEMENTOS HTML
    let li = document.createElement('li');
    let titulo = document.createElement ('span');
    let autor = document.createElement ('span');
    let excluir = document.createElement ('div');

    excluir.textContent = "X";

    // CARREGA OS DADOS NOS ELEMENTOS HTML:
    li.setAttribute('data-id', doc.id);
    titulo.textContent = doc.data().titulo;
    autor.textContent = doc.data().autor;

    // ADICIONANDO OS DADOS DE AUTOR E TITULO NA TAG LI:
    li.appendChild(titulo);
    li.appendChild(autor);
    li.appendChild(excluir);


    /* TRAVA A AÇÃO NO BOTÃO X PARA A EXCLUSÃO DO ARQUIVO*/ 
    excluir.addEventListener('click', (event)=>{
        let id = event.target.parentElement.getAttribute('data-id');
        // alert(id)
        db.collection('libri-firestore').doc(id).delete().then(()=>{
            window.location.reload();
        })
        
    });

    // ADICIONANDO O LI NA TAG UL:
    livroList.appendChild(li);
}


db.collection('libri-firestore')
    .get()
    .then(
        (snapshot)=>{
            // console.log(snapshot.docs)
            snapshot.docs.forEach(doc => {
                console.log(doc.data())
                renderBook(doc)

            });
        }
    )

/*
########## INSERÇÃO DE LIVROS E AUTORES ########## 
*/  

const form  = document.querySelector('#add-book-form');

form.addEventListener('submit', (event)=>{

    event.preventDefault();

    console.log(form.autor.value);

    db.collection('libri-firestore').add({
        autor: form.autor.value,
        titulo: form.titulo.value
    }).then(()=>{
        form.autor.value = '';
        form.titulo.value = '';
        window.location.reload( );
    });

});