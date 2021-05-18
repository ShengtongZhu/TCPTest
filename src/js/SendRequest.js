var mod=require('@/js/GlobalProcess')
import Bus from "@/js/Bus";
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function downloadFile(files, servers, rounds) {
    Bus.$emit('roundChange', 1);
    for(let round=0;round<rounds;round++){
        Bus.$emit('serverChange', 1);
        for (let i=0;i<servers.length;i++) {
            let server=servers[i];
            Bus.$emit('fileChange', 1);
            for (let j=0;j<files.length;j++) {
                let file=files[j];
                Bus.$emit('fileChange', parseInt(((j+1)/files.length)*100-1));
            }
            Bus.$emit('serverChange', parseInt(((i+1)/servers.length)*100-1));
        }
        Bus.$emit('roundChange', parseInt(((round+1)/rounds)*100-1));
    }
}
export {
    downloadFile
}