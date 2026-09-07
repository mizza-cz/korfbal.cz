   function initCompetitionLoadMore() {
    const requests = new Map();

    function loadData(url) {
      if (!requests.has(url)) {
        const request = fetch(url, {
          headers: {
            Accept: "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Nepodařilo se načíst soutěže.");
            }

            return response.json();
          })
          .catch((error) => {
            requests.delete(url);
            throw error;
          });

        requests.set(url, request);
      }

      return requests.get(url);
    }

    document.querySelectorAll(".js-competition").forEach((section) => {
      const button = section.querySelector(".js-competition-load");
      const list = section.querySelector(".js-competition-list");
      const more = section.querySelector(".js-competition-more");
      const { sectionId, jsonUrl } = section.dataset;

      if (!button || !list || !more || !sectionId || !jsonUrl) return;
      if (section.dataset.loadMoreInitialized === "true") return;

      section.dataset.loadMoreInitialized = "true";

      button.addEventListener("click", async () => {
        if (button.disabled) return;

        button.disabled = true;
        button.textContent = "NAČÍTÁNÍ...";
        list.setAttribute("aria-busy", "true");

        try {
          const data = await loadData(jsonUrl);
          const competitions = data[sectionId];

          if (!Array.isArray(competitions)) {
            throw new Error("Požadovaná kategorie nebyla nalezena.");
          }

          const fragment = document.createDocumentFragment();

          competitions.forEach((competition) => {
            fragment.appendChild(createCompetitionCard(competition));
          });

          list.appendChild(fragment);
          more.remove();
        } catch (error) {
          console.error("Chyba při načítání soutěží:", error);

          button.disabled = false;
          button.textContent = "ZKUSIT ZNOVU";
        } finally {
          list.removeAttribute("aria-busy");
        }
      });
    });
  }

  function createCompetitionCard(competition) {
    const column = document.createElement("div");

    column.className = "col-lg-4 col-sm-6";

    column.innerHTML = `
    <div class="competitionCard">
      <div class="d-flex flex-column gap-2 mb-4">
        <div
          class="d-flex align-items-center justify-content-between gap-3 flex-wrap"
        >
          <div class="tag-primary"></div>
          <div class="text-primary-50 text-base-12"></div>
        </div>

        <h3 class="h4"></h3>

        <div class="text-base-12 text-primary-50"></div>
      </div>

      <a class="link text-accent align-middle text-bold-11">
        DETAIL

        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5.03622 10.3907L3.75355 9.11794L6.74148 6.13002H0V4.2607H6.74148L3.75355 1.27774L5.03622 4.44651e-05L10.2315 5.19536L5.03622 10.3907Z"
            fill="currentColor"
          />
        </svg>
      </a>
    </div>
  `;

    const card = column.querySelector(".competitionCard");
    const content = card.firstElementChild;
    const header = content.firstElementChild;

    header.querySelector(".tag-primary").textContent = competition.tag ?? "";
    header.lastElementChild.textContent = competition.season ?? "";
    content.querySelector("h3").textContent = competition.title ?? "";
    content.lastElementChild.textContent = competition.description ?? "";

    const link = card.querySelector("a");
    const url = new URL(competition.url || "#", document.baseURI);

    link.href = ["http:", "https:"].includes(url.protocol) ? url.href : "#";

    return column;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCompetitionLoadMore);
  } else {
    initCompetitionLoadMore();
  }