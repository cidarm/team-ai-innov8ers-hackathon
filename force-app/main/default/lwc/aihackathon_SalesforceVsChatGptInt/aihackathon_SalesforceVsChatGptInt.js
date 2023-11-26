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

    getGPTResponse() {
        this.isLoading = true;
        getResponseToPrompt({prompt: this.question})
        .then((result) => {
            this.message = result.choices[0].message.content;
            this.isLoading = false;
        }).catch((error) => {
            console.log('Error: ' + JSON.stringify(error));
            this.dispatchEvent(new ShowToastEvent({
                title: 'ERROR!!!',
                message: error.message,
                variant: 'error'
            }))
            this.isLoading = false;
        })
    }
}