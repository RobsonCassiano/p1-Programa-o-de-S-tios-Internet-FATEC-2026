'use strict'

const API_URL = "https://api.disneyapi.dev/character";
const banner = document.getElementById("home-banner");
const container = document.getElementById("cards-container");
const template = document.getElementById("card-template");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const form = document.getElementById("searchForm");
const suggestions = document.querySelector(".suggestions");
const suggestionButtons = document.querySelectorAll(".suggestions button");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const statusText = document.getElementById("status");

let currentPage = 1;
let currentName = "";

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = searchInput.value.trim();

    if (!value) return;

    fadeOut(suggestions);


    statusText.textContent = "";

    fetchCharacters(value, 1);

    fadeIn(container);
});

function fadeOut(element) {
    element.classList.add("fade-out");
}

function fadeIn(element) {
    element.classList.remove("fade-out");
}


function CardComponent(data) {
    const clone = template.content.cloneNode(true);

    const img = clone.querySelector(".card-img");
    const title = clone.querySelector(".card-title");
    const film = clone.querySelector(".card-film");

    img.src = data.imageUrl;
    img.alt = data.name;

    title.textContent = data.name;
    film.textContent = data.films?.[0] || "Sem filme";

    return clone;
}

function renderList(list) {
    container.replaceChildren();

    list.slice(0, 12).forEach(item => {
        const card = CardComponent(item);
        container.appendChild(card);
    });
}

async function fetchCharacters(name, page = 1) {
    try {
        statusText.textContent = "Carregando...";

        const res = await fetch(`${API_URL}?name=${name}&page=${page}`);
        const data = await res.json();

        if (!data.data || data.data.length === 0) {
            statusText.textContent = "Nenhum resultado.";
            return;
        }

        statusText.textContent = "";

        renderList(data.data);

        pageInfo.textContent = `Página ${currentPage}`;
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = !data.info?.nextPage;

    } catch (err) {
        statusText.textContent = "Erro ao buscar dados.";
    }
}

nextBtn.addEventListener("click", () => {
    currentPage++;
    fetchCharacters(currentName, currentPage);
});

prevBtn.addEventListener("click", () => {
    currentPage--;
    fetchCharacters(currentName, currentPage);
});

document.querySelectorAll(".suggestions button").forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        searchInput.value = value;
        currentPage = 1;

        fetchCharacters(value, currentPage);
    });
});

searchInput.addEventListener("input", () => {
    const value = searchInput.value.trim();

    if (value === "") {

        fadeOut(container);

        setTimeout(() => {
            fadeIn(suggestions);
        }, 300);

        container.replaceChildren();


        currentPage = 1;
        pageInfo.textContent = "Página 1";
        prevBtn.disabled = true;
        nextBtn.disabled = true;

        statusText.textContent = "Sugestões populares:";
    }
});

fadeOut(suggestions);

setTimeout(() => {
    fetchCharacters(value, 1);
    fadeIn(container);
}, 300);

suggestionButtons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        searchInput.value = value;
        currentName = value;
        currentPage = 1;

        fetchCharacters(currentName, currentPage);
    });
});




