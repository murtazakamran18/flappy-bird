const image = new Image(); // ایک نیا Image آبجیکٹ بنائیں
image.src = 'Screenshot_2024-11-29_005537-removebg-preview (1).jpg'; // تصویر کا سورس سیٹ کریں

image.onload = function() {
    console.log('Image Width:', image.naturalWidth); // چوڑائی چیک کریں
    console.log('Image Height:', image.naturalHeight); // اونچائی چیک کریں
};
