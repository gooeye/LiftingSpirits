import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";

export function uploadImage(id, folder, fileName) {
    const fileInput = document.getElementById(id);
    const file = fileInput.files[0];
    const storage = getStorage();
    var filePath = fileInput.value.split('.');
    var extension = filePath[filePath.length-1]
    const storageRef = ref(storage, folder+"/"+fileName+"."+extension);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
    return folder+"/"+fileName+"."+extension;
}