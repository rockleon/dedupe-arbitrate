import {
    Routes,
    Route,
    Link
} from "react-router-dom";

import Intro from "./Intro/";
import Setup from "./Setup";
import Demo from "./Demo";
import Upload from "./Upload/";

function Header() {
    const styles = {
        head: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            backgroundColor: "#6200EE",
            color: "white",
        },
        menu: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "20px",
            backgroundColor: "#d4bff9",
            padding: "10px",
            marginBottom: "20px",
        },
    }

    return (
        <div>
            <div style={styles.head}>
                <h1>Dedup Arbitrate</h1>
            </div>
            <div>
                <div style={styles.menu}>
                    <Link to="/">Home</Link>
                    <Link to="/setup">Setup</Link>
                    <Link to="/demo">Demo</Link>
                    <Link to="/upload">Upload</Link>
                </div>


                <Routes>
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/setup" element={<Setup />} />
                    <Route path="/demo" element={<Demo />} />
                    <Route path="/" element={<Intro />} />
                </Routes>
            </div>
        </div>
    );
}

export default Header;
