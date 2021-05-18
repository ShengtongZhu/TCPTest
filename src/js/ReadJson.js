import server from "@/assets/servers.json";
const serverIP=[];
const serverTCP=[];
const serverColor=[];
function getServer(){
    for(let i=0;i<server.count;i++){
        serverIP.push(server.ip[i]);
        serverTCP.push(server.TCP[i]);
        serverColor.push(server.color[i]);
    }
    return [serverIP, serverTCP, serverColor];
}


import files from '@/assets/files.json'
const filesName = [];
function getFile(){
    for(let i=0;i<files.count;i++){
        filesName.push(files.name[i]);
    }
    return filesName;
}

export {
    getServer,
    getFile
}