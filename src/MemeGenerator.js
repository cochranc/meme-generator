import React, { useState, useEffect } from "react";

export default function MemeGenerator() {
    const [image, setImage] = useState("http://i.imgflip.com/1bij.jpg");
    const [topText, setTopText] = useState('');
    const [bottomText, setBottomText] = useState('');
    const [fontsize, setFontSize] = useState(22);
    const base = {
        memes: [{ url: "https://i.imgflip.com/1ur9b0.jpg" }]
    }
    const [allImages, setAllImages] = useState(base);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => setAllImages(data.data));
    })

    function generateImage() {
        let num = Math.floor(Math.random() * allImages.memes.length);
        let pic = allImages.memes[num].url
        setImage(pic);
    }

    function handleChange(e) {
        if (e.target.name === "topText") {
            setTopText(e.target.value);
        }
        else if (e.target.name === "bottomText") {
            setBottomText(e.target.value);
        }
        else {
            setFontSize(e.target.value);
        }
    }

    return (
        <div>
            <h1 id="title">Mêmê Gêñêrå†ðr</h1>
            <div id="page">
                <div id="input">
                    <input type="text"
                        name="topText"
                        placeholder="top text"
                        onChange={handleChange}
                    /> <br />
                    <input type="text"
                        name="bottomText"
                        placeholder="bottom text"
                        onChange={handleChange}
                    /> <br />
                    <input type="text"
                        name="fontSize"
                        placeholder="font size"
                        onChange={handleChange} /> <br />
                    <button id="generateMemeButton"
                        onClick={generateImage}>
                        New Image</button>
                </div>
                <div>
                    <div id="meme">
                        <h2 style={{ fontSize: Number(fontsize) }}
                            id="top"
                        >
                            {topText}</h2>
                        <img src={image}
                            alt=""
                        />
                        <h2 style={{ fontSize: Number(fontsize) }}
                            id="bottom"
                        >
                            {bottomText}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}