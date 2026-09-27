import { hotspots } from "./scene-config.js";

export function prepareHotspots(layer) {
  const fragment = document.createDocumentFragment();

  hotspots.forEach((hotspot) => {
    const region = document.createElement("span");
    region.className = "hotspot";
    region.dataset.hotspotId = hotspot.id;
    region.dataset.hotspotType = hotspot.type;
    region.style.setProperty("--x", `${hotspot.x}%`);
    region.style.setProperty("--y", `${hotspot.y}%`);
    region.style.setProperty("--w", `${hotspot.w}%`);
    region.style.setProperty("--h", `${hotspot.h}%`);
    fragment.append(region);
  });

  layer.append(fragment);
}

