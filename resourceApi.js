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
            </div>
          </div>
        </div>
        <div class='Resource-description'>
          <p>${this.description}</p>
        </div>
        <div class='Resource-info'>
        </div>
          <div class='Resource-likes'>
            <p>${this.likes} likes</p>
          </div>
      </div>
    `)
  }
}
