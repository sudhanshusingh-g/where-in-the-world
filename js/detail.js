export function loadDetailPage() {
  const root = document.getElementById("app-root");
  const params = new URLSearchParams(window.location.search);
  const countryName = params.get("name");

  fetch("/data.json")
    .then((res) => res.json())
    .then((data) => {
      const country = data.find(
        (c) => c.name.toLowerCase() === countryName.toLowerCase()
      );
      if (!country) return (root.innerHTML = "<p>Country not found</p>");

      root.innerHTML = `
        <section class="back">
          <button id="back-btn">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back</span>
          </button>
        </section>
        <section class="country-detail">
          <div class="country-image">
            <img src="${country.flag}" alt="${country.name} flag" />
          </div>
          <div class="country-info">
            <h2>${country.name}</h2>
            <div class="country-info-grid">
              <p><strong>Native Name:</strong> ${country.nativeName}</p>
              <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> ${country.region}</p>
              <p><strong>Subregion:</strong> ${country.subregion}</p>
              <p><strong>Capital:</strong> ${country.capital}</p>
              <p><strong>Top Level Domain:</strong> ${country.topLevelDomain.join(
                ", "
              )}</p>
              <p><strong>Currencies:</strong> ${country.currencies
                .map((c) => c.name)
                .join(", ")}</p>
              <p><strong>Languages:</strong> ${country.languages
                .map((l) => l.name)
                .join(", ")}</p>
            </div>
            <p><strong>Border Countries:</strong> ${
              country.borders
                ? country.borders
                    .map((b) => `<span class="border-country">${b}</span>`)
                    .join(" ")
                : "None"
            }</p>
          </div>
        </section>
      `;

      document.getElementById("back-btn").addEventListener("click", () => {
        window.history.back();
      });
    });
}
