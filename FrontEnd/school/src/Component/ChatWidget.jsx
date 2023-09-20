import React, { useEffect, useState } from "react";
import {
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import Message from "./Message";
import { ImAttachment } from "react-icons/im";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const ChatWidget = ({
  onSendMessage,
  user,
  userSellected,
  combinedId,
  messages,
  otherMessages,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messagess, setMessages] = useState([]);

  const [img, setImg] = useState(null);

  const usersss = user._id + user._id;
  // console.log(usersss);
  const [chats, setChats] = useState();
  useEffect(() => {
    const mes = () => {
      const unSub = onSnapshot(doc(db, "chats", combinedId), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unSub();
      };
    };
    combinedId && mes();
  }, [combinedId]);
  useEffect(() => {
    const getChat = () => {
      const unsub = onSnapshot(doc(db, "userChats", usersss), (doc) => {
        console.log(doc.data());
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    user?._id && getChat();
  }, [user?._id]);

  // const handleInputChange = (e) => {
  //   setInputMessage(e.target.value);
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() !== "") {
      onSendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", combinedId), {
              messages: arrayUnion({
                id: uuid(),
                text: inputMessage,
                senderId: usersss,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", combinedId), {
        messages: arrayUnion({
          id: uuid(),
          text: inputMessage,
          senderId: usersss,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", usersss), {
      [combinedId + ".lastMessage"]: {
        text: inputMessage,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", userSellected.id + userSellected.id), {
      [combinedId + ".lastMessage"]: {
        text: inputMessage,
      },
      [combinedId + ".date"]: serverTimestamp(),
    });

    setInputMessage("");
    setImg(null);
  };
  console.log(messagess);
  return (
    <div className="border border-gray-300 rounded p-4 h-96 bg-gray-200 z-40">
      <p className="text-center text-black"> {userSellected.name} </p>

      <br />
      <div className="overflow-y-auto h-full">
        {messagess?.length > 0 ? (
          <>
            {messagess && (
              <>
                <div className="messages">
                  {messagess.map((m) => {
                    return (
                      <>
                        <Message message={m} key={m.id} />
                      </>
                    );
                  })}
                </div>
              </>
            )}
          </>
        ) : (
          <p>No messages yet.</p>
        )}
      </div>

      <form className="mt-4 ">
        <div className="flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
            className="border border-gray-300 rounded-full flex flex-row mt-10 w-11/12"
            placeholder="Type a message..."
          />
          <div className="flex items-center gap-2">
            <input
              type="file"
              style={{ display: "none" }}
              id="file"
              onChange={(e) => setImg(e.target.files[0])}
            />
            <label htmlFor="file">
              <ImAttachment role="button" />
            </label>
            <button className="btn btn-success px-6" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatWidget;
