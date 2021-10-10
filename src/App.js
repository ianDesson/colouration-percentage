import React from "react";

function App() {
  const [percentages, setPercentages] = React.useState([0, 0, 0, 0]);
  const ref = React.useRef();

  const imageUpload = (input) => {
    if (input.target.files && input.target.files[0]) {
      const image = new Image();
      image.src = URL.createObjectURL(input.target.files[0]);
      // render image in canvas
      image.onload = () => {
        const canvas = ref.current;
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        getPercentages(
          context.getImageData(0, 0, image.width, image.height).data
        );
      };
    }
  };

  const getPercentages = (imageData) => {
    let redCount = 0;
    let greenCount = 0;
    let blueCount = 0;

    for (let i = 0; i < imageData.length; i += 4) {
      let red = imageData[i];
      let green = imageData[i + 1];
      let blue = imageData[i + 2];
      // let alpha = imageData[i + 3];

      if (red > green && red > blue) {
        redCount++;
      } else if (green > red && green > blue) {
        greenCount++;
      } else if (blue > red && blue > green) {
        blueCount++;
      }
    }
    console.log("total: ", imageData.length / 4);
    console.log("Red Count:", redCount);
    console.log("Green Count:", greenCount);
    console.log("Blue Count:", blueCount);
    setPercentages([redCount, greenCount, blueCount, imageData.length / 4]);
  };

  return (
    <div className="App" style={{ textAlign: "center" }}>
      <label htmlFor="image">Upload an image here:</label>
      <br />
      <input
        id="image"
        type="file"
        accept=".jpeg,.png"
        onChange={imageUpload}
      ></input>
      <canvas ref={ref} />
      {percentages[3] > 0 && (
        <div>
          <p>
            There are {percentages[0]} red pixels. Taking up{" "}
            {Math.round((percentages[0] / percentages[3]) * 100, 2)}% of the
            image.
          </p>
          <p>
            There are {percentages[1]} green pixels. Taking up{" "}
            {Math.round((percentages[1] / percentages[3]) * 100, 2)}% of the
            image.
          </p>
          <p>
            There are {percentages[2]} blue pixels. Taking up{" "}
            {Math.round((percentages[2] / percentages[3]) * 100, 2)}% of the
            image.
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
