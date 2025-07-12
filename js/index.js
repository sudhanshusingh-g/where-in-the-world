import { setupThemeToggle } from "./theme.js";
import { loadHomePage } from "./home.js";
import { loadDetailPage } from "./detail.js";

setupThemeToggle();

const path = window.location.pathname;

if (path.includes("detail")) {
  loadDetailPage();
} else {
  loadHomePage();
}
