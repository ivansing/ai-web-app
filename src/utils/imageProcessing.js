import * as tf from '@tensorflow/tfjs';

export async function loadModel() {
    const model = await tf.loadLayersModel('/model/model.json');
    return model;
}

export function preprocesImage(image) {
    return tf.browser.fromPixels(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();
}

export function loadImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => resolve(img);
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    })
}