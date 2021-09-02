let searchMessage = document.getElementById('search-message');

const getUserInput = () => {
    const fieldInput = document.getElementById('search-field');
    const userText = fieldInput.value;
    fieldInput.value = '';
    searchMessage.innerText = '';

    if (userText == '') {
        searchMessage.innerText = 'Please write something!';
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${userText}`;
        // fetching data from the API
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data))
            .catch(error => displayError(error));
    }
};

const displayError = error => {
    searchMessage.innerText = error;
}


const displaySearchResult = books => {
    const resultFound = books.numFound;
    searchMessage.innerText = ` We found ${resultFound} books for you.
    `;
    // console.log(books);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const bookList = books.docs;
    bookList.forEach(eachElement => {
        const bookName = eachElement.title;
        const authorName = eachElement.author_name;
        const publisherName = eachElement.publisher;
        const firstPublished = eachElement.first_publish_year;

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card-body">
        <h5 class="card-title">${bookName}</h5>
        <p class="card-text">Author: ${authorName}</p>
        <p class="card-text">Publisher: ${publisherName}</p>
        <p class="card-text">First Published: ${firstPublished}</p>
        </div>
    `;
        searchResult.appendChild(div);
    });
};
