(global => {
  const db = firebase.database().ref();

  let title = $('#resource-title'),
      link = $('#resource-link'),
      topic = $('#resource-topic'),
      description = $('#resource-description'),
      display = $('#root');

  db.on('value', snapshot => {
    let localDB = [];
    display.empty();
    for (let key in snapshot.val()){
      if (!snapshot.val()[key].core){
        let resource = new Resource(
            snapshot.val()[key].title,
            snapshot.val()[key].link,
            snapshot.val()[key].topic,
            snapshot.val()[key].description,
            key,
            snapshot.val()[key].likes,
            snapshot.val()[key].core
          ).display(display);
    }};
  });

  $('#resource-form').on('submit', e => {
    e.preventDefault();
    if (title.val() && link.val() && description.val()){
      let resource = {
        title: title.val(),
        link: link.val(),
        topic: topic.val(),
        description: description.val(),
        core: false
      }
      db.push().set(resource);
    }
  });

  $('#show-form').on('click', () => $('#resource-form').toggleClass('show') );

})(window);
