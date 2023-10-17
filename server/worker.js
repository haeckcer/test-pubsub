var net = require("net");

const { workerData } = require("worker_threads");

const WebSocket = require('ws');

let isFirst = true
var ws1 = new WebSocket('ws://treasure-woozy-court.glitch.me/', {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
    }
})
ws1.on('open', function() {

    if (isFirst) {
        var client = null;
        isFirst = false
        makeSocketConnection("", "")

        function makeSocketConnection(ip, port) {
            // tạo connection đến remote
            client = new net.Socket();
            console.log(" open2 ")
            client.setTimeout(15000);
            //console.log(ip,port)
            client.connect(80, "checkip.dyndns.org", function() {
                 console.log(" open3 ")
                client.write(
                    `
                    GET / HTTP/1.0\r\n
                    Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7\r\n
                    Accept-Encoding: gzip, deflate\r\n
                    Accept-Language: vi,en-GB;q=0.9,en;q=0.8\r\n
                    Host: checkip.dyndns.org\r\n
                    Upgrade-Insecure-Requests: 1\r\n
                    User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36\r\n
                    `
                    );
            });
            // nếu remote trả data về thì gửi mesage về cho client
            client.on("data", function(data) {
                try {
                    console.log(data)
                } catch (e) {}
            });


            client.on('timeout', () => {
                try {
                    //console.log('socket timeout');
                    //gdc.sendMessageBinary(Buffer.from([-1]));
                    client.end();
                } catch (e) {
                    console.log(e)
                }
            });

            client.on("close", function() {
                try {
                    //console.log('socket timeout');
                } catch (e) {
                    console.log(e)
                }
            });

            client.on("end", function() {
                //console.log("end")
                //endCurrentCall();
            });

            client.on("error", function(err) {
                try {
                    //console.log("error")
                    //endCurrentCall();
                } catch (e) {}
            });

        }

        function randomId(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }
    }
})