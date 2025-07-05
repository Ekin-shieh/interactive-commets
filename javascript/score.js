var voteMap = new WeakMap();
var container = document.getElementById("container");
container.addEventListener("click", function (e) {
    var target = e.target;
    var pendingDeleteEl = null;
    var modal = document.getElementById("delete-modal");
    var cancelBtn = document.getElementById("cancel-btn");
    var confirmBtn = document.getElementById("confirm-btn");
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
});
