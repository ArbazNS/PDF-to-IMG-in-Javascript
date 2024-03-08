document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var fileInput = document.getElementById('fileInput');
    var file = fileInput.files[0];
    var conversionFormat = document.getElementById('conversionFormat').value;
    
    if (file) {
        convertFile(file, conversionFormat);
    } else {
        alert('Please select a file.');
    }
});

function convertFile(file, conversionFormat) {
    var formData = new FormData();
    formData.append('File', file);

    var convertApiUrl = 'https://v2.convertapi.com/convert/pdf/to/' + conversionFormat + '?Secret=8urPPxhtwuOJyCdV&download=attachment';
    
    fetch(convertApiUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Conversion failed.');
        }
        return response.blob();
    })
    .then(blob => {
        if (conversionFormat === 'jpg') {
            displayImage(blob);
        } else {
            downloadFile(blob, 'converted_document.' + conversionFormat);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Conversion failed.');
    });
}

function displayImage(blob) {
    var imgUrl = URL.createObjectURL(blob);
    var img = document.createElement('img');
    img.src = imgUrl;
    img.style.width="600px";
    img.style.height="auto";

    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.appendChild(img);
    resultDiv.innerHTML += '<a class="button" id="downlodeLink" href="' + imgUrl + '" download="converted_image.jpg">Download Image</a>';
}

function downloadFile(blob, filename) {
    var imgUrl = "document.png";
    var img = document.createElement('img');
    img.src = imgUrl;
    img.style.width="300px";
    img.style.height="auto";

    var downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = filename;
    downloadLink.innerText = 'Download File';
    downloadLink.classList.add('button');

    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    resultDiv.appendChild(img);
    resultDiv.appendChild(downloadLink);
}