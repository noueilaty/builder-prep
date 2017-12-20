(global => {
  const db = firebase.database().ref();

  let title = $('#resource-title'),
      link = $('#resource-link'),
      topic = $('#resource-topic'),
      description = $('#resource-description'),
      display = $('#resource-display'),
      localDB = [];

  db.once('value').then( snapshot => {
    for (let key in snapshot.val()){
      localDB = [...localDB,
        new Resource(
          snapshot.val()[key].title || '',
          snapshot.val()[key].link || '',
          snapshot.val()[key].topic || '',
          snapshot.val()[key].description || '',
          key,
          snapshot.val()[key].likes || 0
        )];
    }
    localDB.forEach(resource => resource.display(display));
  });

  $('#resource-form').on('submit', e => {
    e.preventDefault();
    if (title.val() && link.val() && description.val()){
      let resource = {
        title: title.val(),
        link: link.val(),
        topic: topic.val(),
        description: description.val()
      }
      db.push().set(resource);
    }
  });

})(window);
