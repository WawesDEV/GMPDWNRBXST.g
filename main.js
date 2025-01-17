submitBtn.addEventListener('click', () => {
    const width = document.getElementById('width').value;
    const height = document.getElementById('height').value;
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;

            // Создаем canvas для изменения размера изображения
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            img.onload = function() {
                ctx.drawImage(img, 0, 0, width, height);

                // Создаем ссылку для скачивания
                canvas.toBlob(function(blob) {
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = 'resized_image.png'; // Название файла
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }, 'image/png');
            }
        }
        reader.readAsDataURL(file);
    } else {
        alert('Пожалуйста, загрузите изображение.');
    }
});
