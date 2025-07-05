const container = document.getElementById("container")!;

container.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains("plus") || target.classList.contains("minus")) {
    const scoreBox = target.closest(".score-box")!;
    const score = scoreBox.querySelector(".score") as HTMLDivElement;

    let count = parseInt(score.textContent || "0");

    if (target.classList.contains("plus")) {
      count++;
    } else if (target.classList.contains("minus") && count > 0) {
      count--;
    }

    score.textContent = count.toString();
  }
});