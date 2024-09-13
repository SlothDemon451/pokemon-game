const input = document.getElementById("search-input");
const search = document.getElementById("search-button");
const pokemon = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");
const pokemonImage = document.getElementById("image");
const power = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const spAttack = document.getElementById("special-attack");
const spDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const fetchData = async () => {
  try{
    const inputValue = input.value.toLowerCase()
    const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputValue}`);
    const data = await res.json();
    findPokemon(data)
  }catch (err){
      alert("Pokémon not found")
      console.log(err)
  }
}

const findPokemon = (data) => {
     const { name, id, height, weight, stats, sprites, types } = data
     const { front_default } = sprites

      pokemon.innerText = name.toUpperCase()
      pokemonId.innerText = `#${id}`
      pokemonWeight.innerText = `Weight: ${weight}`
      pokemonHeight.innerText = `Height: ${height}`
      pokemonImage.innerHTML = `<img id="sprite" src="${front_default}" />`

      stats.forEach((item) => {
        const { base_stat, stat } = item
        const { name } = stat
        if(name === "hp"){
          hp.innerText = base_stat
        }else if(name === "attack"){
          attack.innerText = base_stat
        }else if(name === "defense"){
          defense.innerText = base_stat
        }else if(name === "special-attack"){
          spAttack.innerText = base_stat
        }else if(name === "special-defense"){
          spDefense.innerText = base_stat
        }else if(name === "speed"){
          speed.innerText = base_stat
        }
      })
      power.innerHTML = ""
      types.forEach((item) => {
        const { type } = item
        const { name } = type
        power.innerHTML += `<span class="power">${name}</span>`
      })
}

search.addEventListener("click", ()=>{
  if(input.value){
    fetchData()
  }else{
    alert("Please Enter Name or ID of Pokemon")
  }
})