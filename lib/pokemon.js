
const cardTemplate = document.getElementById("cardTemplate")
const cardsContainer = document.getElementById("cardsContainer")
const infoTemplate = document.getElementById("infoTemplate");
const infoContainer = document.getElementById("infoContainer");


fetch("https://pokeapi.co/api/v2/pokemon?limit=300&offset=0")
  .then((response) => response.json())
  .then((data) => {
    //console.log(data.results);
    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((response) => response.json())
        .then((pokemonData) => {
          console.log(pokemonData);
          const clone = cardTemplate.content.cloneNode(true);
          clone.querySelector("h2").textContent = pokemon.name;
          clone.querySelector("img").src = pokemonData.sprites.front_default;
          clone.querySelector("p").textContent = pokemonData.types
            .map((type) => type.type.name)
            .join(", ");
          // NEW CODE FOR THIS SECTION:
          clone.querySelector("a").addEventListener("click", (event) => {
            event.preventDefault();
            infoContainer.innerHTML = "";
            const infoClone = infoTemplate.content.cloneNode(true);
            infoClone.querySelector("h2").textContent = pokemon.name;
            infoClone.querySelector("img").src =
              pokemonData.sprites.front_default;
            infoClone.querySelector("p").textContent = pokemonData.types
              .map((type) => type.type.name)
              .join(", ");
            infoContainer.innerHTML = "";
            infoContainer.appendChild(infoClone);
          });
          cardsContainer.appendChild(clone);
        });
    });
  });
