const db = firebase.database().ref();

class Resource {
  constructor(title, link, topic, description, id=0, likes=0, core=false){
    this.id = id;
    this.title = title;
    this.link = link;
    this.description = description;
    this.likes = likes;
    this.topic = topic;
    this.core = core;

    this.updateDB = this.updateDB.bind(this);
    this.display = this.display.bind(this);
    //this.likesCC = this.likesCC.bind(this);

  }

  updateDB () {
    db.child(this.id).update({
      id: this.id,
      title: this.title,
      link: this.link,
      likes: this.likes,
      topic: this.topic,
      core: this.core
    });
  }

  display(root) {
    this.updateDB();
    root.append(`
      <div class='Resource'>
        <h3 class='Resource-title'><a href='${this.link}'>${this.title}</a></h3>
        <p>${this.description}</p>
        <div class='Resource-info'>
          <p><strong>Topic:</strong> ${this.topic}</p>
          <p onclick="likesCC(this)">${this.likes} likes</p>
        </div>
      </div>
    `);
  }

}

function likesCC(a){
  let paragraphElement = a.innerHTML
  let valueLikes = parseInt(paragraphElement.split(" ",1)[0]);
  valueLikes += 1
  console.log(valueLikes)
}
