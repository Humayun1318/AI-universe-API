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
        <img class="rounded"
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
            <p class="text-[#585858]"><i class="fa-solid fa-calendar-days mr-2"></i>${item.published_in} 
             </p>
          </div>
          
          
         <button class="rounded-full text-[#eb5757]" type="button" 
         onclick="loadItemsDetails('${item.id}')"style="background-color: #FEF7F7; 
           width: 50px; height: 50px";>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
        </div>
      </div>
    `;
    itemsContainer.appendChild(itemDiv);
  });
};
const loadItemsDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayItemDetails(data.data);
  toggleModal("modal-id");
};
function toggleModal(modalID) {
  document.getElementById(modalID).classList.toggle("hidden");
  document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
  document.getElementById(modalID).classList.toggle("flex");
  document.getElementById(modalID + "-backdrop").classList.toggle("flex");
}
const displayItemDetails = item => {
  const detailsDiv = document.getElementById("deatils");
  detailsDiv.innerHTML = `
  <div class="bg-blue-400 p-4 w-[50%]" style="background: rgba(235, 87, 87, 0.05);
                    border: 1px solid #EB5757;border-radius: 16px;" id="modal-id-1">
                    <p>${item.description}</p>
                    <div class="flex flex-row gap-4 my-4">
                    <p class="p-5 text-[#03A30A] font-bold text-center" style="background: #FFFFFF;border-radius: 16px;">
                      ${item.pricing[0]}</p>
                    <p class="p-5 text-[#F28927] font-bold text-center" style="background: #FFFFFF;border-radius: 16px;">
                      ${item.pricing[1]}</p>
                    <p class="p-5 text-[#EB5757] font-bold text-center" style="background: #FFFFFF;border-radius: 16px;">
                      ${item.pricing[2]}</p>
                    </div>
                    <div class="grid grid-cols-2 w-full gap-4">
                      <div class="">
                        <h4>Feature</h4>
                        <ul class="list-disc pl-8">
                          <li>1</li>
                          <li>2</li>
                          <li>3</li>
                        </ul>
                      </div>
                      <div class=" ">
                        <h4>Integration</h4>
                        <ul class="list-disc pl-8">
                          <li>1</li>
                          <li>2</li>
                          <li>3</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-300 p-4 w-[50%] " style="background: #FFFFFF;border: 1px solid #E7E7E7;
                     border-radius: 16px;" id="modal-id-2">
                     <div class=" " >
                      <p class="relative bg-[#EB5757] ml-48 rounded" style="width: 140px;height: 32px;"></p>
                      <img class="rounded w-full relative" src="triangle.png" alt="">
                    </div>
                    <h3 class="mt-4 mb-4 text-center">Lorem ipsum dolor sit amet.</h3>
                    <p class="text-center">consectetur adipisicing elit. Explicabo, deleniti?</p>
                  </div>

  `;

}
loadItems();
