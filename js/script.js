(function(){
var pokemonRepository = (function(){
  var repository =[];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll(){
    return repository;
  }

  function add(item){
    repository.push(item);
  }

  function loadList(){
    return fetch(apiUrl).then(function(response){
      return response.json();
    }).then(function(json){
      json.results.forEach(function (item){
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function(e){
      console.error(e);
    })
  }

  function loadDetails(item){
    var url = item.detailsUrl;
    return fetch(url).then(function(response){
      return response.json();
    }).then(function(details){
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = Object.keys(details.types);
    }).catch(function(e){
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

var $pokemonList = document.querySelector('.pokemon-list');

function addListItem(pokemon){
  var listItem = document.createElement('li');
  var button = document.createElement('button');
  button.innerText = pokemon.name;
  listItem.appendChild(button);
  $pokemonList.appendChild(listItem);
  button.classList.add('pokemon-list_style');
  button.addEventListener('click', function() {
    showDetails(pokemon)
  });
}

function showDetails(pokemon){
  pokemonRepository.loadDetails(pokemon);
  console.log(pokemon);
}

pokemonRepository.loadList().then(function(){
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    addListItem(pokemon);
  });
});
})();
