import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CircularProgress from "@mui/material/CircularProgress";
import DatePicker from "@mui/lab/DatePicker";
import Alert from "@mui/material/Alert";
import Post from "./Post";
import "./App.css";
import { Dialog, DialogTitle } from "@mui/material";

function App() {
    const [photoData, setPhotoData] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [alert, setAlert] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (startDate > new Date()) {
            setAlert(true);
        } else {
            fetchPhoto(startDate);
        }
    }, [startDate]);

    async function fetchPhoto(date) {
        setLoading(true);
        let formated = date.toISOString().slice(0, 10);
        const res = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=EqtlX4VM2ldCg8b03JaoUMgt64oJGcNl3XR6e5Ad&start_date=` +
                formated
        );

        const data = await res.json();
        setPhotoData(data);
        setLoading(false);
    }

    if (!photoData) return <div />;

    return (
        <div class="img-bg">
            <div
                style={{
                    width: 800,
                    backgroundColor: "rgba(255,255,255, 0.2)",
                    margin: "auto",
                    paddingBottom: 100,
                }}
            >
                <div
                    style={{
                        backgroundColor: "white",
                        paddingInlineStart: 40,
                        paddingBlock: 20,
                    }}
                >
                    <h1 style={{ marginBlock: 0 }}>Spacetagram</h1>
                    <h5
                        style={{
                            fontWeight: 600,
                            opacity: 0.6,
                            marginBlockStart: 10,
                            marginBlockEnd: 30,
                        }}
                    >
                        Brought to you by NASA's Astronomy Photo of the Day API
                    </h5>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Choose a start date"
                            value={startDate}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                {loading ? (
                    <div
                        style={{
                            height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            padding: 40,
                        }}
                    >
                        <CircularProgress color="inherit" />
                    </div>
                ) : (
                    photoData.map((data) => <Post data={data}></Post>)
                )}
            </div>
            <Dialog open={alert} onClose={() => setAlert(false)}>
                <Alert severity="error">
                    Please select a date prior to today's date
                </Alert>
            </Dialog>
        </div>
    );
}

export default App;
