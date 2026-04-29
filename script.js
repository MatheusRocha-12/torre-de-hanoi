let movimentos = 0;
let totalDiscos = 4;

const cores = [
    'linear-gradient(to right, #ff416c, #ff4b2b)',
    'linear-gradient(to right, #f8ff00, #3ad59f)',
    'linear-gradient(to right, #00b4db, #0083b0)',
    'linear-gradient(to right, #a8ff78, #78ffd6)',
    'linear-gradient(to right, #f953c6, #b91d73)',
    'linear-gradient(to right, #4568dc, #b06ab3)',
    'linear-gradient(to right, #56ab2f, #a8e063)',
    'linear-gradient(to right, #ec008c, #fc6767)'
];

// Seletores
const diskSelect = document.getElementById('diskSelect');
const moveDisplay = document.getElementById('moveCount');
const minMovesDisplay = document.getElementById('minMoves');
const messageDisplay = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const towers = document.querySelectorAll('.tower');

function iniciarJogo() {
    totalDiscos = parseInt(diskSelect.value);
    movimentos = 0;
    moveDisplay.innerText = movimentos;
    messageDisplay.innerText = '';
    
    const minIdeal = Math.pow(2, totalDiscos) - 1;
    minMovesDisplay.innerText = minIdeal;

    document.querySelectorAll('.disk-container').forEach(c => c.innerHTML = '');

    const container1 = document.querySelector('#tower1 .disk-container');

    for (let i = totalDiscos; i >= 1; i--) {
        const disk = document.createElement('div');
        disk.className = 'disk';
        disk.id = 'disk' + i;
        disk.draggable = true;
        disk.dataset.size = i;
        disk.addEventListener('dragstart', drag);

        const width = 40 + (i * 20);
        disk.style.width = width + 'px';
        disk.style.background = cores[i - 1];

        container1.appendChild(disk);
    }
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    const container = ev.target.parentElement;
    if (ev.target !== container.lastElementChild) {
        ev.preventDefault();
        return;
    }
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const tower = ev.target.closest('.tower');
    const containerDestino = tower.querySelector('.disk-container');
    
    const data = ev.dataTransfer.getData("text");
    const draggedDisk = document.getElementById(data);
    
    if (draggedDisk.parentElement === containerDestino) return;

    const topoDestino = containerDestino.lastElementChild;
    const tamanhoArrastado = parseInt(draggedDisk.dataset.size);
    const tamanhoTopo = topoDestino ? parseInt(topoDestino.dataset.size) : 99;

    if (tamanhoArrastado < tamanhoTopo) {
        containerDestino.appendChild(draggedDisk);
        movimentos++;
        moveDisplay.innerText = movimentos;
        verificarVitoria();
    }
}

function verificarVitoria() {
    const container3 = document.querySelector('#tower3 .disk-container');
    if (container3.childElementCount == totalDiscos) {
        const minIdeal = Math.pow(2, totalDiscos) - 1;
        messageDisplay.innerText = movimentos === minIdeal ? 
            "🏆 INCRÍVEL! Vitória perfeita!" : "🎉 Parabéns! Você concluiu o desafio!";
    }
}

// Event Listeners
diskSelect.addEventListener('change', iniciarJogo);
resetBtn.addEventListener('click', iniciarJogo);
towers.forEach(tower => {
    tower.addEventListener('dragover', allowDrop);
    tower.addEventListener('drop', drop);
});

window.onload = iniciarJogo;