document.getElementById("uploadBtn").onclick = async () => {
    const fileInput = document.getElementById("mediaFile");
    const file = fileInput.files[0];

    if (!file) {
        alert("Select a file first");
        return;
    }

    try {
        const url = await SupabaseService.uploadMedia(file);
        alert("Upload successful!");
        console.log("Public URL:", url);
    } catch (e) {
        alert("Upload failed: " + e.message);
    }
};
