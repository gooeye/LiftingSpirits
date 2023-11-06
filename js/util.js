import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js";

export function uploadImage(id, folder, fileName) {
    const storage = getStorage();
    const fileInput = document.getElementById(id);
    const file = fileInput.files[0];
    var filePath = fileInput.value.split('.');
    var extension = filePath[filePath.length-1]
    const storageRef = ref(storage, folder+"/"+fileName+"."+extension);
    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
    return folder+"/"+fileName+"."+extension;
}

export async function getUrl(file) {
    const storage = getStorage();
    try {
        const url = await getDownloadURL(ref(storage, file))
        return url
    } catch (e) {
        console.log(e)
    }
}