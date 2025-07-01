const ITEMS_CONTAINER = document.getElementById("items");
const ITEMS_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");

let items = getItems();

function getItems() {
    const value = localStorage.getItem("items") || "[]";
    return JSON.parse(value);
}

function setItems(items) {
    const itemsJson = JSON.stringify(items);
    localStorage.setItem("items", itemsJson);
}

function addItem() {
    items.unshift({
        description: "",
        completed: false
    });
    setItems(items);
    refreshList();
}

function updateItem(item, key, value) {
    item[key] = value;
    setItems(items);
    refreshList();
}

function refreshList() {
    ITEMS_CONTAINER.innerHTML = "";

    for (const [index, item] of items.entries()) {
        const itemElement = ITEMS_TEMPLATE.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedInput = itemElement.querySelector(".item-completed");
        const deleteBtn = itemElement.querySelector(".delete-btn");

        descriptionInput.value = item.description;
        completedInput.checked = item.completed;

        descriptionInput.addEventListener("change", () => {
            updateItem(item, "description", descriptionInput.value);
        });
        completedInput.addEventListener("change", () => {
            updateItem(item, "completed", completedInput.checked);
        });
        
        deleteBtn.addEventListener("click", () => {
            items.splice(index, 1);
            setItems(items);
            refreshList();
        });

        ITEMS_CONTAINER.append(itemElement);
    }
}

ADD_BUTTON.addEventListener("click", () => {
    addItem();
});

refreshList();