import React, { useEffect, useRef } from 'react'
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const App = () => {

  const zpRef = useRef(null)

  const userID = "user" + Math.floor(Math.random() * 1000);
  const userName = "react_" + userID;
  const appID = 1471845830;
  const serverSecret = "dd176d60c7a5ab789ab73e2c9ebe6a50";

  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, null, userID, userName);

  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zpRef.current = zp
    zp.addPlugins({ ZIM });
  }, [TOKEN])

  function invite(callType) {
    const targetUser = {
      userID: prompt("Enter callee's userId"),
      userName: prompt("Enter callee's userName"),
    };
    zpRef.current.sendCallInvitation({
      callees: [targetUser],
      callType,
      timeout: 60,
    }).then((res) => {
      console.warn(res);
    })
      .catch((err) => {
        console.warn(err);
      });
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#1a2229] to-black flex items-center justify-center">
      <div className="w-[500px] h-[400px] bg-[#0d1014] border-2 border-[#313030] rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-8 p-6">

        <h2 className="text-white text-xl font-medium">
          <span className="text-blue-500 font-semibold">UserName :</span> {userName}
        </h2>

        <h2 className="text-white text-xl font-medium">
          <span className="text-blue-500 font-semibold">UserId :</span> {userID}
        </h2>

        <button
          className="w-[200px] h-[50px] rounded-2xl bg-blue-500 text-white text-lg font-semibold shadow-md 
                   hover:bg-blue-600 hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}>
          Voice Call
        </button>

        <button
          className="w-[200px] h-[50px] rounded-2xl bg-green-500 text-white text-lg font-semibold shadow-md 
                   hover:bg-green-600 hover:scale-105 transition-all duration-300 cursor-pointer"
          onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}>
          Video Call
        </button>
      </div>
    </div>
  )

}

export default App