import { LightningElement,api,track } from 'lwc';
// importing Custom Label
import CHAT_GPT_EP from '@salesforce/label/c.Chat_GPT_End_Point';
import CHAT_GPT_KEY from '@salesforce/label/c.Chat_GPT_Key';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Aihackathon_SalesforceVsChatGptInt extends LightningElement {
// Sample question
@api question="Generate Soql query where product price is greater than $200";
isLoading = false;
data;
message='';
isChange=true;
// Custom lable to store key and end points
label={
    CHAT_GPT_EP,
    CHAT_GPT_KEY
}

// Handle click change of text
handleOnChange(event){
    this.question=event.target.value;
    this.isChange=true;
}

// Handle click of generate button
handleOnClick(){
    if(this.isChange) {
        this.isLoading=false;
        this.getGPTResponse();
        this.isChange=false;
    }
}

// API call with Fetch function JS
async getGPTResponse() {
    this.isLoading = true;
    

    try {
        // Preparing request , header and getting response
        const response = await fetch(this.label.CHAT_GPT_EP, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+this.label.CHAT_GPT_KEY // Replace YOUR_API_KEY with your actual API key
            },
            body: JSON.stringify({
                messages: [{
                    role: 'user',
                    content: this.question
                }],
                model: 'gpt-3.5-turbo'
            })
        });
        
        // if response is 200 ok 
        if (response.ok) {
            const result = await response.json();
            this.data=result;
            console.log(this.data);
            this.message=this.data.choices[0].message.content;
            this.isLoading = false;
        }
            
    }catch(error) {
        this.dispatchEvent(new ShowToastEvent({
            title: 'ERROR!!!',
            message: error.message,
            variant: 'error'
        }))
        this.isLoading = false;
    }
}

}