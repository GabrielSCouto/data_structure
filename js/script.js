const baseList = Array.from({ length: 200 }, (_, i) => i + 1); // Lista com números de 1 a 200
const numbers = [];
const resultDiv = document.getElementById('result');

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
        numbers.length = 0; // Limpa a lista atual
        const shuffled = [...baseList].sort(() => Math.random() - 0.5); // Embaralha os números
        numbers.push(...shuffled.slice(0, size)); // Adiciona 'size' números aleatórios
        displayNumbers();
    }
}

function displayNumbers() {
    const numberList = document.getElementById('numberList');
    numberList.innerHTML = numbers.map(num => `<div class="number">${num}</div>`).join('');
}

// Algoritmos
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

// Exibir resultados com código
function sortList() {
    resultDiv.innerHTML = '';
    const algorithms = [
        { name: 'Bubble Sort (O(n²))', func: bubbleSort, code: bubbleSort.toString() },
        { name: 'Selection Sort (O(n²))', func: selectionSort, code: selectionSort.toString() },
        { name: 'Merge Sort (O(n log n))', func: mergeSort, code: mergeSort.toString() },
        { name: 'Quick Sort (O(n log n))', func: quickSort, code: quickSort.toString() },
        { name: 'Insertion Sort (O(n²))', func: insertionSort, code: insertionSort.toString() },
        { name: 'Shell Sort (O(n²))', func: shellSort, code: shellSort.toString() },

    ];

    algorithms.forEach(algo => {
        const start = performance.now();
        const sorted = algo.func(numbers);
        const end = performance.now();

        const algoDiv = document.createElement('div');
        algoDiv.className = 'algorithm';
        algoDiv.innerHTML = `
            <h3>${algo.name}</h3>
            <div class="sorted-list">${sorted.join(', ')}</div>
            <div class="time">Time: ${((end - start)*1000).toFixed(2)} µs</div>
            <div class="code"><strong>Code:</strong><pre>${algo.code}</pre></div>
        `;
        resultDiv.appendChild(algoDiv);
    });
}