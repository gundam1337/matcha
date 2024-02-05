function replaceFiles(array1, array2) {
    // Clone array2 to avoid modifying the original array
    let newArray = [...array2];

    // Iterate over array1 and replace elements in newArray from the end
    for (let i = 0; i < array1.length; i++) {
        newArray[newArray.length - 1 - i] = array1[i];
    }

    return newArray;
}

// Example usage
let array1 = ['newFile1', 'newFile2', 'newFile3']; // newer files
let array2 = ['oldFile1', 'oldFile2', 'oldFile3']; // existing files

let updatedArray = replaceFiles(array1, array2);
console.log(updatedArray);



// let oldFiles = ['oldFile1', 'oldFile2', 'oldFile3']; // initial files
// let newFiles = ['newFile1', 'newFile2']; // newly uploaded files

// // Step 1: Identify deleted files
// let deletedFiles = oldFiles.filter(file => !newFiles.includes(file));

// // Step 2: Delete files from storage
// deletedFiles.forEach(file => {
//     // Code to delete the file from storage
//     deleteFileFromStorage(file);
// });

// // Step 3: Add new files to storage
// newFiles.forEach(file => {
//     // Code to add the file to storage
//     addFileToStorage(file);
// });

// // Step 4: Update file array
// let currentFiles = oldFiles.filter(file => !deletedFiles.includes(file)).concat(newFiles);