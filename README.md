# portl-example-jitsi

to implement jitsi meet need to install the web sdk which can be found at this [link](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-web-sdk)

## Basic Usage

its basic usage can be seen in this code snippet.

* domain: jitsimeet server domain
* roomName: room name, note: use the same room name to log in several users
* configOverwrite: rewrite the basic configuration here
* interfaceConfigOverwrite: here you configure the room screen, such as notifications, watermark, logo, toolbar buttons, etc. note: in the test application, you have the configuration that we always use by default.
* userInfo: The JS object that contains information about the participant starting the meeting (e.g., email).
* onApiReady: The external API reference for events and commands. note: you can learn more at this [link](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe), in the application there is an example of its use.

* getIFrameRef: The parent node used by the IFrame.

```js
import { JitsiMeeting } from '@jitsi/web-sdk'

<JitsiMeeting
    domain="YOUR_DOMAIN"
    roomName="PleaseUseAGoodRoomName"
    configOverwrite={{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,
        enableEmailInStats: false
    }}
    interfaceConfigOverwrite={{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
    }}
    userInfo={{
        displayName: 'YOUR_USERNAME'
    }}
    onApiReady={(externalApi) => {
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
    }}
    getIFrameRef={(iframe) => { iframeRef.style.height = 400; }}
/>

```
