const getAll = async () => {
  try {
    const data = await fetch("https://server-games-app.herokuapp.com/games");
    const json = await data.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

const getPlatform = async (platform) => {
  try {
    const data = await fetch(
      `https://server-games-app.herokuapp.com/games?platform=${platform}`
    );
    const json = await data.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

const search = async (name) => {
  try {
    const data = await fetch("https://server-games-app.herokuapp.com/games");
    const json = await data.json();
    let games = json.filter((x) => x.name.includes(name));
    return games;
  } catch (error) {
    console.log(error);
  }
};

const printHtml = (games) => {
  const html = document.querySelector(".card-container");
  html.innerHTML = ``;
  games.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.classList.add("animate__animated");
    div.classList.add("animate__fadeIn");
    const { id, name, price, description, genre, cover, platform } = element;
    div.innerHTML = `
    <img class="card-img" src="${cover}" alt="${name} Image Cover">
    <div class="card-info">
        <p class="card-name">${name}</p>
        <p class="card-price">$${price}</p>
    </div>
    `;
    html.appendChild(div);
  });
};

const form = document.querySelector('.form');

const input = document.querySelector("#input");

const showAll = document.querySelector(".show-all");

const showPS = document.querySelector(".show-ps");

const showXbox = document.querySelector(".show-xbox");

addEventListener("DOMContentLoaded", async () => {
  const allGames = await getAll();
  printHtml(allGames);
});

input.addEventListener("keyup", async (e) => {
  if (input.value.length != 0) {
    e.preventDefault();
    const fixString = (string) => {
      return string.replace(/\w\S*/g, (w) =>
        w.replace(/^\w/, (c) => c.toUpperCase())
      );
    };
    const games = await search(fixString(input.value));

    if (games.length == 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `No hay resultados con tu búsqueda: "${input.value}"`,
        showConfirmButton: true,
      });
      const games = await getAll();
      printHtml(games);
    } else {
      printHtml(games);
    }
  } else {
    const allGames = await getAll();
    printHtml(allGames);
  }
});

showAll.addEventListener("click", async () => {
  const games = await getAll();
  input.value = ``;
  printHtml(games);
});

showPS.addEventListener("click", async () => {
  const games = await getPlatform("PS5");
  input.value = ``;
  printHtml(games);
});

showXbox.addEventListener("click", async () => {
  const games = await getPlatform("Xbox Series X");
  input.value = ``;
  printHtml(games);
});
