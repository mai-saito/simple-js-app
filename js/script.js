(function(){
var pokemonRepository = (function(){
  var repository =[
    {
      name:'Bulbasaur',
      height: 0.7,
      types:['Grass', 'Poison']
    },
    {
      name:'Charmander',
      height: 0.6,
      types:['Fire']
    },
    {
      name:'Squirtle',
      height: 0.5,
      types:['Water']
    }
  ];

  function getAll(){
    return repository;
  }

  function add(item){
    repository.push(item);
  }

  return {
    add: add,
    getAll: getAll,
  };
})();

pokemonRepository.add({
  name: 'Raichu',
  height: 0.8,
  types:['Electric']
});

var $pokemonList = document.querySelector('.pokemon-list');

function addListItem(pokemon){
  var listItem = document.createElement('li');
  var button = document.createElement('button');
  button.innerText = pokemon.name;
  listItem.appendChild(button);
  $pokemonList.appendChild(listItem);
  button.classList.add('pokemon-list_style');
  button.addEventListener('click', function(){
    showDetails(pokemon)
  });
}

function showDetails(pokemon){
  console.log(pokemon);
}

pokemonRepository.getAll().forEach(addListItem);
})();
