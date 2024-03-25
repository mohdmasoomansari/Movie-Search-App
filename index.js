async function loadData(name) {
    try {
        let title = name;
        let response = await fetch(`http://www.omdbapi.com/?s=${encodeURIComponent(title)}&apikey=7685a67e`);
        if (!response.ok) {
            throw new Error('Failed to fetch data:', response.status);
        }
        let data = await response.json();
        console.log(data);
        if (data.Response === "True") {
            renderUi(data.Search);
        } else {
            throw new Error('No movies found with that title.');
        }
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

loadData("race");

let output = document.getElementById("output");
function renderUi(movieArray) {
    try {
        output.innerHTML = "";
        movieArray.forEach(movie => {
            let p = document.createElement("div");
            let img = document.createElement("img");
            img.src = movie.Poster;
            p.appendChild(img);
            output.appendChild(p);
        });
    } catch (error) {
        console.error('Error rendering UI:', error);
    }
}

let input = document.querySelector("#input");
input.addEventListener('input', () => {
    output.innerHTML = "";
    loadData(input.value);
});