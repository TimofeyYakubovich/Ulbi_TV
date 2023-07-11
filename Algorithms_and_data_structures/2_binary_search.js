// алгритм бинарного поиска в массиве
const array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
let count = 0

function binarySearch(array, item) {
    // что бы получить центральный элиментв массиве надо знать позици первого элимента и позицю последнего
    let start = 0            // позиция первого элимента
    let end = array.length   // позиция последнего элимента по длине массива
    let middle               // позиция центрального элимента
    let found = false        // флаг нашли элимент в массиве или нет
    let position = -1        // позиция самого элимента каторую возвращаем из функции если элимент не был найден возвращаем -1
    // console.log('end = ', end)
    while (found === false && start <= end) { // цикл while будет крутиться до тех пор пока либо не найдется искомый элимент found === false
        // либо стартовые и конечные позиции не поровнялись start <= end
        count += 1
        // высчитываем позицию центрального элимента start + end) / 2
        middle = Math.floor((start + end) / 2) // Math.floor округляет плученое згачение до целого нижнец границы
        // console.log('array[middle] = ', array[middle])
        if (array[middle] === item) { // если элимент по индексу карый мы высчетали равен искомому элименту то return position
            found = true      // прерываем цикл 
            position = middle // присваиваем позицию найденного элимента
            // console.log('middle = ', middle)
            return position
        }

        if (item < array[middle]) { // если элимент не нашли тогда проверяем если искомый элимент меньше чем центральный элимент
            // тогда нас интересует только левая часть массива 
            end = middle - 1 // изменяем значчение переменной end что бы в следующей итерации высчитывать центральный элимент из левой части массива
        } else {
            start = middle + 1
        }
    }
    return position;
}

console.log(binarySearch(array, 0))
console.log('count = ', count)
// 4 максимальное количество итераций за каторое можно найти любое число в этом массиве
// поэтому сложость такова алгоритма 0(Log2n) в этом случае 16 элиментов логорифм от 16 по основанию 2 = 4


const array1 = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
let count1 = 0

function recursiveBinarySearch(array, item, start, end) {
    let middle = Math.floor((start + end) / 2)
    count1 += 1
    if (item === array[middle]) { // если искомый элимент ровняется центральному элименту то возвращаем позицию этого элимента
        return middle
    }
    if (item < array[middle]) { // если искомый элимент меньше чем центральный элимент
        // то возвращаем результат работы функции recursiveBinarySearch но как конечный элимент передаем middle - 1 что бы центральный элимент
        // высчиывался в левой части массива
        return recursiveBinarySearch(array, item, start, middle - 1)
    } else {
        return recursiveBinarySearch(array, item, middle + 1, end)
    }
}

console.log(recursiveBinarySearch(array1, 12, 0, array1.length))
console.log('count = ', count1)