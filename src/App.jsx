import { JitsiMeeting } from '@jitsi/web-sdk'
import { useState } from 'react'
import './App.css'

function App() {
  const [stream, setStream] = useState(null)
  const [form, setForm] = useState({})

  const handlerClick = () => {
    if (!form?.roomName && !form?.userName) {
      return
    }
    setStream(form)
  }

  const handlerOnChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const resetStreamAndForm = () => {
    setStream(null)
    setForm({})
  }

  const settings = 'devices,language'
  const toolbar =
    'microphone,camera,hangup,desktop,fullscreen,profile,chat,recording,settings,raisehand,videoquality,tileview'

  return (
    <div className="App">
      <header className="App-header">
        {stream ? (
          <JitsiMeeting
            domain="meet.portl.live"
            roomName={stream.roomName}
            configOverwrite={{
              startWithAudioMuted: true,
              disableModeratorIndicator: true,
              startScreenSharing: false,
              enableEmailInStats: false,
            }}
            interfaceConfigOverwrite={{
              DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
              DEFAULT_BACKGROUND: '#464646',
              DEFAULT_REMOTE_DISPLAY_NAME: '',
              SHOW_JITSI_WATERMARK: 1 === 1,
              SHOW_WATERMARK_FOR_GUESTS: 1 === 1,
              SHOW_BRAND_WATERMARK: 0 === 1,
              BRAND_WATERMARK_LINK: '',
              LANG_DETECTION: true,
              CONNECTION_INDICATOR_DISABLED: false,
              VIDEO_QUALITY_LABEL_DISABLED: 0 === 1,
              SETTINGS_SECTIONS: settings.split(','),
              TOOLBAR_BUTTONS: toolbar.split(','),
            }}
            userInfo={{
              displayName: form.userName,
            }}
            onApiReady={(api) => {
              api.executeCommand(
                'avatarUrl',
                'https://avatars0.githubusercontent.com/u/3671647'
              )
              api.addEventListeners({
                participantLeft: (payload) => resetStreamAndForm(),
                readyToClose: (payload) => resetStreamAndForm(),
              })
            }}
            getIFrameRef={(iframe) => {
              iframe.style.height = '100vh'
              iframe.style.width = '100vw'
            }}
          />
        ) : (
          <div className="form-chat">
            <h1>Jitsi Portl Example</h1>
            <input
              name="userName"
              placeholder="username"
              onChange={(e) => handlerOnChange(e)}
              type="text"
            />
            <input
              name="roomName"
              placeholder="roomname"
              onChange={(e) => handlerOnChange(e)}
              type="text"
            />
            <button onClick={() => handlerClick()}>Join Chat</button>
          </div>
        )}
      </header>
    </div>
  )
}

export default App
