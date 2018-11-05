
export const convertToJSON = (response) => {
    var enc = new TextDecoder("utf-8");
    var result = JSON.parse(enc.decode(response));
    return result;
}

export const convertToBlob = (response, contentType) => {
    var file = new Blob([response], {type:contentType});
    return file;
}
