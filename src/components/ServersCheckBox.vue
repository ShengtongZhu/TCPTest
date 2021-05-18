<template>
  <div class="server-checkbox">
    <p class="font"><i class="el-icon-monitor"></i>Choose Test Servers</p>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckServersAllChange">Select All</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedServers" @change="handleCheckedServersChange">
      <el-checkbox v-for="server in servers" :label="server" :key="server">{{server}}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>

import server from "@/assets/servers.json";
const serverIP=[];
for(let i=0;i<server.count;i++){
  serverIP.push(server.ip[i]);
}

export default {
  name: "ServersCheckBox",
  data() {
    return {
      checkAll: false,
      checkedServers: [],
      servers: serverIP,
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckServersAllChange(val) {
      this.checkedServers = val ? serverIP : [];
      this.isIndeterminate = false;
    },
    handleCheckedServersChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.serverIP.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.serverIP.length;
    },

  }
}
</script>

<style scoped>
.font{
  font-size: medium;
  font-weight: bold;
}
.server-checkbox{
  width: 60%;
  margin: auto;
}
</style>