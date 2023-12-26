// userpostinfo.component.js

class UserPostInfoComponent {
  constructor() {
    this.element = document.querySelector('.post-info');
  }

  render(userId, posts) {
    const postTitles = posts.map(post => post.title);
    const userInfo = `User clicked with ID: ${userId}\nPosts:\n${postTitles.join('\n')}`;
    this.element.textContent = userInfo;
  }

  applyStyles() {
    Object.assign(this.element.style, {
      width: '500px',
      height: '180px',
      backgroundColor: 'white',
      border: '1px solid #333',
      padding: '20px',
      margin: '20px auto',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '2%',
      boxShadow: '5px 5px 10px 0px rgba(0, 0, 0, 0.5)',
      fontSize:'18px',
    });

    this.element.addEventListener('mouseover', () => {
      this.element.style.transform = 'scale(1.1)';
      this.element.style.transition = 'transform 0.3s ease-in-out';
    });

    this.element.addEventListener('mouseout', () => {
      this.element.style.transform = 'scale(1)';
    });
  }
}

// userlist.component.js

class UserListComponent {
  constructor() {
    this.element = document.querySelector('.user-list');
    this.userPostInfoComponent = new UserPostInfoComponent();
  }

  handleUserClick(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(resp => resp.json())
      .then(posts => {
        this.userPostInfoComponent.render(userId, posts);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });

    this.userPostInfoComponent.applyStyles();
  }
  
    renderUser(user) {
      const container = document.createElement('div');
      container.textContent = `${user.name} / ${user.email}`;
      container.addEventListener('click', () => this.handleUserClick(user.id));
      container.style.cursor = 'pointer';
      container.style.marginBottom = '5px';
      container.style.fontSize = '18px';
  
      container.addEventListener('mouseover', () => {
        container.style.textDecoration = 'underline';
      });
  
      container.addEventListener('mouseout', () => {
        container.style.textDecoration = 'none';
      });
  
      this.element.appendChild(container);
    }
  
    renderUsers(users) {
      users.forEach(user => this.renderUser(user));
    }
  }
  

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.json())
    .then(users => {
      const userListComponent = new UserListComponent();
      userListComponent.renderUsers(users);
    });
});
