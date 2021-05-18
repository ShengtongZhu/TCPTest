<template>
  <div class="file-checkbox">
    <p class="font"><i class="el-icon-folder"></i>Choose Test Files</p>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckFilesAllChange">Select All</el-checkbox>
    <div style="margin: 15px 0;"></div>
    <el-checkbox-group v-model="checkedFiles" @change="handleCheckedFilesChange">
      <el-checkbox v-for="file in files" :label="file" :key="file">{{file}}</el-checkbox>
    </el-checkbox-group>

  </div>
</template>

<script>
import files from '@/assets/files.json'
const filesName = [];
for(let i=0;i<files.count;i++){
  filesName.push(files.name[i]);
}

export default {
  name: 'FilesCheckBox',
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
.font{
  font-size: medium;
  font-weight: bold;
}
.file-checkbox{
  width: 60%;
  margin: auto;
}

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
