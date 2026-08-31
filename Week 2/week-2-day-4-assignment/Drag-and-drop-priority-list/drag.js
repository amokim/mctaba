const list = document.getElementById('priority-list');
let draggedItem = null;

const getItems = () => [...list.querySelectorAll('.priority-item')];

const updatePriorityNumbers = () => {
    getItems().forEach((item, index) => {
        item.querySelector('.priority-number').textContent = `${index + 1}.`;
    });
};

const clearDropIndicators = () => {
    getItems().forEach(item => {
        item.classList.remove('drag-over-top', 'drag-over-bottom');
    });
};

list.addEventListener('dragstart', e => {
    const item = e.target.closest('.priority-item');
    if (!item) return;

    draggedItem = item;
    e.dataTransfer.effectAllowed = 'move';

    // Delay the fade so the drag "ghost" image is captured at full opacity
    requestAnimationFrame(() => item.classList.add('dragging'));
});

list.addEventListener('dragover', e => {
    e.preventDefault();

    const item = e.target.closest('.priority-item');
    if (!item || item === draggedItem) return;

    const rect = item.getBoundingClientRect();
    const isAboveMiddle = e.clientY < rect.top + rect.height / 2;

    clearDropIndicators();
    item.classList.add(isAboveMiddle ? 'drag-over-top' : 'drag-over-bottom');
});

list.addEventListener('drop', e => {
    e.preventDefault();

    const item = e.target.closest('.priority-item');
    if (!item || item === draggedItem) return;

    const rect = item.getBoundingClientRect();
    const isAboveMiddle = e.clientY < rect.top + rect.height / 2;

    if (isAboveMiddle) {
        list.insertBefore(draggedItem, item);
    } else {
        list.insertBefore(draggedItem, item.nextSibling);
    }

    updatePriorityNumbers();
});

list.addEventListener('dragend', () => {
    draggedItem.classList.remove('dragging');
    clearDropIndicators();
    draggedItem = null;
});
