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
const displayItemDetails = (item) => {
  const modalTitle = document.getElementById("modal-title");
  modalTitle.innerText = item.tool_name;
  const detailsDiv = document.getElementById("deatils");
  detailsDiv.innerHTML = `
  <div class="bg-blue-400 p-4 md:w-[50%]" style="background: rgba(235, 87, 87, 0.05);
                    border: 1px solid #EB5757;border-radius: 16px;" id="modal-id-1">
                    <p>${item.description}</p>
                    <div class="md:flex md:flex-row gap-2  my-4 ">
                    <p class="p-2 text-[#03A30A] font-bold text-sm text-center" style="background: #FFFFFF;border-radius: 16px;">
                      <span>${item.pricing[0].price}</span><br><span>${item.pricing[0].plan}</span></p>
                    <p class="p-2 text-[#F28927] font-bold text-sm text-center" style="background: #FFFFFF;border-radius: 16px;">
                      <span>${item.pricing[1].price}</span><br><span>${item.pricing[1].plan}</span></p>
                    <p class="p-2 text-[#EB5757] font-bold text-sm text-center" style="background: #FFFFFF;border-radius: 16px;">
                      <span>${item.pricing[2].price}</span><br><span>${item.pricing[2].plan}</span></p>
                    </div>
                    <div class="md:grid md:grid-cols-2 w-full  gap-4">
                      <div class="">
                        <h4 >Feature</h4>
                        <ul class="list-disc mt-3  pl-8">
                          <li class="font-normal text-sm text-[#585858]">${item.features[1].feature_name}</li>
                          <li class="font-normal text-sm text-[#585858]">${item.features[2].feature_name}</li>
                          <li class="font-normal text-sm text-[#585858]">${item.features[3].feature_name}</li>
                        </ul>
                      </div>
                      <div class=" ">
                        <h4 >Integration</h4>
                        <ul class="list-disc mt-3 pl-8">
                          <li class="font-normal text-sm text-[#585858]">${item.integrations[0]}</li>
                          <li class="font-normal text-sm text-[#585858]">${item.integrations[1]}</li>
                          <li class="font-normal text-sm text-[#585858]">${item.integrations[2]}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="bg-gray-300 p-4 md:w-[50%] " style="background: #FFFFFF;border: 1px solid #E7E7E7;
                     border-radius: 16px;" id="modal-id-2">
                    <div class="">
                      <div style="position: relative;">
                        <img class="rounded w-full" src="${item.image_link[0]}" alt="">
                       <div style="position: absolute; top: 12%; right: 2%; ">
                        <span class="p-3 rounded"  style="color: white; background-color: #EB5757; font-weight: bold;">Some text</span>
                       </div>
                      </div>
                   </div>
                    <h3 class="mt-4 mb-4 text-center">Lorem ipsum dolor sit amet.</h3>
                    <p class="text-center">consectetur adipisicing elit. Explicabo, deleniti?</p>
                  </div>

  `;
};
loadItems();
