const db = firebase.database().ref();

class Resource {
  constructor(title, link, topic, id=0, likes=0){
    this.id = id;
    this.title = title;
    this.link = link;
    this.likes = likes;
    this.topic = topic;

    this.updateDB = this.updateDB.bind(this);
  }

  updateDB () {
    db.child(this.id).update({
      id: this.id,
      title: this.title,
      link: this.link,
      likes: this.likes,
      topic: this.topic
    });
  }
}
