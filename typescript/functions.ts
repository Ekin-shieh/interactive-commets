type VoteState = "none" | "upvoted" | "downvoted";
const voteMap = new WeakMap<HTMLElement, VoteState>();

let pendingDeleteEl: Element | null = null;
const modal = document.getElementById("delete-modal")!;
const cancelBtn = document.getElementById("cancel-btn")!;
const confirmBtn = document.getElementById("confirm-btn")!;
const container = document.getElementById("container")!;
const sendBtn = document.getElementById("send-btn")!;
const input = document.getElementById("comment-input") as HTMLTextAreaElement;

container.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;

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
        const scoreBox = target.closest(".score-box") as HTMLElement;
        const score = scoreBox.querySelector(".score") as HTMLDivElement;

        let count = parseInt(score.textContent || "0");
        let voteState = voteMap.get(scoreBox) || "none";

        if (target.classList.contains("plus")) {
        if (voteState === "upvoted") return;

        if (voteState === "downvoted") {
            count += 1;
            voteState = "none";
        } else {
            count += 1;
            voteState = "upvoted";
        }
        }

        if (target.classList.contains("minus")) {
        if (voteState === "downvoted") return;

        if (voteState === "upvoted") {
            count -= 1;
            voteState = "none";
        } else {
            count -= 1;
            voteState = "downvoted";
        }
        }

        voteMap.set(scoreBox, voteState);
        score.textContent = count.toString();
    }

    if (target.closest(".reply-icon")) {
        const commentWrapper = target.closest(".commentwrapper, .replywrapper")!;
        const replyInput = commentWrapper.querySelector(".reply2input, .replyinput") as HTMLDivElement;
        replyInput.classList.toggle("hidden");
        return;
    }

    if (target.classList.contains("reply-btn")) {
        const replyInput = target.closest(".replyinput")!;
        const textarea = replyInput.querySelector("textarea")!;
        const content = textarea.value.trim();
        if (!content) return;

        const replyList = replyInput.nextElementSibling!;
        const newReply = document.createElement("div");
        newReply.className = "reply";
        newReply.innerHTML = `
        <div class="score-box">
            <img src="./images/icon-plus.svg" class="plus">
            <div class="score">0</div>
            <img src="./images/icon-minus.svg" class="minus">
        </div>
        <div class="name-box">
            <img src="./images/avatars/image-juliusomo.png" alt="juliusomo">
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
        const reply2input = document.createElement("div");
        reply2input.className = "reply2input hidden";
        reply2input.innerHTML = `
        <div class="bottom">
            <img src="./images/avatars/image-juliusomo.png">
            <textarea id="reply-input"></textarea>
            <button id="reply2btn">REPLY</button>
        </div>
        `
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
        const replyInput = target.closest(".reply2input")!;
        const textarea = replyInput.querySelector("textarea")!;
        const content = textarea.value.trim();
        if (!content) return;

        const replyList = replyInput.closest(".replylist")!;
        const newReply = document.createElement("div");
        newReply.className = "reply";
        newReply.innerHTML = `
        <div class="score-box">
            <img src="./images/icon-plus.svg" class="plus">
            <div class="score">0</div>
            <img src="./images/icon-minus.svg" class="minus">
        </div>
        <div class="name-box">
            <img src="./images/avatars/image-juliusomo.png" alt="juliusomo">
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
        const reply2input = document.createElement("div");
        reply2input.className = "reply2input hidden";
        reply2input.innerHTML = `
        <div class="bottom">
            <img src="./images/avatars/image-juliusomo.png">
            <textarea id="reply-input"></textarea>
            <button id="reply2btn">REPLY</button>
        </div>
        `
        const replyWrapper = document.createElement("div");
        replyWrapper.className = "replywrapper";
        replyWrapper.appendChild(newReply);
        replyWrapper.appendChild(reply2input);
        replyList.appendChild(replyWrapper);

        textarea.value = "";
        replyInput.classList.add("hidden");
        return;
    }
});

sendBtn.addEventListener("click", () => {
    const content = input.value.trim();
    if (content.length === 0) return;

    const newComment = document.createElement("div");
    newComment.className = "comment";
    newComment.innerHTML = `
            <div class="score-box">
                <img src="./images/icon-plus.svg" class="plus">
                <div class="score">0</div>
                <img src="./images/icon-minus.svg" class="minus">
            </div>
            <div class="name-box">
                <img src="./images/avatars/image-juliusomo.png" alt="juliusomo">
                <div class="name">juliusomo</div>
                <div class="sign">you</div>
                <div class="time">Just now</div>
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