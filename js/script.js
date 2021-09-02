let searchMessage = document.getElementById('search-message');
searchMessage.style.fontWeight = "bold";
const searchResult = document.getElementById('search-result');

const getUserInput = () => {
    const fieldInput = document.getElementById('search-field');
    const userText = fieldInput.value;
    fieldInput.value = '';
    searchMessage.innerText = 'Be patient, I am Loading!';
    searchResult.textContent = '';

    if (userText == '') {
        searchMessage.innerText = 'Please write something!'; // message for empty field.
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

    const bookList = books.docs;

    // looping through the book list
    bookList.forEach(eachElement => {
        const bookName = eachElement.title;
        const authorName = eachElement.author_name;
        const publisherName = eachElement.publisher;
        const firstPublished = eachElement.first_publish_year;
        const coverPhotoId = eachElement.cover_i;

        // cover photo link
        const url = `https://covers.openlibrary.org/b/id/${coverPhotoId}-M.jpg`;

        // update dynamic content
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <img src="${url}" height="300px" class="card-img-top w-auto" alt="...">
        <div class="card-body">
        <h4 class="card-title">${bookName}</h4>
        <h6 class="card-text">Author: ${authorName}</h6>
        <p class="card-text">Publisher: ${publisherName}</p>
        <p class="card-text">First Published: ${firstPublished}</p>
        </div>
    `;
        searchResult.appendChild(div);
    });
};
