import { LightningElement,api,track } from 'lwc';;
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getResponseToPrompt from '@salesforce/apex/OpenAIAPIService.getResponseToPrompt';

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
        resp = await getResponseToPrompt(this.question);
        this.message = resp.choices[0].message.content;
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