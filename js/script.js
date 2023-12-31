const loadItems = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();

  showLoader();
  const showAllButton = document.getElementById("show-more");
  let items = data.data.tools.slice(0, 6); // initially show only 6 items

  // update items array and re-render items when "show all" button is clicked
  showAllButton.addEventListener("click", () => {
    showLoader();
    items = data.data.tools;
    displayItems(items);
    showAllButton.classList.add("hidden");
  });
  const sorting = document.getElementById("shorting");
  sorting.addEventListener("click", function () {
    displayItems(
      items.sort((a, b) => new Date(b.published_in) - new Date(a.published_in))
    );
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
      "shadow-md",
      "bg-base-100",
      "p-6",
      "rounded-lg"
    );
    itemDiv.innerHTML = `
      <figure>
        <img class="rounded" style="width: 100%;height: 250px;"
          src="${item.image}"
          alt="Shoes"
        />
      </figure>
      <div class="card-body mt-4">
        <h2 class="card-title text-[#111111] not-italic font-semibold text-xl">Features</h2>
        <p>
          <ol class="list-decimal pl-8 text-[#585858] mt-2">
            ${
              item.features[0]
                ? `<li class="mb-1">${item.features[0]}</li>`
                : "No feature"
            }
           ${
             item.features[1]
               ? `<li class="mb-1">${item.features[1]}</li>`
               : "`<br>`"
           }
            ${
              item.features[2]
                ? `<li class="mb-1">${item.features[2]}</li>`
                : "<br>"
            }
         </ol>
      </p>
      <hr class="border-b border-b-2 border-gray-400 my-4" >
        <div class="card-actions flex justify-between  items-center">
          <div>
            <h2 class=" text-[#111111] font-semibold text-xl mb-2">${
              item.name ? item.name : "No name"
            }</h2>
            <p class="text-[#585858]"><i class="fa-solid fa-calendar-days mr-2"></i>
            ${item.published_in ? item.published_in : "No published date"} 
             </p>
          </div>
         <button class="rounded-full text-[#eb5757]" type="button" 
         onclick="loadItemsDetails('${item.id}')"
         style="background-color: #FEF7F7; 
           width: 50px; height: 50px";>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
        </div>
      </div>
    `;
    itemsContainer.appendChild(itemDiv);
  });
  hideLoader();
};
const loadItemsDetails = async (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayItemDetails(data?.data);
  toggleModal("modal-id");
};
function toggleModal(modalID) {
  document.getElementById(modalID).classList.toggle("hidden");
  document.getElementById(modalID + "-backdrop").classList.toggle("hidden");
  document.getElementById(modalID).classList.toggle("flex");
  document.getElementById(modalID + "-backdrop").classList.toggle("flex");
}

const loader = document.getElementById("loader");
function showLoader() {
  loader.style.display = "block";
}
function hideLoader() {
  loader.style.display = "none";
}

