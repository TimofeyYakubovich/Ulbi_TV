// рекурсия это функция каторая вызывает сама себя
// рекурсия всегда должна иметь какое то условие при катором вызов функции прекращается иначе она будет вызывать сама себя бесконечно

// реализуем функцию каторая будет подсчитывать факториал числа
// факториал от 5 это 1*2*3*4*5
const factorial = (n) => {
    if (n === 1) { // условие при катором рекурсия закончится
        return 1
    }
    console.log(n)
    return n * factorial(n - 1) // функция возвращает число каторое передали аргументом умноженое на результат работы этой же функции 
                                // в каторую аргументом передаем число на 1 меньше n
                                // тоесть эта функция будет самовызываться до тех пор пока n не будет равняться 1
}

console.log(factorial(5))

// чисоа фибоначчи - 1,1,2,3,5,6,13,21 каждое последующие число равняется сумме двух предыдущих

const fibonachi = (n) => {
    if (n === 1 || n === 2) { // 1 и 2 число фибоначчи это 1 это и будет базовый случай при катором рекурсия будет завершаться
        return 1              
    }
    console.log(n)
    // console.log(((n - 1)+(n - 2)))
    return fibonachi(n-1) + fibonachi(n-2) // функция будет возвращать сумму результатов работы вызывов самой себя 
                                           // но праметром в 1 случае передаем число каорое стоит на 1 позицию раньше в 2 случае на 2 позиции раньше
}

console.log(fibonachi(8))

