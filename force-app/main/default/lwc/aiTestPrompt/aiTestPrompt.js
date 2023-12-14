import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import apexGPTresponse from '@salesforce/apex/AIConnectAPIService.getPromptRes'


export default class AiTestPrompt extends LightningElement {
    //sample question
title = 'Query Builder';
textAreaFormats = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'list',
    'indent',
    'align',
    'link',
    'image',
    'clean',
    'table',
    'header',
];
@api question= "Generate Soql query where product price is greater than $200";
isLoading = false;
@api message;
isChange = true;

//handle click of chanage of text
handleOnChange(event){
    this.question=event.target.value;
    this.isChange=true;

}

handleOnClick(){
    if(this.isChange){
        this.isLoading=false;
        this.getGPTResponse();
        this.isChange=false;
    }
}
getGPTResponse(){
    this.isLoading=true;
    apexGPTresponse({prompt: this.question})
    .then((result) => {
        this.message = result;
        this.isLoading = false;
    
    }).catch((error) => {
        console.log('Error:' + JSON.stringify(error));
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error!!!',
            message: error.message,
            variant: 'error'
        }))
        this.isLoading = false;
    })

}

}