<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <FilesServersSelect></FilesServersSelect>
    <TestResult></TestResult>
  </div>
</template>

<script>
import FilesServersSelect from "@/components/FilesServersSelect";
import TestResult from "@/components/TestResult";

export default {
  name: 'App',
  components: {
    TestResult,
    FilesServersSelect
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
