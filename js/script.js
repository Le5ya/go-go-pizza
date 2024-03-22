const toppingsToggle = () => {
  const toppingsButton = document.querySelector(".toppings__button");
  const toppingsList = document.querySelector(".toppings__list");

  toppingsButton.addEventListener("click", () => {
    if (!toppingsList.classList.contains("toppings__list_show")) {
      toppingsList.classList.add("toppings__list_show");
      toppingsButton.classList.add("toppings__button_active");

      toppingsList.maxHeight = toppingsList.scrollHeight + "px";
    } else {
      toppingsButton.classList.remove("toppings__button_active");
      toppingsList.maxHeight = null;

      setTimeout(() => {
        toppingsList.classList.remove("toppings__list_show");
      }, 300);
    }
  });
};
const getPizzas = async () => {
  try {
    const response = await fetch(
      "https://elfin-petite-temperature.glitch.me/api/products"
    );
    if (!response.ok) {
      throw new Error("Failed you fetch pizza product");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetchin pizza products: ${error}`);
  }
};
const createCard = (data) => {
  const card = document.createElement("article");
  card.classList.add("card", "pizza__card");

  card.innerHTML = `
		<picture>
			<source srcset="${data.images[1]}" type="image/webp">
				<img class="card__image" src="${data.images[0]}" alt="${data.name.ru}">
		</picture>
		

		<div class="card__content">
			<h3 class="card__title">${data.name.ru[0].toUpperCase()}${data.name.ru
    .slice(1)
    .toLowerCase()}</h3>

			<p class="card__info">
				<span class="card__price">${data.price["25cm"]} ₽</span>
				<span>/</span>
				<span class="card__weight">25 cм</span>
			</p>
			<button class="card__button" data="${data.id}">Выбрать</button>
		</div>
						
	`;
  return card;
};

const renderPizzas = async () => {
  const pizza = await getPizzas();
  const pizzaList = document.querySelector(".pizza__list");
  pizzaList.textContent = "";

  const items = pizza.map((data) => {
    const item = document.createElement("li");
    item.classList.add("pizza__item");
    const card = createCard(data);
    item.append(card);
    return item;
  });
  pizzaList.append(...items);
};
const init = () => {
  toppingsToggle();
  renderPizzas();
};
init();
