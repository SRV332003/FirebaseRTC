

class AudioRecorder{

    

    async startRecording() {
        console.log('start recording');
        this.recorder.start();
        this.isRecording = true;
    }

    async stopRecording() {
        console.log('stop recording');
        this.recorder.stop();
        this.isRecording = false;
    }

    async pauseRecording() {
        this.recorder.pause();
    }

    async resumeRecording() {
        console.log('resume recording');
        this.recorder.resume();
    }


    constructor(stream){
    // initiate recorder to record in ogg format
        
        this.recorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm;codecs=opus'
        });


        this.recorder.ondataavailable = function(e) {
            console.log('data available');
            if (e.data.size > 0) {
                console.log('downloading, blob: ', e.data);
                let file = new File([e.data], "file.ogg")
                

                // console.log(formdata.get('file'))
                let http = new XMLHttpRequest();
                http.open('POST', 'http://localhost:5005/api/encryptFile', true);
                http.setRequestHeader('Content-type', 'application/json');
                http.setRequestHeader('Access-Control-Allow-Origin', '*');
                http.onreadystatechange = function() {
                    if (http.readyState == 4 && http.status == 200) {
                        console.log(http.responseText);
                    }
                }
                http.send(JSON.stringify({file: e.data}));
                // http.send(formdata);
            }
                // const url = URL.createObjectURL(e.data);
                // const a = document.createElement("a");
                // document.body.appendChild(a);
                // a.style = "display: none";
                // a.href = url;
                // a.download = "test.webm";
                // a.click();
                // window.URL.revokeObjectURL(url);
        }
        


        this.isRecording = false;
    }
}

export default AudioRecorder;