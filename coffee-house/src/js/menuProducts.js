const tabItems = document.querySelectorAll('.btn-tab-item');

tabItemClickHandler();

function tabItemClickHandler() {
  tabItems.forEach((item) => {
    item.addEventListener('click', () => {
      itemSwitcher(item);
    });
  });
}

function itemSwitcher(item) {
  tabItems.forEach((item) => {
    item.disabled = false;
  });
  item.disabled = true;
}
