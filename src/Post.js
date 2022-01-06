import React, { useState } from "react";
import { ReactComponent as Heart } from "./heart.svg";
export default function Post({ data }) {
    const [like, setLike] = useState(false);
    return (
        <div
            style={{
                backgroundColor: "white",
                width: 400,
                margin: "auto",
                marginBlock: 50,
                paddingBottom: 15,
                borderRadius: 10,
                overflow: "hidden",
                position: "relative",
            }}
        >
            <img
                src={data.url}
                alt=""
                style={{ width: 400, height: 300 }}
            ></img>
            <Heart
                onClick={() => setLike(!like)}
                style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    fill: like ? "crimson" : "white",
                    width: 20,
                    height: 20,
                    cursor: "pointer",
                }}
            />
            <div style={{ paddingInline: 20 }}>
                <h3 style={{ marginBlockEnd: 0 }}>{data.title}</h3>
                <h6
                    style={{
                        opacity: 0.6,
                        marginBlock: 10,
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    {data.date}
                </h6>
                <p style={{ fontSize: 12 }}>{data.explanation}</p>
            </div>
        </div>
    );
}
