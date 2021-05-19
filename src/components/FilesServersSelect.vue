<template>
  <div class="select">
    <el-select v-model="value1" multiple placeholder="Please Choose Test Files">
      <el-option
          v-for="item in fileOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>

    <el-select
        v-model="value2"
        multiple
        style="margin-left: 20px;"
        placeholder="Please Choose TCP Variants">
      <el-option
          v-for="item in serverOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
      </el-option>
    </el-select>
    <br></br>
    <el-input-number v-model="rounds" @change="handleChange" :min="1" :max="10" label="Rounds"></el-input-number>
    <br></br>
    <el-button type="primary" @click="sendValue">Start Tests</el-button>
  </div>
</template>

<script>
import {getFile, getServer} from "@/js/ReadJson";
const [serverIP, serverTCP, serverColor] = getServer();
const filesName = getFile();
var filesOptions=[];
for(let i=0;i<filesName.length;i++){
  filesOptions.push({value: filesName[i], label: filesName[i]});
}
var serversOptions=[];
for(let i=0;i<serverIP.length;i++){
  serversOptions.push({value: serverIP[i], label: serverTCP[i]});
}
import Bus from '@/js/Bus'

export default {
  name: "FilesServersSelect",
  data() {
    return {
      fileOptions: filesOptions,
      serverOptions: serversOptions,
      value1: [],
      value2: [],
      rounds: 1,
    }
  },
  methods: {
    sendValue(){
      Bus.$emit('getValue', [this.value1, this.value2, this.rounds, serverColor]);
    },
    handleChange(value) {
      // console.log(value);
    }
  }
}
</script>

<style scoped>
.select{
  margin-top: 37px;
}
</style>