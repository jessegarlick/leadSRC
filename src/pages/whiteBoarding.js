function toPhone(arr) {
    // Slice the array into chunks
    let firstChunk = arr.slice(0, 3).join('');
    let secondChunk = arr.slice(3, 6).join('');
    let thirdChunk = arr.slice(6).join('');

    // Format the phone number
    let formattedNumber = `(${firstChunk}) ${secondChunk}-${thirdChunk}`;
    return formattedNumber;
}