//The entire menu item
const booksMenu = document.querySelector('#books_menu');
const booksMenuLabel = document.querySelector('#books_menu_label');

//Book chapter/verse form
const bookForm = document.querySelector('#chapter_verse_form');

//Menu items
const oldTestMenuItems = document.getElementsByClassName('old_testament_books_item');
const newTestMenuItems = document.getElementsByClassName('new_testament_books_item');

//Radio buttons
const testamentBtns = document.getElementsByName('testament_btn');

//Submit button
const submitBtn = document.getElementById('submit_btn');

//Selected book variable
let selectedBook = null;

window.onload = () => {
    //hide menus
    booksMenu.style.display = booksMenuLabel.style.display = 'none';
    //hide form
    bookForm.style.display = 'none';
    //Hide submit button
    submitBtn.style.display = 'none';
    //if submit button is clicked
    submitBtn.onclick = () => {
        const book = booksMenu.value;
        const chapter = document.querySelector('#chapter').value;
        const verse = document.querySelector('#verse').value;
        window.location.href = `/app/reading?book=${book}&chapter=${chapter}&verse=${verse}`;
    }
}

//Auxiliary function
const showBooksMenuAndForm = () => {
    booksMenuLabel.style.display = 'inline-block';
    booksMenu.style.display = 'inline-block';
    bookForm.style.display = submitBtn.style.display = 'block';
}

//If old btn is checked, show only old testament menu items
testamentBtns.forEach( btn => {
    btn.onclick = () => {
        if (btn.value == 'old') {
            showBooksMenuAndForm();
            for (let i=0; i<oldTestMenuItems.length; i++)
                oldTestMenuItems[i].style.display = 'block';
            for (let i=0; i<newTestMenuItems.length; i++)
                newTestMenuItems[i].style.display = 'none';
        }
        else if (btn.value == 'new') {
            showBooksMenuAndForm();
            for (let i=0; i<oldTestMenuItems.length; i++)
                oldTestMenuItems[i].style.display = 'none';
            for (let i=0; i<newTestMenuItems.length; i++)
                newTestMenuItems[i].style.display = 'block';
        }
    }   
});