const displayItemDetails = (item) => {
  const modalTitle = document.getElementById("modal-title");
  modalTitle.innerText = item?.tool_name;
  const detailsDiv = document.getElementById("details");
  detailsDiv.innerHTML = `
   <div class="bg-blue-400 p-4 md:w-[50%]" style="background: rgba(235, 87, 87, 0.05);
      border: 1px solid #EB5757;border-radius: 16px;" id="modal-id-1">
        <p class="text-lg text-[#111111] font-semibold">${
          item?.description ? item.description : "No description"
        }</p>
        <div class="md:flex md:flex-row gap-2  my-4 ">
            <p class="p-2 mb-2  text-[#03A30A] font-bold text-sm text-center" style="background: #FFFFFF;
              border-radius: 16px;">
                      ${
                        item?.pricing
                          ? item.pricing[0].price
                            ? `<span>${item.pricing[0].price}</span><br>`
                            : "No pricing"
                          : "No pricing "
                      } 
                      ${
                        item?.pricing
                          ? item.pricing[0]?.plan
                            ? `<span>${item.pricing[0].plan}</span>`
                            : "No Plan"
                          : "No plan"
                      }</p>
                    <p class=" mb-2 p-2  text-[#F28927] font-bold text-sm text-center" 
                    style="background: #FFFFFF;
                    border-radius: 16px;">
                      ${
                        item?.pricing
                          ? item.pricing[1].price
                            ? `<span>${item.pricing[1].price}</span><br>`
                            : "No pricing"
                          : "No pricing "
                      } 
                      ${
                        item?.pricing
                          ? item.pricing[1]?.plan
                            ? `<span>${item.pricing[1].plan}</span><br>`
                            : "No Plan"
                          : "No plan"
                      }</p>
                    <p class="p-2 text-[#EB5757] font-bold text-sm text-center" 
                    style="background: #FFFFFF;border-radius: 16px;">
                      ${
                        item?.pricing
                          ? item.pricing[2].price
                            ? `<span>${item.pricing[2].price}</span><br>`
                            : "No pricing"
                          : "No pricing "
                      } 
                      ${
                        item?.pricing
                          ? item.pricing[2]?.plan
                            ? `<span>${item.pricing[2].plan}</span><br>`
                            : "No Plan"
                          : "No plan"
                      }</p>
                    </div>
                    <div class="md:grid md:grid-cols-2 w-full  gap-4">
                      <div class="">
                        <h4 class="font-semibold text-base text-[#111111]">Feature</h4>
                        <ul class="list-disc mt-3  pl-8">
                          ${
                            item?.features
                              ? `<li class="font-normal text-sm text-[#585858]"> ${item.features[1].feature_name}</li>`
                              : "No Feature"
                          }
                          ${
                            item?.features
                              ? `<li class="font-normal text-sm text-[#585858]"> ${item.features[2].feature_name}</li>`
                              : "No Feature"
                          }
                          ${
                            item?.features
                              ? `<li class="font-normal text-sm text-[#585858]"> ${item.features[3].feature_name}</li>`
                              : "No Feature"
                          }
                        </ul>
                      </div>
                      <div class=" ">
                        <h4 class="font-semibold text-base text-[#111111]">Integration</h4>
                        <ul class="list-disc mt-3 pl-8">
                          ${
                            item?.integrations
                              ? item?.integrations[0]
                                ? `<li class="font-normal text-sm text-[#585858]">${item.integrations[0]}</li>`
                                : "No data found"
                              : "No Data found"
                          }
                          
                          ${
                            item?.integrations
                              ? item?.integrations[1]
                                ? `<li class="font-normal text-sm text-[#585858]">${item.integrations[1]}</li>`
                                : ""
                              : ""
                          }
                          
                          ${
                            item?.integrations
                              ? item?.integrations[2]
                                ? `<li class="font-normal text-sm text-[#585858]">${item.integrations[2]}</li>`
                                : ""
                              : ""
                          }
                        </ul>
                      </div>
                    </div>
                  </div>
        <div class="bg-gray-300 p-4 md:w-[50%] mt-4 md:mt-0" style="background: #FFFFFF;border: 1px solid #E7E7E7;
         border-radius: 16px;" id="modal-id-2">
          <div class="">
            <div style="position: relative;">
              <img class="rounded w-full" src="${item?.image_link[0]}" alt="">
             <div style="position: absolute; top: 12%; right: 2%; "> 
                ${
                  item?.accuracy
                    ? item.accuracy.score
                      ? `<span class="p-3 rounded"  style="color: white; background-color: #EB5757; font-weight: bold;">
                    ${item.accuracy.score + "" + "% accuracy"}</span>`
                      : ""
                    : ""
                }
             </div>
           </div>
        </div>
        <h3 class="mt-4 mb-4 text-[#111111] text-center text-base font-semibold">
        ${
          item?.input_output_examples
            ? item.input_output_examples[0].input
            : "<br>"
        }</h3>
        <p class="text-center  text-xs text-[#585858]  font-normal">
        ${
          item?.input_output_examples
            ? item.input_output_examples[0].output
            : "Not! Not Yet! Take a break!!!"
        }</p>
   </div>

  `;
};
loadItems();
