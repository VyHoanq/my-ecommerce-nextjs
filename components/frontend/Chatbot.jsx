"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Chatbot = () => {
    const [openChat, setOpenChat] = useState(true);
    const [message, setMessage] = useState("");
    const [chathistory, setChathistory] = useState([]);

    const { data: session } = useSession();
    const userId = session?.user?.id;

    // Fetch chat history when the component loads
    useEffect(() => {
        const fetchChatHistory = async () => {
            if (userId) {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
                const res = await fetch(`${baseUrl}/api/chat/history?userId=${userId}`);
                const data = await res.json();
                if (data.status === 200) {
                    setChathistory(data.data);
                }
            }
        };

        fetchChatHistory();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataPost = {
            userId: userId,
            message: message,
        };
        if (userId && message) {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            const res = await fetch(`${baseUrl}/api/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataPost),
            });
            const data = await res.json();
            if (data.status === 200) {
                setChathistory(data.data);
                setMessage(""); // Clear the input field after sending
            } else {
                alert("không có chat cũ");
            }
        }
    };

    return (
        <>
            <div
                className="chatbot-icon-modal"
                onClick={() => setOpenChat(!openChat)}
            ></div>
            <div className={`box-message-ai ${openChat ? "" : "show"} `}>
                <div className="box-message-ai__top">
                    <div
                        className="box__logo"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <img
                            src="https://lienquan.garena.vn/wp-content/uploads/2024/05/25e974e952adeaf416ea2bf3c751f7c05a4df884a0bf41.jpg"
                            alt="assistant-logo"
                            style={{
                                width: "35px",
                                height: "35px",
                                borderRadius: "50%",
                                marginRight: 5,
                            }}
                        />
                        <div>
                            <h1>
                                <b>Virtual Assistant</b>
                            </h1>
                            <h1 style={{ fontSize: 11, color: "#f2f2f2" }}>
                                Answer all questions about fashion
                            </h1>
                        </div>
                    </div>
                    <div className="box__close" onClick={() => setOpenChat(true)}></div>
                </div>

                <div className="box-message-ai__center">
                    {chathistory.map((chat, index) => (
                        <div
                            key={index}
                            className={`message__role-chat ${chat.role === "user" ? "user-message" : "assistant-message"
                                }`}
                            style={{
                                flexDirection: chat.role === "user" ? "row-reverse" : "row",
                            }}
                        >
                            <div className="message__role-chat__avatar">
                                <img
                                    src={
                                        chat.role === "user"
                                            ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfD7wShELxTwempY89oORR9opWTBU-xKu-Cw&s"
                                            : "https://lienquan.garena.vn/wp-content/uploads/2024/05/25e974e952adeaf416ea2bf3c751f7c05a4df884a0bf41.jpg"
                                    }
                                    alt="avatar"
                                    style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                                />
                            </div>
                            <div
                                className="message__role-chat__input"
                                style={{
                                    backgroundColor:
                                        chat.role === "user" ? "#1aa3ff" : "#f2f2f2",
                                    color: chat.role === "user" ? "white" : "black",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    maxWidth: "70%",
                                }}
                            >
                                {chat.message}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="box-message-ai__bottom">
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            alignItems: "center",
                            justifyItems: "center",
                        }}
                    >
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message"
                            name="message"
                            style={{ flex: 1, padding: "10px", borderRadius: "5px" }}
                        />
                        <button
                            type="submit"
                            style={{
                                marginLeft: "10px",
                                padding: "10px 15px",
                                borderRadius: "5px",
                                backgroundColor: "#1aa3ff",
                                color: "white",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Gửi
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Chatbot;