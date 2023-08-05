const tchat =document.querySelector('#tchat');

window.addEventListener('onEventReceived', function (obj) {
    if (obj.detail.event.listener === 'widget-button') {

        if (obj.detail.event.field === 'testMessage') {
            let emulated = new CustomEvent("onEventReceived", {
                detail: {
                    listener: "message", event: {
                        service: "twitch",
                        data: {
                            time: Date.now(),
                            tags: {
                                "badge-info": "",
                                badges: "moderator/1,partner/1",
                                color: "#5B99FF",
                                "display-name": "StreamElements",
                                emotes: "25:46-50",
                                flags: "",
                                id: "43285909-412c-4eee-b80d-89f72ba53142",
                                mod: "1",
                                "room-id": "85827806",
                                subscriber: "0",
                                "tmi-sent-ts": "1579444549265",
                                turbo: "0",
                                "user-id": "100135110",
                                "user-type": "mod"
                            },
                            nick: "channelName"+"test",
                            userId: "100135110",
                            displayName: "channelName"+" Test",
                            displayColor: "#5B99FF",
                            badges: [{
                                type: "moderator",
                                version: "1",
                                url: "https://static-cdn.jtvnw.net/badges/v1/3267646d-33f0-4b17-b3df-f923a41db1d0/3",
                                description: "Moderator"
                            }, {
                                type: "partner",
                                version: "1",
                                url: "https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/3",
                                description: "Verified"
                            }],
                            channel: "channelName",
                            text: "Howdy! My name is Bill and I am here to serve Kappa",
                            isAction: !1,
                            emotes: [{
                                type: "twitch",
                                name: "Kappa",
                                id: "25",
                                gif: !1,
                                urls: {
                                    1: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                                    2: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
                                    4: "https://static-cdn.jtvnw.net/emoticons/v1/25/3.0"
                                },
                                start: 46,
                                end: 50
                            }],
                            msgId: "43285909-412c-4eee-b80d-89f72ba53142"
                        },
                        renderedText: 'Howdy! My name is Bill and I am here to serve <img src="https://static-cdn.jtvnw.net/emoticons/v1/25/1.0" srcset="https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 1x, https://static-cdn.jtvnw.net/emoticons/v1/25/1.0 2x, https://static-cdn.jtvnw.net/emoticons/v1/25/3.0 4x" title="Kappa" class="emote">'
                    }
                }
            });
            window.dispatchEvent(emulated);
        }
        return;
    }
    if (obj.detail.listener === "delete-message") {
        const msgId = obj.detail.event.msgId;
        document.querySelectorAll(`#message-${msgId}`).forEach(el => el.remove());
        return;
    } else if (obj.detail.listener === "delete-messages") {
        const sender = obj.detail.event.userId;
        document.querySelectorAll(`.message[data-sender=${sender}]`).forEach(el => el.remove());
        return;
    }
    /*
    const fieldData = {

        nickColor:"user",
        customNickColor:"rgb(231, 188, 46)",
        
        msgBroadcasterBorderColor:"rgb(231, 188, 46)",
        msgBroadcasterBackgroundColor:"https://cdn.streamelements.com/uploads/e54095a7-ccec-444f-873c-536aa5690d25.png",
        msgModeratorBorderColor:"rgb(12, 109, 80)",
        msgModeratorBackgroundColor:"https://cdn.streamelements.com/uploads/2b4de253-a703-4644-a2c0-d937b1497e7f.png",
        msgVIPBorderColor:"rgb(141, 29, 1)",
        msgVIPBackgroundColor:"https://cdn.streamelements.com/uploads/6c31b6a9-f01e-4a22-9b08-244795914419.png",
        msgSubscriberBorderColor:"rgb(184, 184, 184)",
        msgSubscriberBackgroundColor:"https://cdn.streamelements.com/uploads/eb756dcd-d00b-446c-9993-4c2df35772bd.png",
        msgBaseBorderColor:"rgb(184, 184, 184)",
        msgBaseBackgroundColor:"https://cdn.streamelements.com/uploads/5655662b-12ad-45c5-a194-9ec2d6dd8644.png",

        iconsapparence:"custom",
        iconBroadcaster:"https://cdn.streamelements.com/uploads/6c1d2a3a-a1c5-4723-bc85-6f66d79ed199.png",
        iconModerator:"https://cdn.streamelements.com/uploads/438f808b-30ae-4dbd-98db-065ad63dbe83.png",
        iconVip:"https://cdn.streamelements.com/uploads/c18c93dd-1001-495f-a9c9-ce7205e4ecaa.png",
        iconSubscriber:"https://cdn.streamelements.com/uploads/a9ec72ed-f338-4c93-a424-3a01b945f39c.png",
        iconBase:"https://cdn.streamelements.com/uploads/f54abf1d-4b94-45bd-94da-53542e588601.png",

        messagesLimit:15,
        hideCommands:"yes",
        ignoredUsers:"StreamElements,OtherBot",
    };

    nickColor = fieldData.nickColor;
    customNickColor = fieldData.customNickColor;
    
    msgBroadcasterBorderColor = fieldData.msgBroadcasterBorderColor;
    msgBroadcasterBackgroundColor = fieldData.msgBroadcasterBackgroundColor;
    msgModeratorBorderColor = fieldData.msgModeratorBorderColor;
    msgModeratorBackgroundColor = fieldData.msgModeratorBackgroundColor;
    msgVIPBorderColor = fieldData.msgVIPBorderColor;
    msgVIPBackgroundColor = fieldData.msgVIPBackgroundColor;
    msgSubscriberBorderColor = fieldData.msgSubscriberBorderColor;
    msgSubscriberBackgroundColor = fieldData.msgSubscriberBackgroundColor;
    msgBaseBorderColor = fieldData.msgBaseBorderColor;
    msgBaseBackgroundColor = fieldData.msgBaseBackgroundColor;
    
    customIcon=fieldData.iconsapparence;
    iconBroadcaster=fieldData.iconBroadcaster;
    iconModerator=fieldData.iconModerator;
    iconVip=fieldData.iconVip;
    iconSubscriber=fieldData.iconSubscriber;
    iconBase=fieldData.iconBase;
    
    messagesLimit = fieldData.messagesLimit;
    hideCommands = fieldData.hideCommands;
    ignoredUsers = fieldData.ignoredUsers.toLowerCase().replace(" ", "").split(",");

    channelName = "lordlumineer";//obj.detail.channel.username;
    
    */

    if (obj.detail.listener !== "message") return;

    if (obj.detail.event.data.text.startsWith("!") && hideCommands === "yes") return;
    if (ignoredUsers.indexOf(obj.detail.event.data.nick) !== -1) return;
  	obj.detail.event.data.displayName += " :"
  	let color = "rgb(0, 0, 0)"
    if (nickColor === "user") {
    	color = obj.detail.event.data.displayColor || `#${md5(obj.detail.event.data.displayName).substr(26)}`;
    }
    else if (nickColor === "custom") {
        color = customNickColor;
    }
    else if (nickColor === "remove") {
        obj.detail.event.data.displayName = '';
    }
    addMessage(obj.detail.event.data, color, obj.detail.event.renderedText);
});

