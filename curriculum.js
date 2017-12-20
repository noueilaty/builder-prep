(global => {
  const db = firebase.database().ref();

  let display = $('#root'),
      localDB = [];

  db.once('value').then( snapshot => {
    for (let key in snapshot.val()){
      localDB = [...localDB,
        new Resource(
          snapshot.val()[key].title,
          snapshot.val()[key].link,
          snapshot.val()[key].topic,
          snapshot.val()[key].description,
          key,
          snapshot.val()[key].likes
        )];
    }
    localDB.forEach(resource => resource.display(display));
  });

})(window);
