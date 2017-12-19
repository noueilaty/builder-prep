(global => {
  const db = firebase.database().ref();

  let title = $('#resource-title'),
      link = $('#resource-link'),
      topic = $('#resource-topic'),
      localDB = [];

  db.on('value', snapshot => {
    localDB = [];
    for (let key in snapshot.val()){
      localDB = [...localDB,
        new Resource(
          snapshot.val()[key].title || '',
          snapshot.val()[key].link || '',
          snapshot.val().topic || '',
          key,
          snapshot.val()[key].likes || 0
        )];
    }
    localDB.forEach(resource => resource.updateDB());
    console.log(localDB);
  });

  $('#resource-form').on('submit', e => {
    e.preventDefault();
    if (title.val() && link.val()){
      let resource = {
        title: title.val(),
        link: link.val(),
        topic: topic.val()
      }
      db.push().set(resource);
    }
  });
})(window);
