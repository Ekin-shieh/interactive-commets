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

    const commentWrapper = document.createElement("div");
    commentWrapper.className = "commentwrapper";
    commentWrapper.appendChild(commentDiv);

    const replyinput = document.createElement("div");
    replyinput.className = "replyinput hidden";
    replyinput.innerHTML = `
    <div class="bottom">
      <img src="./images/avatars/image-juliusomo.png">
      <textarea>@${comment.user.username} </textarea>
      <button class="reply-btn">REPLY</button>
    </div>
    `;
    commentWrapper.appendChild(replyinput);

    const replylist = document.createElement("div");
    replylist.className = "replylist";
    commentWrapper.appendChild(replylist);
    container.appendChild(commentWrapper);

    comment.replies.forEach(reply => {
      const isCurrent = reply.user.username === currentUser;
      const replyDiv = createReplyElement(reply.user, reply.replyingTo, reply.content, reply.createdAt, reply.score, isCurrent);
      const reply2input = document.createElement("div");
      reply2input.className = "reply2input hidden";
      reply2input.innerHTML = 
      `
      <div class="bottom">
        <img src="./images/avatars/image-juliusomo.png">
        <textarea>@${reply.user.username} </textarea>
        <button class="reply2btn">REPLY</button>
      </div>
      `;
      const replyWrapper = document.createElement("div");
      replyWrapper.className = "replywrapper";
      replyWrapper.appendChild(replyDiv);
      replyWrapper.appendChild(reply2input);
      replylist.appendChild(replyWrapper);
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
            <img class="photo" src="${user.image.png}" alt="${user.username}">
            <div class="name">${user.username}</div>
            <div class="sign">you</div>
            <div class="time">${time}</div>
            <div class="icons">
                <div class="delete">
                    <img src="./images/icon-delete.svg">
                    <div>Delete</div>
                </div>
                <div class="edit">
                  <img src="./images/icon-edit.svg">
                  <div>Edit</div>
                </div>
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
            <img class="photo" src="${user.image.png}" alt="${user.username}">
            <div class="name">${user.username}</div>
            <div class="time">${time}</div>
            <div class="icons">
              <div class="reply-icon">
                  <img src="./images/icon-reply.svg">
                  <div>Reply</div>
              </div>
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
            <img class="photo" src="${user.image.png}" alt="${user.username}">
            <div class="name">${user.username}</div>
            <div class="sign">you</div>
            <div class="time">${time}</div>
            <div class="icons">
                <div class="delete">
                    <img src="./images/icon-delete.svg">
                    <div>Delete</div>
                </div>
                <div class="edit">
                  <img src="./images/icon-edit.svg">
                  <div>Edit</div>
                </div>
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
            <img class="photo" src="${user.image.png}" alt="${user.username}">
            <div class="name">${user.username}</div>
            <div class="time">${time}</div>
            <div class="icons">
              <div class="reply-icon">
                  <img src="./images/icon-reply.svg">
                  <div>Reply</div>
              </div>
            </div>
        </div>
        <div class="content">
            <span class="significance">@${replyingTo}</span> ${content}
        </div>
    `;
  };
  return wrapper;
};