var container = document.getElementById("container");
container.addEventListener("click", function (e) {
    var target = e.target;
    if (target.classList.contains("plus") || target.classList.contains("minus")) {
        var scoreBox = target.closest(".score-box");
        var score = scoreBox.querySelector(".score");
        var count = parseInt(score.textContent || "0");
        if (target.classList.contains("plus")) {
            count++;
        }
        else if (target.classList.contains("minus") && count > 0) {
            count--;
        }
        score.textContent = count.toString();
    }
});
