var repository =[
  ['Bulbasaur',
  0.7,
  ['Grass', 'Poison']],
  ['Charmander',
  0.6,
  ['Fire']],
  ['Squirtle',
  0.5,
  ['Water']]
];

for (var i = 0; i < repository.length; i++){
  if (repository[i][1] > 0.6) {
  document.write(repository[i][0] + ' (height: ' + repository[i][1] + ') Wow, that\'s big!');
} else {
  document.write(repository[i][0] + ' (height: ' + repository[i][1] + ')');
}
}
