<template>
  <div>
    <div class="progress-row">
      <div class="progress-col">
        <el-progress type="circle" :percentage="roundPercent" status="success"></el-progress>
        <el-tag size="small">Round</el-tag>
      </div>
      <div class="progress-col">
        <el-progress type="circle" :percentage="serverPercent" status="success"></el-progress>
        <el-tag size="small">Server</el-tag>
      </div>
      <div class="progress-col">
        <el-progress type="circle" :percentage="filePercent" status="success"></el-progress>
        <el-tag size="small">File</el-tag>
      </div>
    </div>
    <div class="chart">
      <line-chart :chart-data="dataCollection" :options="options"></line-chart>
    </div>
  </div>
</template>
<script>
import Bus from "@/js/Bus";
import LineChart from "@/js/LineChart";
// var mod = require('@/js/GlobalProcess');

export default {
  name: "TestResult",
  components: {
    LineChart
  },
  data() {
    return {
      files: [],
      servers: [],
      rounds: 1,
      roundPercent: 1,
      serverPercent: 1,
      filePercent: 1,
      //[rounds][servers][files][bw,time]
      bwTimeArray: [],
      //[rounds][servers][files][bw]
      bwArray:[],
      dataCollection: {},
      options: {maintainAspectRatio: false},
      serverColors: []
    }
  },
  mounted: function () {
    var vm = this;
    Bus.$on('getValue', (data) => {
      [vm.files, vm.servers, vm.rounds, vm.serverColors] = data;
      console.log(vm.files, vm.servers, vm.rounds);
      this.sendRequest(vm.files, vm.servers, vm.rounds);
    });
  },
  methods: {
    async sendRequest(files, servers, rounds) {

      this.dataCollection.labels=[];
      this.dataCollection.datasets=[];

      this.roundPercent = 1;

      for(let i=0;i<files.length;i++){
        this.dataCollection.labels.push(files[i]);
      }

      for (let round = 0; round < rounds; round++) {
        this.serverPercent = 1;

        let bwTimeServer = [];
        let bwServer = [];
        for (let i = 0; i < servers.length; i++) {
          let server = servers[i];
          this.filePercent = 1;

          let serverArray=server.split(' ');
          let serverIP=serverArray[0];
          let serverTCP=serverArray[1];

          let temp=Object.assign({}, this.dataCollection);
          temp.datasets.push({
            label: serverTCP,
            fill: false,
            borderColor: this.serverColors[i],
            data: []
          })
          this.dataCollection=temp;

          let bwTimeFile=[];
          let bwFile=[];
          for (let j = 0; j < files.length; j++) {
            let file = files[j];
            let url = serverIP + '/' + file;
            let avoidCache = "?avoidcache=" + (new Date()).getTime();
            let [averageBw, bwTime] = await this.asyncSend(url, avoidCache);
            this.filePercent = ((j + 1) / files.length) * 100;
            bwTimeFile.push(bwTime);
            bwFile.push(averageBw);

            let temp=Object.assign({}, this.dataCollection);
            temp.datasets[i].data.push(averageBw);
            this.dataCollection=temp;

          }
          bwTimeServer.push(bwTimeFile);
          bwServer.push(bwFile);
          this.serverPercent = ((i + 1) / servers.length) * 100;
        }
        this.bwTimeArray.push(bwTimeServer);
        this.bwArray.push(bwServer);
        this.roundPercent = ((round + 1) / rounds) * 100;
      }
    },


    asyncSend(url, avoidCache) {
      return new Promise(function (resolve) {
        let tempResult = [];
        let request = new XMLHttpRequest();
        request.open('GET', "http://" + url + avoidCache);
        let startTime = (new Date()).getTime();
        let endTime = startTime;
        let progressTime = -1;
        let progressLoaded = 0;
        request.onprogress = function (event) {
          if (progressTime === -1) {
            progressTime = (new Date()).getTime();
          } else {
            let now = (new Date()).getTime();
            let delta = now - progressTime;
            if (!Number.isNaN(delta)) {
              let bw = parseFloat(((event.loaded - progressLoaded) * 8 / (delta / 1000) / 1024 / 1024).toFixed(2));
              progressLoaded = event.loaded;
              progressTime = now;
              tempResult.push([now - startTime, bw]);
            }
          }
        };
        request.onreadystatechange = function () {
          if (request.readyState === 2) {
            startTime = (new Date().getTime());
          }
          if (request.readyState === 4) {
            endTime = (new Date()).getTime();
            let downloadSize = request.responseText.length;
            let time = (endTime - startTime) / 1000;
            let sizeInBits = downloadSize * 8;
            let speed = ((sizeInBits / time) / (1024 * 1024)).toFixed(2);
            console.log(downloadSize, time, speed);
            resolve([speed, tempResult]);
          }
        }
        request.send();
      })
    },

  },


}
</script>

<style scoped>
.progress-row{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}
.progress-col{
  width: 130px;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
}
.chart{
  max-width: 650px;
  max-height: 300px;
  margin: 20px auto;
  align-items: center;
  justify-content: center;
}
</style>