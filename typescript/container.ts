interface User {
  username: string;
  image: {
    png: string;
    webp: string;
  };
}

interface Reply {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  replyingTo: string;
  user: User;
}

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: User;
  replies: Reply[];
}

interface Data {
  currentUser: User;
  comments: Comment[];
}

fetch('./data.json')
  .then(res => res.json())
  .then((data: Data) => {
    renderComments(data.comments, data.currentUser.username);
  });

function renderComments(comments: Comment[], currentUser: string) {
  const container = document.getElementById("container");
  if (!container) return;

  comments.forEach(comment => {
    const isCurrent = comment.user.username === currentUser;
    const commentDiv = createCommentElement(comment.user, comment.content, comment.createdAt, comment.score, isCurrent);
    container.appendChild(commentDiv);

    const replylist = document.createElement("div");
    replylist.className = "replylist";
    container.appendChild(replylist);

    comment.replies.forEach(reply => {
      const isCurrent = reply.user.username === currentUser;
      const replyDiv = createReplyElement(reply.user, reply.replyingTo, reply.content, reply.createdAt, reply.score, isCurrent);
      replylist.appendChild(replyDiv);
    });
  });
};

function createCommentElement(user: User, content: string, time: string, score: number, isCurrent: boolean): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "comment";

  if(isCurrent){
    wrapper.innerHTML = `
        <div class="score-box">
            <img src="./images/icon-plus.svg" class="plus">
            <div class="score">${score}</div>
            <img src="./images/icon-minus.svg" class="minus">
        </div>
        <div class="name-box">
            <img src="${user.image.png}" alt="${user.username}">
            <div class="name">${user.username}</div>
            <div class="sign">you</div>
            <div class="time">${time}</div>
            <div class="icons">
                <div class="delete">
                    <img src="./images/icon-delete.svg">
                    <div>Delete</div>
                </div>
                <img src="./images/icon-edit.svg">Edit
            </div>
        </div>
        <div class="content">${content}</div>
    `;
  } else {
    wrapper.innerHTML = `
        <div class="score-box">
            <img src="./images/icon-plus.svg" class="plus">
            <div class="score">${score}</div>
            <img src="./images/icon-minus.svg" class="minus">
        </div>
        <div class="name-box">
            <img src="${user.image.png}" alt="${user.username}">
            <div class="name">${user.username}</div>
            <div class="time">${time}</div>
            <div class="icons">
                <img src="./images/icon-reply.svg">Reply
            </div>
        </div>
        <div class="content">${content}</div>
    `;
    };
  return wrapper;
};

function createReplyElement(user: User, replyingTo: string, content: string, time: string, score: number, isCurrent: boolean): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.className = "reply";

  if(isCurrent){
      wrapper.innerHTML = `
        <div class="score-box">
            <img src="./images/icon-plus.svg" class="plus">
            <div class="score">${score}</div>
            <img src="./images/icon-minus.svg" class="minus">
        </div>
        <div class="name-box">
            <img src="${user.image.png}" alt="${user.username}">
            <div class="name">${user.username}</div>
            <div class="sign">you</div>
            <div class="time">${time}</div>
            <div class="icons">
                <div class="delete">
                    <img src="./images/icon-delete.svg">
                    <div>Delete</div>
                </div>
                <img src="./images/icon-edit.svg">Edit
            </div>
        </div>
        <div class="content">
            <span class="significance">@${replyingTo}</span> ${content}
        </div>
    `;
  } else {
      wrapper.innerHTML = `
        <div class="score-box">
            <img src="./images/icon-plus.svg" class="plus">
            <div class="score">${score}</div>
            <img src="./images/icon-minus.svg" class="minus">
        </div>
        <div class="name-box">
            <img src="${user.image.png}" alt="${user.username}">
            <div class="name">${user.username}</div>
            <div class="time">${time}</div>
            <div class="icons">
                <img src="./images/icon-reply.svg">Reply
            </div>
        </div>
        <div class="content">
            <span class="significance">@${replyingTo}</span> ${content}
        </div>
    `;
  };
  return wrapper;
};