type Operation = 'multiply' | 'add' | 'divide';

const multiplicator = (a: number, b: number, Operation: Operation, printText: string) => {
    if (Operation === 'multiply') {
        console.log(printText,  a * b);
    }
    if (Operation === 'add') {
        console.log(printText,  a + b);
    }
    if (Operation === 'divide') {
        console.log(printText,  a / b);
    }
}
 
multiplicator(4, 5,  'add', 'Result is:');

export default multiplicator;