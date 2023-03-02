const loadItems = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();

  //   const itemsContainer = document.getElementById("items-container");
  const showAllButton = document.getElementById("show-more");
  let items = data.data.tools.slice(0, 6); // initially show only 6 items

  // update items array and re-render items when "show all" button is clicked
  showAllButton.addEventListener("click", () => {
    items = data.data.tools;
    displayItems(items);
    showAllButton.classList.add("hidden");
  });

  displayItems(items);
};

const displayItems = (items) => {
  const itemsContainer = document.getElementById("items-container");
  itemsContainer.innerHTML = ""; // clear existing items before re-rendering

  items.forEach((item) => {
    // create item card and append to container
    const itemDiv = document.createElement("div");
    itemDiv.classList.add(
      "card",
      "shadow-xl",
      "bg-base-100",
      "p-6",
      "rounded-lg"
    );
    itemDiv.innerHTML = `
      <figure>
        <img
          src="${item.image}"
          alt="Shoes"
        />
      </figure>
      <div class="card-body mt-4">
        <h2 class="card-title text-[#111111] not-italic font-semibold text-xl">Features</h2>
        <p>
          <ol class="list-decimal pl-8 text-[#585858] mt-2">
            <li class="mb-1"> ${item.features[0]}</li>
            <li class="mb-1">${item.features[1]} </li>
            <li> ${item.features[2]}</li>
         </ol>
      </p>
      <hr class="border-b border-b-2 border-gray-400 my-4" >
        <div class="card-actions flex justify-between">
          <div>
            <h2 class=" text-[#111111] font-semibold text-xl mb-2">${item.name}</h2>
            <p class="text-[#585858]"><i class="fa-solid fa-calendar-days mr-2"></i>${item.published_in}</p>
          </div>
          
          <button type="button" onclick="" class="rounded-full text-[#eb5757]" data-modal-target="defaultModal" 
          data-modal-toggle="defaultModal" 
          
          style="background-color: #FEF7F7; 
           width: 50px; height: 50px"; >
            <i class="fa-solid fa-arrow-right"></i>
          </button>
          
          

        </div>
      </div>
    `;
    itemsContainer.appendChild(itemDiv);
  });
};
// const loadItemsDetails = async (id) => {
//   const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   console.log(data);
// };




loadItems();
