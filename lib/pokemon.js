const container = document.querySelector("#cardsContainer")
const template = document.querySelector("#cardTemplate")
const infoTemplate = document.getElementById("infoTemplate");
const infoContainer = document.getElementById("infoContainer");

const url = "https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0"

fetch(url)
  .then(response => response.json())
  .then((data) => {
    data.results.forEach((result) => {
      //console.log(result.url)
      fetch(result.url)
      .then(response => response.json())
      .then((pokemon) => {

        const clone = template.content.cloneNode(true);
        clone.querySelector("img").src = pokemon.sprites.front_default
        clone.querySelector("h2").textContent = pokemon.name
        clone.querySelector("p").textContent = `weight: ${pokemon.weight}`

        // NEW CODE FOR THE INFO CARD:
        clone.querySelector("a").addEventListener("click", (event) => {
          event.preventDefault();
          infoContainer.innerHTML = "";
          const infoClone = infoTemplate.content.cloneNode(true);
          infoClone.querySelector("h2").textContent = pokemon.name;
          infoClone.querySelector("img").src = pokemon.sprites.front_default;
          // how to interate in the key types to get each type
          infoClone.querySelector("p").textContent = pokemon.types
            .map((type) => type.type.name)
            .join(", ");
          // end of the interation
          infoContainer.innerHTML = "";
          infoContainer.appendChild(infoClone);
        });
        // END OF THE NEW CODE

        container.appendChild(clone);


      })
    })
  })
