import React from "react";

function App() {
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
    </div>
  );
}

export default App;
