const compareImages = require("resemblejs/compareImages");
const fs = require("mz/fs");

async function getDiff() {
    const options = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 255
            },
            errorType: "movement",
            transparency: 0.3,
            largeImageThreshold: 1200,
            useCrossOrigin: false,
            outputDiff: true
        },
        scaleToSameSize: true,
        ignore: "antialiasing"
    };

    // The parameters can be Node Buffers
    // data is the same as usual with an additional getBuffer() function
    const data = await compareImages(
        await fs.readFile("./img_02.jpg"),
        await fs.readFile("./output.png"),
        options
    );

    const diffIndex = data.misMatchPercentage;

    if(diffIndex > 80){
        console.log("INDENTICAL");
    }
    else{
        console.log("NOT INDENTICAL");
    }

    console.log(data.misMatchPercentage)

    // await fs.writeFile("./output.png", data.getBuffer());
}

getDiff();
