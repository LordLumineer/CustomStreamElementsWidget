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
    //--
    //const fieldData = {
    //    nickColor:"user",
    //    customNickColor:"rgb(231, 188, 46)",
    //
    //    msgBroadcasterBorderColor:'rgb(231, 188, 46)',
    //    msgBroadcasterBackgroundColor:'linear-gradient(150deg, rgba(235, 193, 125, 1) 0.56%, rgba(223, 183, 124, 1) 18.54%, rgba(192, 131, 41, 1) 59.55%, rgba(234, 190, 129, 1) 87.08%, rgba(238, 220, 195, 1) 100%)',
    //    
    //    msgModeratorBorderColor:'rgb(12, 109, 80)',
    //    msgModeratorBackgroundColor:'linear-gradient(-45deg, rgba(64, 22, 23, 1) 0.56%, rgba(107, 76, 45, 1) 8.43%, rgba(165, 138, 85, 1) 38.2%, rgba(180, 169, 145, 1) 56.18%, rgba(150, 120, 87, 1) 80.34%, rgba(129, 79, 47, 1) 95.51%)',
    //    
    //    msgVIPBorderColor:'rgb(141, 29, 1)',
    //    msgVIPBackgroundColor:'linear-gradient(150deg, rgba(155, 155, 152, 1) 3.37%, rgba(164, 165, 167, 1) 13.38%, rgba(174, 176, 183, 1) 21.91%, rgba(159, 163, 170, 1) 35.18%, rgba(120, 129, 135, 1) 60.54%, rgba(101, 112, 118, 1) 71.91%, rgba(139, 148, 154, 1) 100%)',
    //    
    //    msgSubscriberBorderColor:'rgb(184, 184, 184)',
    //    msgSubscriberBackgroundColor:'linear-gradient(150deg, rgba(155, 155, 152, 1) 3.37%, rgba(164, 165, 167, 1) 13.38%, rgba(174, 176, 183, 1) 21.91%, rgba(159, 163, 170, 1) 35.18%, rgba(120, 129, 135, 1) 60.54%, rgba(101, 112, 118, 1) 71.91%, rgba(139, 148, 154, 1) 100%)',
    //    
    //    msgBaseBorderColor:'rgb(184, 184, 184)',
    //    msgBaseBackgroundColor:'linear-gradient(150deg, rgba(155, 155, 152, 1) 3.37%, rgba(164, 165, 167, 1) 13.38%, rgba(174, 176, 183, 1) 21.91%, rgba(159, 163, 170, 1) 35.18%, rgba(120, 129, 135, 1) 60.54%, rgba(101, 112, 118, 1) 71.91%, rgba(139, 148, 154, 1) 100%)',
    //
    //    iconsapparence:"twitch",
    //    iconBroadcaster:"https://cdn.discordapp.com/emojis/940579229588938862.webp",
    //    iconModerator:"https://cdn.discordapp.com/emojis/941119965946327040.webp",
    //    iconVip:"https://cdn.discordapp.com/emojis/940579334463315978.webp",
    //    iconSubscriber:"https://cdn.discordapp.com/emojis/940579286539206697.webp",
    //    iconBase:"https://cdn.discordapp.com/emojis/940578850805514260.webp",
    //
    //    messagesLimit:30,
    //    hideCommands:"yes",
    //    ignoredUsers:"StreamElements,OtherBot",
    //};
    //nickColor = fieldData.nickColor;
    //customNickColor = fieldData.customNickColor;
    //
    //msgBroadcasterBorderColor = fieldData.msgBroadcasterBorderColor;
    //msgBroadcasterBackgroundColor = fieldData.msgBroadcasterBackgroundColor;
    //msgModeratorBorderColor = fieldData.msgModeratorBorderColor;
    //msgModeratorBackgroundColor = fieldData.msgModeratorBackgroundColor;
    //msgVIPBorderColor = fieldData.msgVIPBorderColor;
    //msgVIPBackgroundColor = fieldData.msgVIPBackgroundColor;
    //msgSubscriberBorderColor = fieldData.msgSubscriberBorderColor;
    //msgSubscriberBackgroundColor = fieldData.msgSubscriberBackgroundColor;
    //msgBaseBorderColor = fieldData.msgBaseBorderColor;
    //msgBaseBackgroundColor = fieldData.msgBaseBackgroundColor;
    //
    //customIcon=fieldData.iconsapparence;
    //iconBroadcaster=fieldData.iconBroadcaster;
    //iconModerator=fieldData.iconModerator;
    //iconVip=fieldData.iconVip;
    //iconSubscriber=fieldData.iconSubscriber;
    //iconBase=fieldData.iconBase;
    //
    //messagesLimit = fieldData.messagesLimit;
    //hideCommands = fieldData.hideCommands;
    //channelName = "lordlumineer";//obj.detail.channel.username;
    //
    //ignoredUsers = fieldData.ignoredUsers.toLowerCase().replace(" ", "").split(",");
    //--
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
    
  	tchat.insertAdjacentHTML('beforeend', /*html*/ `<div id="message-${data.msgId}" data-sender="${data.userId}" class="message-row" style="--color: ${color}; --msgBorderColor: ${msgBorderColor}; --msgBackgroundColor: ${msgBackgroundColor}">
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
