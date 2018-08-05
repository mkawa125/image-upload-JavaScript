//  http://tech.pro/tutorial/1383/javascript-one-language-to-rule-them-all
var ls = window.localStorage,
    photo = document.getElementById('uploadImage'),
    canvas = document.getElementById('canvas'),
    caption = document.getElementById('caption'),
    colors = document.getElementsByName('color'),
    context = canvas.getContext('2d'),
    fileReader = new FileReader(),
    img = new Image(), lastImgData = ls.getItem('image'),
    x, y,
    currentText = ls.getItem('text') || "",
    color = ls.getItem('color') || "black", neww = 0, newh = 0;

if (color) {
    Array.prototype.forEach.call(colors, function(el) {
        if (el.value === color) {
            el.checked = true;
        }
    });
}

if (currentText) {
    caption.value = currentText;
}

if (lastImgData) {
    img.src = lastImgData;
}

fileReader.onload = function (e) {
    console.log(typeof e.target.result, e.target.result instanceof Blob);
    img.src = e.target.result;
};

img.onload = function() {
    var rw = img.width / canvas.width; // width and height are maximum thumbnail's bounds
    var rh = img.height / canvas.height;

    if (rw > rh)
    {
        newh = Math.round(img.height / rw);
        neww = canvas.width;
    }
    else
    {
        neww = Math.round(img.width / rh);
        newh = canvas.height;
    }

    x = (canvas.width - neww) / 2,
        y = (canvas.height - newh) / 2;

    drawImage();
};

photo.addEventListener('change', function() {
    var file = this.files[0];
    return file && fileReader.readAsDataURL(file);
});

caption.addEventListener('change', function(event) {
    currentText = event.target.value;
    drawImage();
});

canvas.addEventListener('dragover', function(event) {
    event.preventDefault();
});

canvas.addEventListener('drop', function(event) {
    event.preventDefault();
    fileReader.readAsDataURL(event.dataTransfer.files[0]);
});

Array.prototype.forEach.call(colors, function(el) {
    el.addEventListener('change', function(e) {
        color = e.target.value;
        drawImage(currentText);
    });
});


function drawImage() {
    var dataUrl;

    canvas.width = canvas.width;

    if (img.width) context.drawImage(img, x, y, neww, newh);

    context.font = 'bold 18pt arial';
    context.fillStyle = color;
    context.fillText(currentText, 150, 100);

    dataUrl = canvas.toDataURL();

    document.getElementById('imageData').href = dataUrl;
    document.getElementById('preview').src = dataUrl;

    ls.setItem('text', currentText);
    ls.setItem('color', color);
    ls.setItem('image', img.src);
}

drawImage();