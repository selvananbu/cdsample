export const MimeTypes = {
    MIME_APPLICATION_PDF : 0,
    MIME_APPLICATION_JSON : 1
} 

export class OpenApiBody{
    constructor(mimeType, content){
        this.mimeType = mimeType;
        this.content = content;
    }

    getMimeType(){
        return this.mimeType;
    }

    getMimeTypeAsString(){
        switch(this.mimeType){
            case MimeTypes.MIME_APPLICATION_PDF: return 'application/pdf';
            case MimeTypes.MIME_APPLICATION_JSON: return 'application/json';
        }
    }

    getContent(){
        return this.content;
    }
}

