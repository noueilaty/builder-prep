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
          <p id="${this.id}"> <span onclick="likesCC(this)" class="fontawesome-thumbs-up"> ${this.likes}</span> <span onclick="dislikesCC(this)" class="fontawesome-thumbs-down"></span></p>
        </div>
      </div>
    `);
  }

}

function likesCC(a){
  let paragraphElement = a.parentElement
  let spanElementValue = a.innerHTML
  let attr1 = paragraphElement.getAttribute("id")
  let valueLikes = parseInt(spanElementValue);
  valueLikes += 1
   db.child(attr1).update({
     likes:valueLikes
   })
}

function dislikesCC(a){
  let paragraphElement = a.parentElement
  let valueOfLikes = a.previousElementSibling.innerHTML
  let attr1 = paragraphElement.getAttribute("id")
  let valueLikes = parseInt(valueOfLikes);
  valueLikes -= 1
   db.child(attr1).update({
     likes:valueLikes
   })
}
