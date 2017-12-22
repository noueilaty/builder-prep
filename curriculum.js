(global => {
  const db = firebase.database().ref();

  let display = $('#root'),
      localDB = [];

  db.once('value').then( snapshot => {
    for (let key in snapshot.val()){
      if (snapshot.val()[key].core){
        let resource = new Resource(
            snapshot.val()[key].title,
            snapshot.val()[key].link,
            snapshot.val()[key].topic,
            snapshot.val()[key].description,
            snapshot.val()[key].level || '',
            key,
            snapshot.val()[key].likes,
            snapshot.val()[key].core
          ).display(display);
    }};
  });

})(window);