window.addEventListener('onWidgetLoad', function (obj) {
    const fieldData = obj.detail.fieldData;

    nickColor = fieldData.nickColor;
    customNickColor = fieldData.customNickColor;

    msgBroadcasterBorderColor = fieldData.msgBroadcasterBorderColor;
    msgBroadcasterBackgroundColor = fieldData.msgBroadcasterBackgroundColor;
    msgModeratorBorderColor = fieldData.msgModeratorBorderColor;
    msgModeratorBackgroundColor = fieldData.msgModeratorBackgroundColor;
    msgVIPBorderColor = fieldData.msgVIPBorderColor;
    msgVIPBackgroundColor = fieldData.msgVIPBackgroundColor;
    msgSubscriberBorderColor = fieldData.msgSubscriberBorderColor;
    msgSubscriberBackgroundColor = fieldData.msgSubscriberBackgroundColor;
    msgBaseBorderColor = fieldData.msgBaseBorderColor;
    msgBaseBackgroundColor = fieldData.msgBaseBackgroundColor;

    customIcon=fieldData.iconsapparence;
    iconBroadcaster=fieldData.iconBroadcaster;
    iconModerator=fieldData.iconModerator;
    iconVip=fieldData.iconVip;
    iconSubscriber=fieldData.iconSubscriber;
    iconBase=fieldData.iconBase;

    messagesLimit = fieldData.messagesLimit;
    hideCommands = fieldData.hideCommands;
    channelName = obj.detail.channel.username;

  
    fetch('https://api.streamelements.com/kappa/v2/channels/' + obj.detail.channel.id + '/').then(response => response.json()).then((profile) => {
        provider = profile.provider;
    });
    ignoredUsers = fieldData.ignoredUsers.toLowerCase().replace(" ", "").split(",");
});

