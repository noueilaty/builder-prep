const db = firebase.database().ref();

class Resource {
  constructor(title, link, topic, description, level, id=0, likes=0, core=false){
    this.id = id;
    this.title = title;
    this.link = link;
    this.description = description;
    this.likes = likes;
    this.topic = topic;
    this.core = core;
    this.level = level;

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
      core: this.core,
      level: this.level
    });
  }

  display(root) {
    this.updateDB();
    let icon
    if (this.topic == 'Python') {
      icon = '<i class="devicon-python-plain colored"></i>'
    } else if (this.topic == 'JavaScript') {
      icon = '<i class="devicon-javascript-plain colored"></i>'
    } else if (this.topic == 'HTML & CSS') {
      icon = '<i class="fa fa-code fa-1" aria-hidden="true"></i>'
    } else if (this.topic == 'Other') {
      icon = '<i class="fa fa-laptop fa-1" aria-hidden="true"></i>'

    }
    root.append(`
      <div class='Resource'>
        <div class='Resource-header'>
          <div class='Resource-icon'>
            ${icon}
          </div>
          <div class='Resource-titleTopicContainer'>
            <h3 class='Resource-title'><a href='${this.link}'>${this.title}</a></h3>
            <div class='Resource-topic'>
              <p> ${this.topic}</p>
              <p> ${this.level}</p>
              <p id="${this.id}"> <span onclick="likesCC(this)" class="fontawesome-thumbs-up"> ${this.likes}</span> <span onclick="dislikesCC(this)" class="fontawesome-thumbs-down"></span></p>
            </div>
          </div>
        </div>
        <div class='Resource-description'>
          <p>${this.description}</p>
        </div>
        <div class='Resource-info'>

        </div>


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
