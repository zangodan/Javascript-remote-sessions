import { Outlet, Link, useSearchParams } from "react-router-dom";
import { useRef } from "react";
import './index.css';
import MonacoEditor from '@monaco-editor/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { socket } from "../../socket";

const sessionsApi = axios.create({
    baseURL: 'http://localhost:8080/sessionscode',
});

const Session = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [sessionId, setSessionId] = useState(searchParams.get("id"));
    const [code, setCode] = useState('');
    const [refresh, setRefresh] = useState(true);
    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        sessionsApi.get('/' + sessionId)
            .then(response => {
                setCode(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [sessionId, refresh]);

    useEffect(() => {
        console.log("session id: "  + sessionId)
        socket.connect();

        socket.on('get_code_update', (data) =>{
            setCode(data.new_code);
        });
        
        socket.on('entered_room', (data) => {
            setCanEdit(data?.canEdit); 
        });

        socket.emit("join_room", {roomId: sessionId})

        return () => {
            socket.disconnect(); 
            console.log("disconnected");
        }
    }, [sessionId]);

    const editorRef = useRef(null);
    const handleSave = () => {
        if (editorRef.current) {
            const editorValue = editorRef.current.getValue();
            sessionsApi.post("", { sessionId: sessionId, newCode: editorValue })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    };

    const handleClearCode = () => {
        editorRef.current.setValue('');
    }

    const handleRestore = () => {
        setCode(editorRef.current.getValue());
        setRefresh(!refresh);
    }

    return (
        <div className="container">
            <h1>Session Number {sessionId}</h1>
            <MonacoEditor
                height="700px"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={code}
                onMount={(editor) => {
                    editorRef.current = editor;
                }}
                options={{
                    fontSize: 30,
                    readOnly: !canEdit
                }}
                onChange={() =>{
                    socket.emit('send_code_update', editorRef.current.getValue());
                }}
            />

            <div className="update-btns">
                <button className="save-btn btn" onClick={handleSave} disabled={!canEdit}>Save</button>
                <button className="clear-btn btn" onClick={handleClearCode} disabled={!canEdit}>Clear Code</button>
                <button className="restore-btn btn" onClick={handleRestore} disabled={!canEdit}>Restore</button>
            </div>

            <h2>
                <Link to="/" style={{ textDecoration: 'none', color: '#DFD0B8' }}>
                    Back To Menu
                </Link>
            </h2>
            <Outlet />
        </div>


    )
}

export default Session;