

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

                //create a form with input field to send the blob to the server
                const file = new File([e.data], 'test.webm', {type: 'audio/webm'});

                const formdata = new FormData();
                formdata.append('file', file);
            
                //send api request to the server using axios

                fetch('http://localhost:5005/api/encryptFile', {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    
                    method: 'POST',
                    body: formdata
                }).then(response => {
                    console.log(response);
                }).catch(err => {
                    console.log(err);
                });

                // console.log(formdata.get('file'))
                
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