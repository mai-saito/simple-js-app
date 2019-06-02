var repository =[
  {
    name:'Bulbasaur',
    height: 0.7,
    types :['Grass', 'Poison']
  },
  {
    name:'Charmander',
    height: 0.6,
    types :['Fire']
  },
  {
    name:'Squirtle',
    height: 0.5,
    types :['Water']
  }
];

for (var i = 0; i < repository.length; i++){
    var pokemon = repository[i];
  if (pokemon.height > 0.6) {
    document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') Wow, that\'s big!' +'</p>');
  } else {
    document.write('<p>'+pokemon.name + ' (height: ' + pokemon.height + ')'+'</p>');
  }
}
