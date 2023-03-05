var v = document.querySelector("video");
if (v) {
  if (v.hasAttribute("loop")) {
    v.removeAttribute("loop");
    var enabled = false;
  } else {
    v.setAttribute("loop", "");
    var a = document.querySelector("input#autoplay-checkbox");
    if (a) {
      a.checked = false;
    }
    var enabled = true;
  }
  chrome.runtime.sendMessage({enabled: enabled});
}
