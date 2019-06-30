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
      // uncomment the next line to know what json.results stores
      // console.log('response object ', json);
      json.results.forEach(function (item){
        var pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon)
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
      console.log('Item details', details);
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
  button.addEventListener('click', () => {
    showDetails(pokemon)
  });
}

/*************
Display modal about pokemon details
**************/
var $modalContainer = document.querySelector('#modal-container');

function showDetails(pokemon){
  pokemonRepository.loadDetails(pokemon).then(function() {
    showModal(pokemon);
  });
}

function showModal(pokemon) {
  // Clear all exisiting modal content
  $modalContainer.innnerHTML = ' ';

  var modal = document.createElement('div');
  modal.classList.add('modal');

  var exist = $modalContainer.querySelector('.modal');

  // Add the new modal content
  var closeButton = document.createElement('button');
  closeButton.classList.add('modal-close');
  closeButton.innerText = 'Close';
  closeButton.addEventListener('click', hideModal);

  if(exist)$modalContainer.removeChild(exist);

  var name = document.createElement('h1');
  name.innerText = pokemon.name;

  var height = document.createElement('p');
  height.innerText = "Height: " + pokemon.height;

  var image = document.createElement('img');
  image.setAttribute('src', pokemon.imageUrl);

  modal.appendChild(closeButton);
  modal.appendChild(name);
  modal.appendChild(height);
  modal.appendChild(image);
  console.log('Modal',$modalContainer);

  $modalContainer.appendChild(modal);

  $modalContainer.classList.add('is-visible');
}

/**************
Hide pokemon details
***************/

function hideModal() {
  $modalContainer.classList.remove('is-visible');
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')){
    hideModal();
  }
})

pokemonRepository.loadList().then(function(){
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    addListItem(pokemon);
  });
});
})();
