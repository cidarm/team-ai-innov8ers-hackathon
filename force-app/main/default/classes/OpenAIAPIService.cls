public with sharing class OpenAIAPIService {
    @AuraEnabled
    public static void getResponseToPrompt(String prompt){
       //Send request
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:OpenAIAPI/v1/chat/completions');
        req.setMethod('POST');
        System.debug('Header: ' + req.getHeader('Authorization'));
        req.setHeader('Content-Type', 'application/json');
        req.setBody('{messages: [{role: \'user\', content: ' + prompt + '}], model: \'gpt-3.5-turbo\'}');
        Http http = new Http();
        HTTPResponse res = http.send(req);
        System.debug(res.getBody());
    }
}