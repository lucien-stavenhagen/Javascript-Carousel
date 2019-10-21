class DynamicGridView {
  constructor() {
    this.url = "http://localhost:2001/getimgs";
    this.imglist = null;
    this.slide = 0;
    this.initView();
  }
  async initView() {
    const res = await fetch(this.url, { method: "GET" });
    this.imglist = await res.json();
    this.createImgCarousel();
    this.createImgGridView();
    this.showNextSlide(0);
  }
  createImgCarousel() {
    const display = document.getElementById("display-carousel");
    while (display.lastChild) {
      display.removeChild(display.lastChild);
    }
    const shadow = display.attachShadow({ mode: "open" });
    const carouselcontainer = document.createElement("div");
    carouselcontainer.id = "carousel-container";
    carouselcontainer.style.display = "none";
    const t = document.getElementById("carousel");
    if (this.imglist.imglist.length === 0) {
      this.utilityMessageStyle(carouselcontainer);
    } else {
      for (let i = 0; i < this.imglist.imglist.length; i++) {
        let clone = document.importNode(t.content, true);
        let ftag = clone.querySelector(".carousel-img-frame");
        ftag.style.display = "none";
        let atag = clone.querySelector("a");
        atag.setAttribute("href", this.imglist.imglist[i].path);
        let itag = clone.querySelector(".grid-image");
        itag.setAttribute("src", this.imglist.imglist[i].path);
        let stag = clone.querySelector(".grid-caption");
        stag.innerHTML = this.imglist.imglist[i].name;
        carouselcontainer.appendChild(clone);
      }
    }
    shadow.appendChild(carouselcontainer);
    //    display.appendChild(carouselcontainer);
  }
  utilityMessageStyle(container) {
    container.style.boxSizing = "border-box";
    container.style.borderRadius = "4px";
    container.style.display = "block";
    container.style.textAlign = "center";
    container.style.width = "90%";
    container.style.margin = "auto";
    container.style.border = "1px solid rgba(0,0,0,.2)";
    container.style.fontSize = "1.1rem";
    container.style.backgroundColor = "#cecece";
    container.innerHTML = "<p>No images found on server<p>";
  }
  createImgGridView() {
    const display = document.getElementById("display-gridview");
    while (display.lastChild) {
      display.removeChild(display.lastChild);
    }
    const shadow = display.attachShadow({ mode: "open" });
    const gridcontainer = document.createElement("div");
    gridcontainer.id = "grid-container";
    const t = document.getElementById("grid-view");
    if (this.imglist.imglist.length === 0) {
      this.utilityMessageStyle(gridcontainer);
    } else {
      for (let i = 0; i < this.imglist.imglist.length; i++) {
        let clone = document.importNode(t.content, true);
        let atag = clone.querySelector("a");
        atag.setAttribute("href", this.imglist.imglist[i].path);
        let itag = clone.querySelector(".grid-image");
        itag.setAttribute("src", this.imglist.imglist[i].path);
        let stag = clone.querySelector(".grid-caption");
        stag.innerHTML = this.imglist.imglist[i].name;
        gridcontainer.appendChild(clone);
      }
    }
    shadow.appendChild(gridcontainer);
    //    display.appendChild(gridcontainer);
  }
  showNextSlide(direction) {
    if (this.imglist.imglist.length === 0) {
      return;
    }
    const display = document.getElementById("display-carousel");
    const carouselcontainer = display.shadowRoot.getElementById(
      "carousel-container"
    );
    const slides = carouselcontainer.getElementsByClassName(
      "carousel-img-frame"
    );
    if (slides.length >= 1) {
      if (carouselcontainer.style.display === "none") {
        carouselcontainer.style.display = "grid";
      }
      this.slide += direction;
      if (this.slide >= slides.length) {
        this.slide = 0;
      }
      if (this.slide < 0) {
        this.slide = slides.length - 1;
      }
      for (let j = 0; j < slides.length; j++) {
        slides[j].style.display = "none";
      }
      slides[this.slide].style.display = "block";
    }
  }
}
const car = new DynamicGridView();
