(global => {
  const db = firebase.database().ref();
  let localDB = [],
      currentFilter = 'All';

  let title = $('#resource-title'),
      link = $('#resource-link'),
      topic = $('#resource-topic'),
      description = $('#resource-description'),
      level = $('#resource-level'),
      display = $('#root');

  db.on('value', snapshot => {
    localDB = [];
    display.empty();
    for (let key in snapshot.val()){
        let resource = new Resource(
            snapshot.val()[key].title,
            snapshot.val()[key].link,
            snapshot.val()[key].topic,
            snapshot.val()[key].description,
            snapshot.val()[key].level,
            key,
            snapshot.val()[key].likes,
            snapshot.val()[key].core
          )
        localDB.push(resource)
    };
    filteredDisplay();
  });

  $('#resource-form').on('submit', e => {
    e.preventDefault();
    if (title.val() && link.val() && description.val()){
      let resource = {
        title: title.val(),
        link: link.val(),
        topic: topic.val(),
        description: description.val(),
        core: false,
        level: level.val()
      }
      db.push().set(resource);
    }
  });

  $('#show-form').on('click', () => $('#resource-form').toggleClass('show') );

let allButton = document.getElementById('filterAll');
let beginButton = document.getElementById('filterBeginner');
let intermediateButton = document.getElementById('filterIntermediate');
let advancedButton = document.getElementById('filterAdvanced');

allButton.addEventListener('click',setFilter);

beginButton.addEventListener('click', setFilter);
intermediateButton.addEventListener('click', setFilter);
advancedButton.addEventListener('click', setFilter);


function setFilter(){
  $('.Filter button').removeClass('Filter-button--current');
  $(this).addClass('Filter-button--current');
  currentFilter = this.innerHTML;
  filteredDisplay();
}
function filteredDisplay(){
  display.empty();
  for (index in localDB){
    if (currentFilter === localDB[index].level || currentFilter === 'All'){
      localDB[index].display(display);
    }
  }
}

})(window);
