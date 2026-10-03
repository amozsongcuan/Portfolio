const artwork = [
  { src: "Clean%20Illustrations/Raesummer.png", category: "Clean Illustrations" },
  { src: "Clean%20Illustrations/Wink.png", category: "Clean Illustrations" },
  { src: "Clean%20Illustrations/Wpomah.png", category: "Clean Illustrations" },
  { src: "Digital%20Painting/15cb7d61-44c0-44fa-b44d-073dc2ada75f.jpg", category: "Digital Painting" },
  { src: "Digital%20Painting/1lastpej.png", category: "Digital Painting" },
  { src: "Digital%20Painting/1LiyabEnvy.png", category: "Digital Painting" },
  { src: "Digital%20Painting/db1d4aba-d9c7-4be8-b428-eb54c14fa3ed.jpg", category: "Digital Painting" },
  { src: "Digital%20Painting/FinalTommy.png", category: "Digital Painting" },
  { src: "Digital%20Painting/Geyes.png", category: "Digital Painting" },
  { src: "Digital%20Painting/IshaFinal_09-20-2026.png", category: "Digital Painting" },
  { src: "Digital%20Painting/pers.png", category: "Digital Painting" },
  { src: "Digital%20Painting/Raesummer.png", category: "Digital Painting" },
  { src: "Digital%20Painting/uts.png", category: "Digital Painting" },
  { src: "Emotes/1silentrule.png", category: "Emotes" },
  { src: "Emotes/dandespair.png", category: "Emotes" },
  { src: "Emotes/danheart.png", category: "Emotes" },
  { src: "Emotes/Danhype.png", category: "Emotes" },
  { src: "Emotes/DanWave.png", category: "Emotes" },
  { src: "Emotes/Dpressionpats.png", category: "Emotes" },
  { src: "Emotes/momoAYAYAFinal.png", category: "Emotes" },
  { src: "Emotes/MomoBan1%20(1).png", category: "Emotes" },
  { src: "Emotes/MomoBleed.png", category: "Emotes" },
  { src: "Emotes/momobox.png", category: "Emotes" },
  { src: "Emotes/MomoBoxV.png", category: "Emotes" },
  { src: "Emotes/MomoCowTea.png", category: "Emotes" },
  { src: "Emotes/MomoDiscord%20(1).png", category: "Emotes" },
  { src: "Emotes/Momogun2.png", category: "Emotes" },
  { src: "Emotes/momohype.png", category: "Emotes" },
  { src: "Emotes/Momopat2.png", category: "Emotes" },
  { src: "Emotes/momoraid.png", category: "Emotes" },
  { src: "Emotes/momoscrem.png", category: "Emotes" },
  { src: "Emotes/momosmug2.png", category: "Emotes" },
  { src: "Emotes/NoM.png", category: "Emotes" },
  { src: "Emotes/PatRae.png", category: "Emotes" },
  { src: "Emotes/Specs.png", category: "Emotes" },
  { src: "Emotes/SYBAU.png", category: "Emotes" },
  { src: "Emotes/Wave.png", category: "Emotes" },
  { src: "Pixel%20Arts/Aaaaaaaaaaa.png", category: "Pixel Arts" },
  { src: "Pixel%20Arts/MizuBlack.png", category: "Pixel Arts" },
];

const gallery = document.querySelector("#gallery");
const filterButtons = document.querySelectorAll(".filter-button");
const previewDialog = document.querySelector(".preview-dialog");
const previewImage = document.querySelector(".preview-image");
const previewClose = document.querySelector(".preview-close");

function createWatermark() {
  const pattern = document.createElement("span");
  pattern.className = "watermark-pattern";
  pattern.setAttribute("aria-hidden", "true");

  for (let index = 0; index < 12; index += 1) {
    const mark = document.createElement("span");
    mark.textContent = "Amoz Song";
    pattern.append(mark);
  }

  return pattern;
}

function renderArtwork() {
  const fragment = document.createDocumentFragment();
  artwork.forEach(({ src, category }, index) => {
    const item = document.createElement("figure");
    item.className = "artwork-item";
    item.dataset.category = category;
    item.style.animationDelay = `${Math.min(index % 8, 7) * 35}ms`;

    const button = document.createElement("button");
    button.className = "artwork-open watermarked-art";
    button.type = "button";
    button.setAttribute("aria-label", "Open artwork preview");

    const image = document.createElement("img");
    image.src = src;
    image.alt = "Artwork by Amoz Song";
    image.loading = "lazy";
    image.decoding = "async";
    button.append(image);
    button.append(createWatermark());
    item.append(button);
    fragment.append(item);
  });
  gallery.append(fragment);
}

document.querySelectorAll(".watermarked-art").forEach((artworkSurface) => {
  artworkSurface.append(createWatermark());
});

function filterArtwork(category) {
  gallery.querySelectorAll(".artwork-item").forEach((item) => {
    item.hidden = category !== "all" && item.dataset.category !== category;
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });
    filterArtwork(button.dataset.filter);
  });
});

gallery.addEventListener("click", (event) => {
  const button = event.target.closest(".artwork-open");
  if (!button) return;
  previewImage.src = button.querySelector("img").src;
  previewDialog.showModal();
});

previewClose.addEventListener("click", () => previewDialog.close());
previewDialog.addEventListener("click", (event) => {
  if (event.target === previewDialog) previewDialog.close();
});

renderArtwork();