//here we are connecting the socket with the client

const socket=io();

let name;
let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message__area')
var userNameElement = document.querySelector('.user-name');
var clientTotal = document.getElementById('clientTotal');

do{
    name=prompt("please enter your name:")
    userNameElement.textContent = name;

// until and unless the user enters their name this loop will go on
//getting all the previous messages here
socket.on("load_messages",(messages)=>{
  //  console.log(messages);
    messages.forEach(message=>{
        let msg={
            user:message.name,
            message:message.message,
            dateTime:message.timeStamp,
        }
        appendMessage(msg,'incoming');

    })

})

}while(!name)
socket.emit("join",name)

//getting the number of clients connected
socket.on('clients-total',(data)=>{
    clientTotal.innerText = `Total clients: ${data}`;
});



textarea.addEventListener('keyup',(e)=>{
    if(e.key==='Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg={
        user:name,
        message:message.trim(),
        dateTime:new Date(),

    }
    console.log(msg)
    //now we have to append the message
    //this is the outgoing message that we are appending now
    //that we as a user sends
    appendMessage(msg,'outgoing');
    //now after appending the message, we need to clear the text area
    textarea.value="";

    //now we have to send the message to the server
    //we use socket.emit for that
    socket.emit('message',msg)

}

function scrollToBottom() {
    // Scroll to the bottom of the messageArea
    messageArea.scrollTop = messageArea.scrollHeight;
}

function appendMessage(msg,type){

    // now we are creating the div over here which is
    // <div class="incoming message">

    // </div>
    //and we are appending the messages inside this class message
    //incoming or outgoing will be done dynamically
    let mainDiv=document.createElement('div');
    let className=type
    mainDiv.classList.add(className,'message')
    const timeString = new Date(msg.dateTime).toLocaleTimeString();
    let markup=`
        <h4>${msg.user} ${timeString}</h4>

        <p>${msg.message}</p>
    `

    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv);
    scrollToBottom();

}


//now recieving messages from the server
socket.on('message',(msg)=>{
    //now this message should come to the browser of the client, inspect the code in the brower and check the console for the output
    console.log(msg);
    //now we can append the message to out messageArea
    //and now need to the change the type to incoming
    appendMessage(msg,'incoming');

})




textarea.addEventListener('focus', () => {
    // Emit a "feedback" event to the server when the textarea is in focus
    socket.emit('feedback', {
        feedback: `${name} is typing a message`
    });
});

textarea.addEventListener('input', () => {
    // Emit a "feedback" event to the server when there's any input (typing) in the textarea
    socket.emit('feedback', {
        feedback: `${name} is typing a message`
    });
});

textarea.addEventListener('blur', () => {
    // Emit a "feedback" event to the server when the textarea loses focus
    socket.emit('feedback', {
        feedback: ''
    });
});

socket.on('feedback', (data) => {
    // Clear the previous feedback message
    clearFeedback();

    // Append the new feedback message to the messageArea
    if (data.feedback) {
        const element = `
            <div class="message-feedback">
                <p class="feedback text-center">${data.feedback}</p>
            </div>
        `;
        messageArea.innerHTML += element;
    }

    // Scroll to the bottom after updating the messageArea
    scrollToBottom();
});

function clearFeedback() {
    // Clear the feedback message from the messageArea
    const feedbackElements = document.querySelectorAll('.message-feedback');
    feedbackElements.forEach(element => element.remove());
}