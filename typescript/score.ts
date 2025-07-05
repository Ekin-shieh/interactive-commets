type VoteState = "none" | "upvoted" | "downvoted";
const voteMap = new WeakMap<HTMLElement, VoteState>();

const container = document.getElementById("container")!;

container.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

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
});