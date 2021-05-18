<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckFilesAllChange">Select All</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedFiles" @change="handleCheckedFilesChange">
      <el-checkbox v-for="file in files" :label="file" :key="file">{{file}}</el-checkbox>
    </el-checkbox-group>

    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckFilesAllChange">Select All</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedFiles" @change="handleCheckedFilesChange">
      <el-checkbox v-for="file in files" :label="file" :key="file">{{file}}</el-checkbox>
    </el-checkbox-group>

  </div>
</template>

<script>
import files from '../assets/files.json'
import server from '../assets/servers.json'
const filesName = [];
for(let i=0;i<files.count;i++){
  filesName.push(files.name[i]);
}
const serverIP=[];
for(let i=0;i<server.count;i++){
  serverIP.push(server.ip[i]);
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      checkAll: false,
      checkedFiles: [],
      files: filesName,
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckFilesAllChange(val) {
      this.checkedFiles = val ? filesName : [];
      this.isIndeterminate = false;
    },
    handleCheckedFilesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.filesName.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.filesName.length;
    },

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
