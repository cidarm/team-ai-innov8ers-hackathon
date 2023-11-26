import { api, LightningElement } from 'lwc';

export default class ChatTyping extends LightningElement {
    @api author;
    @api direction;

    authorLabel;

    connectedCallback() {
        //set direction
        var listItemClass = this.messageDirection == "inbound" ? 
            "slds-chat-message__text_inbound" : "slds-chat-listitem_outbound";
        var messageClass = this.messageDirection == "inbound" ? 
            "slds-chat-message__text_inbound" : "slds-chat-listitem_outbound";
        
        //add to markup
        var listItem = this.template.querySelector("li[data-target=chatMessageLi]");
        var messageDiv = this.template.querySelector("div[data-target=chatMessageDiv]");
        listItem.className = listItem.className + " " + listItemClass;
        messageDiv.className = messageDiv.className + " " + messageClass;

        //Set Author Label
        this.authorLabel = author + ' is typing ...';
    }
}