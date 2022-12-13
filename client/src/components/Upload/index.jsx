import React, { useState } from 'react';
import Button from '@mui/material/Button';
// import axios from 'axios';
import sha256 from 'crypto-js/sha256';
import enc from 'crypto-js';
import useEth from "../../contexts/EthContext/useEth";

function Upload() {

    const { state: { contract, accounts, web3 } } = useEth();
    const [file, setFile] = useState(null);
    const [hash, setHash] = useState(null);
    const [status, setStatus] = useState("File not uploaded...");
    const cloudManager = "0x5ac95057d9Bdb223839250f2406F9Ef78e8932FD";
    const one_ether = 1000000000000000000;

    const handleChange = event => {
        let file = event.target.files[0];
        setFile(file);
        // console.log(contract);
        // console.log(accounts);
        // if (typeof file === "object")
        //     console.log(file);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // const url = 'http://localhost:3000/uploadFile';
        // const formData = new FormData();
        // formData.append('file', file);
        // formData.append('fileName', file.name);
        // const config = {
        //   headers: {
        //     'content-type': 'multipart/form-data',
        //   },
        // };
        // axios.post(url, formData, config).then((response) => {
        //   console.log(response.data);
        // });

        const reader = new FileReader();
        reader.addEventListener("load", async () => {
            const text = reader.result;
            const hash = "0x" + sha256(text).toString(enc.Hex);
            // console.log("hash: ", hash);
            setHash(hash);

            // Check if file exists
            const fileExists = await contract.methods.checkFileExists(hash).call({ from: accounts[0] });
            if (fileExists) {
                console.log("Dedup: File exists!!");
                setStatus("File exists! Performing Deduplication.");
                const dedup = await contract.methods.dedupFile(hash).send({ from: accounts[0] });
                const fileOwner = await contract.methods.getFileOwner(hash).call({ from: accounts[0] });
                web3.eth.sendTransaction({ from: accounts[0], to: fileOwner, value: one_ether, gasLimit: 21000, gasPrice: 20000000000 });
                web3.eth.sendTransaction({ from: accounts[0], to: cloudManager, value: one_ether * 5, gasLimit: 21000, gasPrice: 20000000000 });
                // console.log("dedup: ", dedup);
            }
            else {
                console.log("New File!!");
                setStatus("New File!!");
                const newFile = await contract.methods.newFileUpload(hash).send({ from: accounts[0] });
                web3.eth.sendTransaction({ from: accounts[0], to: cloudManager, value: one_ether * 10, gasLimit: 21000, gasPrice: 20000000000 });
                // console.log(newFile);
            }
        }, false);

        console.log(file);
        reader.readAsText(file);
    }

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
        },
        upload: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 0",
            // width: "400px",
        },
        pb20: {
            paddingBottom: "20px",
        },
        mb20: {
            marginBottom: "20px",
        },
        button: {
            width: "120px",
            height: "40px",
            fontSize: "12px",
        },
    };

    return (
        <div style={styles.container}>
            <form style={styles.upload} onSubmit={handleSubmit}>
                <h1 style={styles.pb20}>Cloud File Upload</h1>
                <input type="file" onChange={handleChange} style={styles.pb20} />
                <Button variant="contained" type="submit" style={{ ...styles.button, ...styles.mb20 }}>Submit File</Button>
                <h3 style={styles.mb20}>Hash: {hash}</h3>
                <br></br>
                <h3 style={styles.mb20}>Status: {status}</h3>
            </form>
        </div>
    )

}

export default Upload;