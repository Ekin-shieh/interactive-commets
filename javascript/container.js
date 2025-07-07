fetch('./data.json')
    .then(function (res) { return res.json(); })
    .then(function (data) {
    renderComments(data.comments, data.currentUser.username);
});
function renderComments(comments, currentUser) {
    var container = document.getElementById("container");
    if (!container)
        return;
    comments.forEach(function (comment) {
        var isCurrent = comment.user.username === currentUser;
        var commentDiv = createCommentElement(comment.user, comment.content, comment.createdAt, comment.score, isCurrent);
        var commentWrapper = document.createElement("div");
        commentWrapper.className = "commentwrapper";
        commentWrapper.appendChild(commentDiv);
        var replyinput = document.createElement("div");
        replyinput.className = "replyinput hidden";
        replyinput.innerHTML = "\n    <div class=\"bottom\">\n      <img src=\"./images/avatars/image-juliusomo.png\">\n      <textarea>@".concat(comment.user, " </textarea>\n      <button class=\"reply-btn\">REPLY</button>\n    </div>\n    ");
        commentWrapper.appendChild(replyinput);
        var replylist = document.createElement("div");
        replylist.className = "replylist";
        commentWrapper.appendChild(replylist);
        container.appendChild(commentWrapper);
        comment.replies.forEach(function (reply) {
            var isCurrent = reply.user.username === currentUser;
            var replyDiv = createReplyElement(reply.user, reply.replyingTo, reply.content, reply.createdAt, reply.score, isCurrent);
            var reply2input = document.createElement("div");
            reply2input.className = "reply2input hidden";
            reply2input.innerHTML =
                "\n      <div class=\"bottom\">\n        <img src=\"./images/avatars/image-juliusomo.png\">\n        <textarea>@".concat(reply.user, " </textarea>\n        <button class=\"reply2btn\">REPLY</button>\n      </div>\n      ");
            var replyWrapper = document.createElement("div");
            replyWrapper.className = "replywrapper";
            replyWrapper.appendChild(replyDiv);
            replyWrapper.appendChild(reply2input);
            replylist.appendChild(replyWrapper);
        });
    });
}
;
function createCommentElement(user, content, time, score, isCurrent) {
    var wrapper = document.createElement("div");
    wrapper.className = "comment";
    if (isCurrent) {
        wrapper.innerHTML = "\n        <div class=\"score-box\">\n            <img src=\"./images/icon-plus.svg\" class=\"plus\">\n            <div class=\"score\">".concat(score, "</div>\n            <img src=\"./images/icon-minus.svg\" class=\"minus\">\n        </div>\n        <div class=\"name-box\">\n            <img src=\"").concat(user.image.png, "\" alt=\"").concat(user.username, "\">\n            <div class=\"name\">").concat(user.username, "</div>\n            <div class=\"sign\">you</div>\n            <div class=\"time\">").concat(time, "</div>\n            <div class=\"icons\">\n                <div class=\"delete\">\n                    <img src=\"./images/icon-delete.svg\">\n                    <div>Delete</div>\n                </div>\n                <div class=\"edit\">\n                  <img src=\"./images/icon-edit.svg\">\n                  <div>Edit</div>\n                </div>\n            </div>\n        </div>\n        <div class=\"content\">").concat(content, "</div>\n    ");
    }
    else {
        wrapper.innerHTML = "\n        <div class=\"score-box\">\n            <img src=\"./images/icon-plus.svg\" class=\"plus\">\n            <div class=\"score\">".concat(score, "</div>\n            <img src=\"./images/icon-minus.svg\" class=\"minus\">\n        </div>\n        <div class=\"name-box\">\n            <img src=\"").concat(user.image.png, "\" alt=\"").concat(user.username, "\">\n            <div class=\"name\">").concat(user.username, "</div>\n            <div class=\"time\">").concat(time, "</div>\n            <div class=\"icons\">\n              <div class=\"reply-icon\">\n                  <img src=\"./images/icon-reply.svg\">\n                  <div>Reply</div>\n              </div>\n            </div>\n        </div>\n        <div class=\"content\">").concat(content, "</div>\n    ");
    }
    ;
    return wrapper;
}
;
function createReplyElement(user, replyingTo, content, time, score, isCurrent) {
    var wrapper = document.createElement("div");
    wrapper.className = "reply";
    if (isCurrent) {
        wrapper.innerHTML = "\n        <div class=\"score-box\">\n            <img src=\"./images/icon-plus.svg\" class=\"plus\">\n            <div class=\"score\">".concat(score, "</div>\n            <img src=\"./images/icon-minus.svg\" class=\"minus\">\n        </div>\n        <div class=\"name-box\">\n            <img src=\"").concat(user.image.png, "\" alt=\"").concat(user.username, "\">\n            <div class=\"name\">").concat(user.username, "</div>\n            <div class=\"sign\">you</div>\n            <div class=\"time\">").concat(time, "</div>\n            <div class=\"icons\">\n                <div class=\"delete\">\n                    <img src=\"./images/icon-delete.svg\">\n                    <div>Delete</div>\n                </div>\n                <div class=\"edit\">\n                  <img src=\"./images/icon-edit.svg\">\n                  <div>Edit</div>\n                </div>\n            </div>\n        </div>\n        <div class=\"content\">\n            <span class=\"significance\">@").concat(replyingTo, "</span> ").concat(content, "\n        </div>\n    ");
    }
    else {
        wrapper.innerHTML = "\n        <div class=\"score-box\">\n            <img src=\"./images/icon-plus.svg\" class=\"plus\">\n            <div class=\"score\">".concat(score, "</div>\n            <img src=\"./images/icon-minus.svg\" class=\"minus\">\n        </div>\n        <div class=\"name-box\">\n            <img src=\"").concat(user.image.png, "\" alt=\"").concat(user.username, "\">\n            <div class=\"name\">").concat(user.username, "</div>\n            <div class=\"time\">").concat(time, "</div>\n            <div class=\"icons\">\n              <div class=\"reply-icon\">\n                  <img src=\"./images/icon-reply.svg\">\n                  <div>Reply</div>\n              </div>\n            </div>\n        </div>\n        <div class=\"content\">\n            <span class=\"significance\">@").concat(replyingTo, "</span> ").concat(content, "\n        </div>\n    ");
    }
    ;
    return wrapper;
}
;
