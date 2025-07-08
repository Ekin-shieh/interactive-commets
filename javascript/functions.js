"use strict";
const voteMap = new WeakMap();
let pendingDeleteEl = null;
const modal = document.getElementById("delete-modal");
const cancelBtn = document.getElementById("cancel-btn");
const confirmBtn = document.getElementById("confirm-btn");
const container = document.getElementById("container");
const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("comment-input");
container.addEventListener("click", (e) => {
    var _a;
    const target = e.target;
    cancelBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
        pendingDeleteEl = null;
    });
    confirmBtn.addEventListener("click", () => {
        if (pendingDeleteEl) {
            pendingDeleteEl.remove();
            pendingDeleteEl = null;
        }
        modal.classList.add("hidden");
    });
    const deleteBtn = target.closest(".delete");
    if (deleteBtn) {
        const wrapper = deleteBtn.closest(".comment, .reply");
        if (wrapper) {
            pendingDeleteEl = wrapper;
            modal.classList.remove("hidden");
        }
        return;
    }
    if (target.classList.contains("plus") || target.classList.contains("minus")) {
        const scoreBox = target.closest(".score-box");
        const score = scoreBox.querySelector(".score");
        let count = parseInt(score.textContent || "0");
        let voteState = voteMap.get(scoreBox) || "none";
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
        const commentWrapper = target.closest(".commentwrapper, .replywrapper");
        const replyInput = commentWrapper.querySelector(".reply2input, .replyinput");
        replyInput.classList.toggle("hidden");
        return;
    }
    if (target.classList.contains("reply-btn")) {
        const replyInput = target.closest(".replyinput");
        const textarea = replyInput.querySelector("textarea");
        const raw = textarea.value.trim();
        if (!raw)
            return;
        const match = raw.match(/^@(\w+)\s+(.*)$/);
        let replyingTo = "";
        let content = raw;
        if (match) {
            replyingTo = match[1];
            content = match[2];
        }
        const replyList = replyInput.nextElementSibling;
        const newReply = document.createElement("div");
        newReply.className = "reply";
        newReply.innerHTML = `
        <div class="score-box">
            <img src="./images/icon-plus.svg" class="plus">
            <div class="score">0</div>
            <img src="./images/icon-minus.svg" class="minus">
        </div>
        <div class="name-box">
            <img class="photo" src="./images/avatars/image-juliusomo.png" alt="juliusomo">
            <div class="name">juliusomo</div>
            <div class="sign">you</div>
            <div class="time">Just now</div>
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
        <div class="content"><span class="significance">@${replyingTo}</span> ${content}</div>
        `;
        const reply2input = document.createElement("div");
        reply2input.className = "reply2input hidden";
        reply2input.innerHTML = `
        <div class="bottom">
            <img src="./images/avatars/image-juliusomo.png">
            <textarea class="reply-input"></textarea>
            <button class="reply2btn">REPLY</button>
        </div>
        `;
        const replyWrapper = document.createElement("div");
        replyWrapper.className = "replywrapper";
        replyWrapper.appendChild(newReply);
        replyWrapper.appendChild(reply2input);
        replyList.appendChild(replyWrapper);
        textarea.value = "";
        replyInput.classList.add("hidden");
        return;
    }
    if (target.classList.contains("reply2btn")) {
        const replyInput = target.closest(".reply2input");
        const textarea = replyInput.querySelector("textarea");
        const raw = textarea.value.trim();
        if (!raw)
            return;
        const match = raw.match(/^@(\w+)\s+(.*)$/);
        let replyingTo = "";
        let content = raw;
        if (match) {
            replyingTo = match[1];
            content = match[2];
        }
        const replyList = replyInput.closest(".replylist");
        const newReply = document.createElement("div");
        newReply.className = "reply";
        newReply.innerHTML = `
        <div class="score-box">
            <img src="./images/icon-plus.svg" class="plus">
            <div class="score">0</div>
            <img src="./images/icon-minus.svg" class="minus">
        </div>
        <div class="name-box">
            <img class="photo" src="./images/avatars/image-juliusomo.png" alt="juliusomo">
            <div class="name">juliusomo</div>
            <div class="sign">you</div>
            <div class="time">Just now</div>
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
        <div class="content"><span class="significance">@${replyingTo}</span> ${content}</div>
        `;
        const reply2input = document.createElement("div");
        reply2input.className = "reply2input hidden";
        reply2input.innerHTML = `
        <div class="bottom">
            <img src="./images/avatars/image-juliusomo.png">
            <textarea class="reply-input"></textarea>
            <button class="reply2btn">REPLY</button>
        </div>
        `;
        const replyWrapper = document.createElement("div");
        replyWrapper.className = "replywrapper";
        replyWrapper.appendChild(newReply);
        replyWrapper.appendChild(reply2input);
        replyList.appendChild(replyWrapper);
        textarea.value = "";
        replyInput.classList.add("hidden");
        return;
    }
    if (target.closest(".edit")) {
        const reply = target.closest(".reply, .comment");
        const contentDiv = reply.querySelector(".content");
        const originalText = ((_a = contentDiv.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || "";
        const atMatch = originalText.match(/^@(\w+)\s+/);
        const mention = atMatch ? `@${atMatch[1]} ` : "";
        const cleanText = atMatch ? originalText.replace(/^@\w+\s+/, "") : originalText;
        const textarea = document.createElement("textarea");
        textarea.value = cleanText;
        const updateBtn = document.createElement("button");
        updateBtn.className = "update-btn";
        updateBtn.textContent = "UPDATE";
        const updatewrapper = document.createElement("div");
        updatewrapper.className = "updatewrapper";
        updatewrapper.appendChild(textarea);
        updatewrapper.appendChild(updateBtn);
        contentDiv.replaceWith(updatewrapper);
        textarea.dataset.mention = mention;
        return;
    }
    if (target.classList.contains("update-btn")) {
        const reply = target.closest(".reply, .comment");
        const textarea = reply.querySelector("textarea");
        const newText = textarea.value.trim();
        const mention = textarea.dataset.mention || "";
        const contentDiv = document.createElement("div");
        contentDiv.className = "content";
        contentDiv.innerHTML = `<span class="significance">${mention}</span> ${newText}`;
        const updatewrapper = reply.querySelector(".updatewrapper");
        updatewrapper.replaceWith(contentDiv);
        return;
    }
});
sendBtn.addEventListener("click", () => {
    const content = input.value.trim();
    if (content.length === 0)
        return;
    const newComment = document.createElement("div");
    newComment.className = "comment";
    newComment.innerHTML = `
            <div class="score-box">
                <img src="./images/icon-plus.svg" class="plus">
                <div class="score">0</div>
                <img src="./images/icon-minus.svg" class="minus">
            </div>
            <div class="name-box">
                <img class="photo" src="./images/avatars/image-juliusomo.png" alt="juliusomo">
                <div class="name">juliusomo</div>
                <div class="sign">you</div>
                <div class="time">Just now</div>
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
    const commentWrapper = document.createElement("div");
    commentWrapper.className = "commentwrapper";
    commentWrapper.appendChild(newComment);
    const replyinput = document.createElement("div");
    replyinput.className = "replyinput hidden";
    replyinput.innerHTML = `
    <div class="bottom">
      <img src="./images/avatars/image-juliusomo.png">
      <textarea></textarea>
      <button class="reply-btn">REPLY</button>
    </div>
    `;
    commentWrapper.appendChild(replyinput);
    const replylist = document.createElement("div");
    replylist.className = "replylist";
    commentWrapper.appendChild(replylist);
    container.appendChild(commentWrapper);
    input.value = "";
});
