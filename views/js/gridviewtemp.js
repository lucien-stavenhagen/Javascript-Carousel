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
      carouselcontainer.style.display = "block";
      carouselcontainer.style.textAlign = "center";
      carouselcontainer.innerHTML = "<h4>No images found on server<h4>";
    } else {
      for (let i = 0; i < this.imglist.imglist.length; i++) {
        let clone = document.importNode(t.content, true);
        let ftag = clone.getElementById("carousel-frame-tag");
        ftag.style.display = "none";
        let atag = clone.getElementById("carousel-a-tag");
        atag.setAttribute("href", this.imglist.imglist[i].path);
        let itag = clone.getElementById("carousel-img-tag");
        itag.setAttribute("src", this.imglist.imglist[i].path);
        let stag = clone.getElementById("carousel-img-caption");
        stag.innerHTML = this.imglist.imglist[i].name;
        carouselcontainer.appendChild(clone);
      }
    }
    shadow.appendChild(carouselcontainer);
    //    display.appendChild(carouselcontainer);
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
      gridcontainer.style.display = "block";
      gridcontainer.style.textAlign = "center";
      gridcontainer.innerHTML = "<h4>No images found on server<h4>";
    } else {
      for (let i = 0; i < this.imglist.imglist.length; i++) {
        let clone = document.importNode(t.content, true);
        let atag = clone.getElementById("a-tag");
        atag.setAttribute("href", this.imglist.imglist[i].path);
        let itag = clone.getElementById("img-tag");
        itag.setAttribute("src", this.imglist.imglist[i].path);
        let stag = clone.getElementById("img-caption");
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
