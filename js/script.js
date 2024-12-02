const numbers = [];
const baseList = Array.from({ length: 200 }, (_, i) => i + 1);
const carouselContainer = document.getElementById('carouselContainer');
let currentSlide = 0;

function addNumber() {
    const input = document.getElementById('numberInput');
    const value = parseInt(input.value);
    if (!isNaN(value)) {
        numbers.push(value);
        displayNumbers();
        input.value = '';
    } else {
        alert('Por favor, insira um número válido!');
    }
}

function generateRandomList() {
    const select = document.getElementById('presetList');
    const size = parseInt(select.value);
    if (!isNaN(size)) {
        numbers.length = 0;
        const shuffled = [...baseList].sort(() => Math.random() - 0.5);
        numbers.push(...shuffled.slice(0, size));
        displayNumbers();
    }
}

function displayNumbers() {
    const numberList = document.getElementById('numberList');
    numberList.innerHTML = numbers.map(num => `<div class="number">${num}</div>`).join('');
}

function clearList() {
    numbers.length = 0; // Limpa o array de números
    displayNumbers(); // Atualiza a exibição da lista
}

function bubbleSort(arr) {
    const sorted = [...arr];
    for (let i = 0; i < sorted.length; i++) {
        for (let j = 0; j < sorted.length - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
            }
        }
    }
    return sorted;
}

function selectionSort(arr) {
    const sorted = [...arr];
    for (let i = 0; i < sorted.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < sorted.length; j++) {
            if (sorted[j] < sorted[minIdx]) {
                minIdx = j;
            }
        }
        [sorted[i], sorted[minIdx]] = [sorted[minIdx], sorted[i]];
    }
    return sorted;
}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const sorted = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sorted.push(left.shift());
        } else {
            sorted.push(right.shift());
        }
    }
    return [...sorted, ...left, ...right];
}

function quickSort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = arr.slice(0, -1).filter(x => x <= pivot);
    const right = arr.slice(0, -1).filter(x => x > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
}

function shellSort(arr) {
    const sorted = [...arr];
    let gap = Math.floor(sorted.length / 2);
    while (gap > 0) {
        for (let i = gap; i < sorted.length; i++) {
            const temp = sorted[i];
            let j;
            for (j = i; j >= gap && sorted[j - gap] > temp; j -= gap) {
                sorted[j] = sorted[j - gap];
            }
            sorted[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return sorted;
}

function insertionSort(arr) {
    const sorted = [...arr];
    for (let i = 1; i < sorted.length; i++) {
        let key = sorted[i];
        let j = i - 1;
        while (j >= 0 && sorted[j] > key) {
            sorted[j + 1] = sorted[j];
            j--;
        }
        sorted[j + 1] = key;
    }
    return sorted;
}

function sortList() {
    const algorithms = [
        { name: 'Bubble Sort', func: bubbleSort, target: 'bubbleSortResult' },
        { name: 'Selection Sort', func: selectionSort, target: 'selectionSortResult' },
        { name: 'Merge Sort', func: mergeSort, target: 'mergeSortResult' },
        { name: 'Quick Sort', func: quickSort, target: 'quickSortResult' },
        { name: 'Shell Sort', func: shellSort, target: 'shellSortResult' },
        { name: 'Insertion Sort', func: insertionSort, target: 'insertionSortResult' },
    ];

    // Número de iterações para cálculo médio
    const iterations = 100;

    algorithms.forEach(algo => {
        let totalTimeNs = 0;

        for (let i = 0; i < iterations; i++) {
            const arrayCopy = [...numbers]; // Evita mutação do array
            const start = performance.now(); // Tempo inicial (ms)
            algo.func(arrayCopy);
            const end = performance.now(); // Tempo final (ms)

            // Converte o tempo para nanosegundos e soma
            totalTimeNs += (end - start) * 1e6; // ms para ns
        }

        // Calcula o tempo médio em microssegundos com precisão de nanosegundos
        const averageTimeUs = totalTimeNs / (iterations * 1e3); // Nano para micro
        const microseconds = Math.floor(averageTimeUs); // Parte inteira em µs
        const nanoseconds = Math.round((averageTimeUs - microseconds) * 1e3); // Parte decimal em ns

        // Atualiza o DOM com os resultados
        const targetDiv = document.getElementById(algo.target);
        targetDiv.innerHTML = `
            <h2>${algo.name}</h2>
            <br>
            <div class="sorted-list">${algo.func([...numbers]).join(', ')}</div>
            <div class="time">Tempo médio: ${microseconds + (nanoseconds/1000)} µs</div>
            <pre class="code">${algo.func.toString()}</pre>
        `;
    });
}

function updateCarousel() {
    carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function prev() {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
}

function next() {
    if (currentSlide < carouselContainer.children.length - 1) {
        currentSlide++;
        updateCarousel();
    }
}