export function setupThemeToggle() {
  const toggleButton = document.getElementById("theme-toggle-btn");
  const toggleIcon = toggleButton.querySelector("i");
  const toggleText = document.getElementById("theme-toggle-text");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    updateToggleUI("light");
  }

  toggleButton.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    localStorage.setItem("theme", isLight ? "light" : "dark");
    updateToggleUI(isLight ? "light" : "dark");
  });

  function updateToggleUI(theme) {
    if (theme === "light") {
      toggleIcon.classList.replace("fa-moon", "fa-sun");
      toggleText.textContent = "Light Mode";
    } else {
      toggleIcon.classList.replace("fa-sun", "fa-moon");
      toggleText.textContent = "Dark Mode";
    }
  }
}
