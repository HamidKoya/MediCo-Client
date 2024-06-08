import React from "react";
import Header from "@/components/doctor/Header";
import ChatList from "@/components/chatComponents/doctor/ChatList";
import ChatBox from "@/components/chatComponents/doctor/ChatBox";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

const END_POINT = "https://medico-server-b7s5.onrender.com/";

let socket;

function ChatPageDoctor() {
  const { currentDoctor } = useSelector((state) => state.doctor);
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  const _id = currentDoctor.doctorData._id;

  useEffect(() => {
    axios
      .get(`https://medico-server-b7s5.onrender.com/chat/chat/${_id}`)
      .then((res) => {
        setConversations(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    socket = io(END_POINT);
  }, []);

  useEffect(() => {
    socket?.emit("setup", _id);
    socket?.on("get-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.disconnect();
    };
  }, [_id]);

  useEffect(() => {
    socket?.on("recieve_message", (data) => {
      if (data?.chatId === currentChat?._id) {
        const message = [...messages, data];
        setMessages(message);
      }

      const updatedConversations = conversations.map((chat) => {
        if (chat._id === data.chatId) {
          return { ...chat, lastMessage: Date.parse(data.createdAt) };
        }
        return chat;
      });

      const sortedConversations = [...updatedConversations].sort((a, b) => {
        const aTimestamp = a.lastMessage || 0;
        const bTimestamp = b.lastMessage || 0;
        return bTimestamp - aTimestamp;
      });

      setConversations(sortedConversations);
    });
  }, [messages, currentChat, conversations]);

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== doctorId);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div>
      <Header />
      <div className="bg-blue-50 fixed w-full">
        <div className="min-h-screen bg-blue-50 flex justify-center">
          <div className="min-h-screen bg-blue-50">
            <div className="w-full md:w-96 h-screen bg-white mx-auto md:me-10">
              <div className="overflow-y-auto h-screen md:h-screen">
                {conversations.length === 0 ? (
                  <div className="text-xl text-gray-600 text-center">
                    <p className="m-20">No chats</p>
                  </div>
                ) : (
                  conversations.map((chat) => (
                    <div
                      key={chat._id}
                      onClick={() => {
                        setCurrentChat(chat);
                        socket?.emit("join room", chat._id);
                      }}
                    >
                      <ChatList data={chat} currentDoctorId={_id} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <ChatBox
            chat={currentChat}
            currentDoctor={_id}
            setMessages={setMessages}
            messages={messages}
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatPageDoctor;
