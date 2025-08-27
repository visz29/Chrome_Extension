const frames = ["/eye.png", "/gojo.png", "/tanjiro.png"];
let i = 0;
// for change title logo , but only for hosted react web page

setInterval(() => {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = frames[i];
  i = (i + 1) % frames.length;
}, 3000); // change frame every 300ms
