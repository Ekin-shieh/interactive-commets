var voteMap = new WeakMap();
var pendingDeleteEl = null;
var modal = document.getElementById("delete-modal");
var cancelBtn = document.getElementById("cancel-btn");
var confirmBtn = document.getElementById("confirm-btn");
var container = document.getElementById("container");
var sendBtn = document.getElementById("send-btn");
var input = document.getElementById("comment-input");
container.addEventListener("click", function (e) {
    var target = e.target;
    cancelBtn.addEventListener("click", function () {
        modal.classList.add("hidden");
        pendingDeleteEl = null;
    });
    confirmBtn.addEventListener("click", function () {
        if (pendingDeleteEl) {
            pendingDeleteEl.remove();
            pendingDeleteEl = null;
        }
        modal.classList.add("hidden");
    });
    var deleteBtn = target.closest(".delete");
    if (deleteBtn) {
        var wrapper = deleteBtn.closest(".comment, .reply");
        if (wrapper) {
            pendingDeleteEl = wrapper;
            modal.classList.remove("hidden");
        }
        return;
    }
    if (target.classList.contains("plus") || target.classList.contains("minus")) {
        var scoreBox = target.closest(".score-box");
        var score = scoreBox.querySelector(".score");
        var count = parseInt(score.textContent || "0");
        var voteState = voteMap.get(scoreBox) || "none";
        if (target.classList.contains("plus")) {
            if (voteState === "upvoted")
                return;
            if (voteState === "downvoted") {
                count += 1;
                voteState = "none";
            }
            else {
                count += 1;
                voteState = "upvoted";
            }
        }
        if (target.classList.contains("minus")) {
            if (voteState === "downvoted")
                return;
            if (voteState === "upvoted") {
                count -= 1;
                voteState = "none";
            }
            else {
                count -= 1;
                voteState = "downvoted";
            }
        }
        voteMap.set(scoreBox, voteState);
        score.textContent = count.toString();
    }
    if (target.closest(".reply-icon")) {
        var commentWrapper = target.closest(".commentwrapper, .replywrapper");
        var replyInput = commentWrapper.querySelector(".reply2input, .replyinput");
        replyInput.classList.toggle("hidden");
        return;
    }
    if (target.classList.contains("reply-btn")) {
        var replyInput = target.closest(".replyinput");
        var textarea = replyInput.querySelector("textarea");
        var content = textarea.value.trim();
        if (!content)
            return;
        var replyList = replyInput.nextElementSibling;
        var newReply = document.createElement("div");
        newReply.className = "reply";
        newReply.innerHTML = "\n        <div class=\"score-box\">\n            <img src=\"./images/icon-plus.svg\" class=\"plus\">\n            <div class=\"score\">0</div>\n            <img src=\"./images/icon-minus.svg\" class=\"minus\">\n        </div>\n        <div class=\"name-box\">\n            <img src=\"./images/avatars/image-juliusomo.png\" alt=\"juliusomo\">\n            <div class=\"name\">juliusomo</div>\n            <div class=\"sign\">you</div>\n            <div class=\"time\">Just now</div>\n            <div class=\"icons\">\n                <div class=\"delete\">\n                    <img src=\"./images/icon-delete.svg\">\n                    <div>Delete</div>\n                </div>\n                <div class=\"edit\">\n                <img src=\"./images/icon-edit.svg\">\n                <div>Edit</div>\n                </div>\n            </div>\n        </div>\n        <div class=\"content\">".concat(content, "</div>\n        ");
        var reply2input = document.createElement("div");
        reply2input.className = "reply2input hidden";
        reply2input.innerHTML = "\n        <div class=\"bottom\">\n            <img src=\"./images/avatars/image-juliusomo.png\">\n            <textarea id=\"reply-input\"></textarea>\n            <button id=\"reply2btn\">REPLY</button>\n        </div>\n        ";
        var replyWrapper = document.createElement("div");
        replyWrapper.className = "replywrapper";
        replyWrapper.appendChild(newReply);
        replyWrapper.appendChild(reply2input);
        replyList.appendChild(replyWrapper);
        textarea.value = "";
        replyInput.classList.add("hidden");
        return;
    }
    if (target.classList.contains("reply2btn")) {
        var replyInput = target.closest(".reply2input");
        var textarea = replyInput.querySelector("textarea");
        var content = textarea.value.trim();
        if (!content)
            return;
        var replyList = replyInput.closest(".replylist");
        var newReply = document.createElement("div");
        newReply.className = "reply";
        newReply.innerHTML = "\n        <div class=\"score-box\">\n            <img src=\"./images/icon-plus.svg\" class=\"plus\">\n            <div class=\"score\">0</div>\n            <img src=\"./images/icon-minus.svg\" class=\"minus\">\n        </div>\n        <div class=\"name-box\">\n            <img src=\"./images/avatars/image-juliusomo.png\" alt=\"juliusomo\">\n            <div class=\"name\">juliusomo</div>\n            <div class=\"sign\">you</div>\n            <div class=\"time\">Just now</div>\n            <div class=\"icons\">\n                <div class=\"delete\">\n                    <img src=\"./images/icon-delete.svg\">\n                    <div>Delete</div>\n                </div>\n                <div class=\"edit\">\n                <img src=\"./images/icon-edit.svg\">\n                <div>Edit</div>\n                </div>\n            </div>\n        </div>\n        <div class=\"content\">".concat(content, "</div>\n        ");
        var reply2input = document.createElement("div");
        reply2input.className = "reply2input hidden";
        reply2input.innerHTML = "\n        <div class=\"bottom\">\n            <img src=\"./images/avatars/image-juliusomo.png\">\n            <textarea id=\"reply-input\"></textarea>\n            <button id=\"reply2btn\">REPLY</button>\n        </div>\n        ";
        var replyWrapper = document.createElement("div");
        replyWrapper.className = "replywrapper";
        replyWrapper.appendChild(newReply);
        replyWrapper.appendChild(reply2input);
        replyList.appendChild(replyWrapper);
        textarea.value = "";
        replyInput.classList.add("hidden");
        return;
    }
});
sendBtn.addEventListener("click", function () {
    var content = input.value.trim();
    if (content.length === 0)
        return;
    var newComment = document.createElement("div");
    newComment.className = "comment";
    newComment.innerHTML = "\n            <div class=\"score-box\">\n                <img src=\"./images/icon-plus.svg\" class=\"plus\">\n                <div class=\"score\">0</div>\n                <img src=\"./images/icon-minus.svg\" class=\"minus\">\n            </div>\n            <div class=\"name-box\">\n                <img src=\"./images/avatars/image-juliusomo.png\" alt=\"juliusomo\">\n                <div class=\"name\">juliusomo</div>\n                <div class=\"sign\">you</div>\n                <div class=\"time\">Just now</div>\n                <div class=\"icons\">\n                    <div class=\"delete\">\n                        <img src=\"./images/icon-delete.svg\">\n                        <div>Delete</div>\n                    </div>\n                    <img src=\"./images/icon-edit.svg\">Edit\n                </div>\n            </div>\n            <div class=\"content\">".concat(content, "</div>\n    ");
    var commentWrapper = document.createElement("div");
    commentWrapper.className = "commentwrapper";
    commentWrapper.appendChild(newComment);
    var replyinput = document.createElement("div");
    replyinput.className = "replyinput hidden";
    replyinput.innerHTML = "\n    <div class=\"bottom\">\n      <img src=\"./images/avatars/image-juliusomo.png\">\n      <textarea></textarea>\n      <button class=\"reply-btn\">REPLY</button>\n    </div>\n    ";
    commentWrapper.appendChild(replyinput);
    var replylist = document.createElement("div");
    replylist.className = "replylist";
    commentWrapper.appendChild(replylist);
    container.appendChild(commentWrapper);
    input.value = "";
});
