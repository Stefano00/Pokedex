# Consume the PokeApi 🐞
## Pokedex using Ajax, JQuery and Bootstrap
### This project is about the consume of an Api. The Api to consume is from [PokeApi](https://pokeapi.co/) of Pokemón
To consume the Api, i use Ajax with the next code below
```
           $.ajax({url:"https://pokeapi.co/api/v2/pokemon/"+name+"/", dataType:'json', success:function(respuesta){}});
```
The name is the pokemon to search. The name can be its number or name.
In the **function(respuesta)** the Ajax get us the list of object about the pokemons.
