// How to access the right endpoint in the API? 
// Find in the documentation where you can get a list of Pokémon
// I'm going to get the first classic 151 Pokémon,
// but you can get all 1302+ that exist if you want 
const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151"

// How do I connect the HTML with JS? querySelector
const container = document.querySelector("#cardsContainer") // Where to put the cards
const template = document.querySelector("#cardTemplate") // Our blueprint we will use for the card
const infoContainer = document.querySelector("#infoContainer") // Where the details card will be
const infoTemplate = document.querySelector("#infoTemplate") // Our blueprint for the detail card

// THE FETCH WORKFLOW:
// 1. fetch() → "Hey API, give me data from this URL"
// 2. .then() → "When you get it, convert it to JSON"  
// 3. .then() → "When that's done, let me work with the data"

fetch(url)
   .then(response => response.json())
   .then((data) => {
      // console.log(data) // Always use console.log to know what you're working with
      
      // Loop through each Pokémon in the results
      data.results.forEach((result) => {
         // console.log("pokemon:", result.name, result.url)
         
         // I need a second fetch to get the Pokémon's details from the URL that came with the result
         fetch(result.url)
            .then(response => response.json())
            .then((pokemon) => {
               // console.log("details of pokemon", pokemon)
               
               // STEP 1: CLONE TEMPLATE
               const clone = template.content.cloneNode(true);
               
               // STEP 2: FILL THE TEMPLATE WITH POKÉMON INFO
               clone.querySelector("img").src = pokemon.sprites.front_default
               clone.querySelector("h2").textContent = pokemon.name
               clone.querySelector("p").textContent = `Weight: ${pokemon.weight}`
               
               // STEP 3: ADD INTERACTIVITY 
               // When I click on a card link I want to show the details card of that Pokémon
               clone.querySelector("a").addEventListener("click", (event) => {
                  // Stop the link's default behavior
                  event.preventDefault();
                  // console.log("Clicked on:", pokemon.name)
                  
                  // Clean the previous info in the container
                  infoContainer.innerHTML = "";
                  
                  // Clone the new template we will use
                  const infoClone = infoTemplate.content.cloneNode(true);

                  // Fill the info template with data
                  infoClone.querySelector("img").src = pokemon.sprites.front_shiny
                  infoClone.querySelector("h2").textContent = pokemon.name
                  infoClone.querySelector("p").textContent = pokemon.types 
                     .map((type) => type.type.name) // Extract name from each type
                     .join(", "); // Join with commas
                  
                  // Add the new template to the HTML            
                  infoContainer.appendChild(infoClone);
               })
               
               // STEP 4: ADD THE TEMPLATE TO HTML
               container.appendChild(clone)
               console.log("Added Pokémon:", pokemon.name)
            })
      })
   })