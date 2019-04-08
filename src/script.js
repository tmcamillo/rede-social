let lengthPost = document.getElementById('comment-area').value.length;
let lengthLabel = document.getElementById('label').value.length;
let lengthAlcohool = document.getElementById('alcohol').value.length;

function count() {
  document.getElementById('charNum').textContent = 300 - lengthPost;
  if (lengthPost < 50) {
    document.getElementById('comment-count').style.color = "#83579B";
  } if (lengthPost > 100) {
    document.getElementById('comment-count').style.color = "#FDA2B1";
  } if (lengthPost > 200) {
    document.getElementById('comment-count').style.color = "orange";
  } if (lengthPost > 300) {
    document.getElementById('comment-count').style.color = "#FC0D2C";
  };
}
function autosize() {
  let el = this;
  setTimeout(function () {
    el.style.cssText = 'height:auto; padding:0';
    el.style.cssText = 'height:' + el.scrollHeight + 'px';
  }, 0);
}

document.getElementById('comment-area').addEventListener('input', () => {
  count();

})