import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../Context/AuthContext";
// import { ChatContext } from "../Context/ChatContext";
import { UserContext } from "../Context/UserContext";

const Message = ({ message }) => {
  const { user } = useContext(UserContext);
  // const { data } = useContext(ChatContext);
  console.log(message.text);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`flex gap-5 mb-5 ${
        message?.senderId !== user?._id + user._id && "flex-row-reverse"
      }`}
    >
      <div className="flex items-end">
        <div className="chat-bubble">{message.text}</div>
        {message.img && <img src={message?.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
