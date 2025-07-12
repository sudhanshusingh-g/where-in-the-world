export async function loadHomePage() {
  const root = document.getElementById("app-root");
  root.innerHTML = `
    <!-- Search and filter layout -->
    <section class="search-filter">
      <div id="search">
        <i class="fa-solid fa-search"></i>
        <input type="search" placeholder="Search for a country..." id="search-input" />
      </div>
      <div id="filter">
        <select id="filter-select">
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
        <i class="fa-solid fa-chevron-down"></i>
      </div>
    </section>
    <div id="loader"><div class="loader-spinner"></div></div>
    <section id="country-list-container"></section>
  `;

  const data = await fetch("./data.json").then((res) => res.json());

  const searchInput = document.getElementById("search-input");
  const filterSelect = document.getElementById("filter-select");
  const countryContainer = document.getElementById("country-list-container");
  const loader = document.getElementById("loader");

  loader.style.display = "block";
  renderCountries(data);
  loader.style.display = "none";

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = data.filter((c) => c.name.toLowerCase().includes(term));
    renderCountries(filtered);
  });

  filterSelect.addEventListener("change", () => {
    const region = filterSelect.value;
    const filtered = region ? data.filter((c) => c.region === region) : data;
    renderCountries(filtered);
  });

  function renderCountries(countries) {
    countryContainer.innerHTML = "";
    countries.forEach((country) => {
      const card = document.createElement("div");
      card.classList.add("country-card");
      card.innerHTML = `
        <div class="flag-image-container" style="background-image: url('${
          country.flag
        }')"></div>
        <div class="card-detail">
          <h3>${country.name}</h3>
          <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
          <p><strong>Region:</strong> ${country.region}</p>
          <p><strong>Capital:</strong> ${country.capital}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        window.location.href = `./pages/detail.html?name=${encodeURIComponent(
          country.name
        )}`;
      });
      countryContainer.appendChild(card);
    });
  }
}