function addMessage(data,color_in , message) {
    const color = color_in || `#${md5(data.displayName).substr(26)}`;
    let msgBorderColor = 'rgb(184, 184, 184)';
    let msgBackgroundColor = 'rgba(0, 0, 0,0.5)';
    const userType=data.badges.reduce((acc, badge) => acc + badge.description+",",'');
  	let icons = ''

    if (data.nick==data.channel) { /* Broadcaster */
        if (customIcon === "custom") {
            icons=`<img src=`+iconBroadcaster+` class="badge">`;
        }
        else if (customIcon === "twitch") {
            icons=data.badges.reduce((acc,badge)=>acc+`<img src="${badge.url}" class="badge">`,'');
        }
        else if (customIcon === "none") {
            icons='';
        }
        msgBackgroundColor = msgBroadcasterBackgroundColor;
        msgBorderColor = msgBroadcasterBorderColor;
    }        
    else if (data.tags.mod==1){ /* Moderator */
        if (customIcon === "custom") {
            icons=`<img src=`+iconModerator+` class="badge">`;
        }
        else if (customIcon === "twitch") {
            icons=data.badges.reduce((acc,badge)=>acc+`<img src="${badge.url}" class="badge">`,'');
        }
        else if (customIcon === "none") {
            icons='';
        }
        msgBackgroundColor = msgModeratorBackgroundColor;
        msgBorderColor = msgModeratorBorderColor;
    }
    else if (userType.includes('VIP')) { /* VIP */
        if (customIcon === "custom") {
            icons=`<img src=`+iconVip+` class="badge">`;
        }
        else if (customIcon === "twitch") {
            icons=data.badges.reduce((acc,badge)=>acc+`<img src="${badge.url}" class="badge">`,'');
        }
        else if (customIcon === "none") {
            icons='';
        }
        msgBackgroundColor = msgVIPBackgroundColor;
        msgBorderColor = msgVIPBorderColor;
    }
    else if (data.tags.subscriber==1) { /* Subscriber */
        if (customIcon === "custom") {
            icons=`<img src=`+iconSubscriber+` class="badge">`;
        }
        else if (customIcon === "twitch") {
            icons=data.badges.reduce((acc,badge)=>acc+`<img src="${badge.url}" class="badge">`,'');
        }
        else if (customIcon === "none") {
            icons='';
        }
        msgBackgroundColor = msgSubscriberBackgroundColor;
        msgBorderColor = msgSubscriberBorderColor;
    }
    else{ /*Follower,Viewer*/
        if (customIcon === "custom") {
            icons=`<img src=`+iconBase+` class="badge">`;
        }
        else if (customIcon === "twitch") {
            icons=data.badges.reduce((acc,badge)=>acc+`<img src="${badge.url}" class="badge">`,'');
        }
        else if (customIcon === "none") {
            icons='';
        }
        msgBackgroundColor = msgBaseBackgroundColor;
        msgBorderColor = msgBaseBorderColor;
    }
    
  	tchat.insertAdjacentHTML('beforeend', /*html*/ `<div id="message-${data.msgId}" data-sender="${data.userId}" class="message-row" style="--color: ${color}; --msgBorderColor: ${msgBorderColor}; --msgBackgroundColor: url(${msgBackgroundColor})">
        <div class="row_box">
            <div class="graphics">
                <div class="icon_box">
                    <div class="icons">${icons}</div>
                </div>
                <div class="sideBar_box">
                    <div class="sideBar"></div>
                    <div class="endBar"></div>
                </div>
            </div>
            <div class="content_box">
                <div class="name_box">
                    <div class="name">${data.displayName}</div>
                </div>
                <div class="msg_box">
                    <div class="msg">${message}</div>
                </div>
            </div>
        </div>
    </div>`);

    const messages=document.querySelectorAll('.message');
    const messgecount=messages.length;
    if(messgecount>messagesLimit){
        messages[messgecount-messagesLimit-1].remove();
    }
}
