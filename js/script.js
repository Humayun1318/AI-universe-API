const loadItems = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayItems(data.data.tools);
}

const displayItems = (items) => {
    const itemsContainer = document.getElementById("items-container");
    
}

loadItems();