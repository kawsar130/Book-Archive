const getUserInput = () => {
    const fieldInput = document.getElementById('search-field');
    const userText = fieldInput.value;
    fieldInput.value = '';

    const url = `https://openlibrary.org/search.json?q=${userText}`;

    // fetching data from the API
    fetch(url).then(res => res.json()).then(data => searchResult(data));
};

const searchResult = books => {
    const resultFound = books.numFound;
    console.log(books);
    const bookList = books.docs;
    console.log(bookList);
};