import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { loadModel, preprocesImage, loadImage } from "@/utils/imageProcessing";

export default function Home() {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleAnalyzeClick = async () => {
    const fileInput = document.getElementById("image-upload");
    const imageFile = fileInput.files[0];
    const image = await loadImage(imageFile);
    const processImage = preprocesImage(image);
    const preds = await model.predict(processImage).data();
    setPredictions(Array.from(preds));
  };

  useState(() => {
    (async () => {
      const loadedModel = await loadModel();
      setModel(loadedModel);
    })();
  }, []);
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>AI-Powered Web App</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>AI-Powered Web Application</h1>
          <p className={styles.description}>
            Using Next.js and TensorFlow.js to show some AI model.
          </p>
          <div id="input-area">
            <input type="file" className={styles.input} id="image-upload" />
            <button className={styles.button} onClick={handleAnalyzeClick}>
              Analyze Image
            </button>
          </div>
          <div id="output-area">
            {predictions.length > 0 && (
              <ul>
                {predictions.map((pred, index) => (
                  <li key={index}>
                    Prediction {index + 1}: {pred.toFixed(2)}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
